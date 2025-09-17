#!/usr/bin/env python3
"""
API Integration for DVD Rental Support AI

This module contains the main API integration class that manages conversations
with the LLM and coordinates tool execution through the ToolHandler.
"""

import json
import os
from typing import Dict, List, Any, Optional
from openai import OpenAI
from core import ToolHandler
from prompts import get_all_tool_schemas, get_combined_tools_prompt


class DvdRentalSupportAPI:
    """Main API integration class for the DVD Rental Support AI"""
    
    def __init__(self, openai_api_key: Optional[str] = None):
        """
        Initialize the DVD Rental Support API
        
        Args:
            openai_api_key: OpenAI API key. If None, will try to get from environment
        """

        api_key = openai_api_key or os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise ValueError("OpenAI API key is required. Set OPENAI_API_KEY environment variable or pass as parameter.")
        
        self.openai_client = OpenAI(api_key=api_key)
        
        self.tool_handler = ToolHandler()
        self.tools = get_all_tool_schemas()
        self.system_prompt = get_combined_tools_prompt()
        
        self.conversation_history = []
    
    def add_system_message(self):
        """Add system message to conversation history"""
        self.conversation_history = [
            {"role": "system", "content": self.system_prompt}
        ]
    
    def chat_with_tools(self, user_message: str, model: str = "gpt-5") -> str:
        """
        Main method to chat with the LLM using our tools
        
        Args:
            user_message: User's question or request
            model: OpenAI model to use (default: gpt-5)
            
        Returns:
            LLM's response using the tools
        """
        try:
            self.conversation_history.append({"role": "user", "content": user_message})
            
            response = self.openai_client.chat.completions.create(
                model=model,
                messages=self.conversation_history,
                tools=self.tools,
                tool_choice="auto"
            )
            
            response_message = response.choices[0].message
            
            message_dict = {
                "role": "assistant",
                "content": response_message.content
            }
            if hasattr(response_message, 'tool_calls') and response_message.tool_calls:
                message_dict["tool_calls"] = response_message.tool_calls
            
            self.conversation_history.append(message_dict)
            
            if response_message.tool_calls:
                tool_results = self.handle_tool_calls(response_message.tool_calls)
                
                for tool_result in tool_results:
                    self.conversation_history.append({
                        "role": "tool",
                        "content": json.dumps(tool_result["result"]),
                        "tool_call_id": tool_result["tool_call_id"]
                    })
                
                final_response = self.get_final_response(model)
                return final_response
            else:
                return response_message.content
                
        except Exception as e:
            print(f"Chat error: {e}")
            try:
                self.reset_conversation()
                return self.get_user_friendly_error_message("general")
            except:
                return "I'm experiencing technical difficulties. Please restart the application."
    
    def handle_tool_calls(self, tool_calls: List[Any]) -> List[Dict[str, Any]]:
        """
        Handle tool calls from the LLM
        
        Args:
            tool_calls: List of tool calls from OpenAI
            
        Returns:
            List of tool execution results
        """
        tool_results = []
        
        for tool_call in tool_calls:
            try:
                function_name = tool_call.function.name
                arguments = json.loads(tool_call.function.arguments)
                
                result = self.tool_handler.execute_tool(function_name, arguments)
                
                tool_results.append({
                    "tool_call_id": tool_call.id,
                    "function_name": function_name,
                    "result": result
                })
                
            except Exception as e:
                print(f"Tool execution error for {function_name}: {e}")
                tool_results.append({
                    "tool_call_id": tool_call.id,
                    "function_name": function_name,
                    "result": {"error": self.get_user_friendly_error_message("tool_execution")}
                })
        
        return tool_results
    
    def validate_conversation_history(self) -> bool:
        """
        Validate conversation history integrity
        
        Returns:
            True if conversation is valid, False otherwise
        """
        try:
            for i, msg in enumerate(self.conversation_history):
                if msg.get("role") == "assistant" and msg.get("tool_calls"):
                    if i + 1 >= len(self.conversation_history):
                        return False
                    
                    next_msg = self.conversation_history[i + 1]
                    if next_msg.get("role") != "tool":
                        return False
                    
                    tool_call_ids = [tc.id for tc in msg["tool_calls"]]
                    if next_msg.get("tool_call_id") not in tool_call_ids:
                        return False
            
            return True
        except Exception:
            return False
    
    def get_final_response(self, model: str = "gpt-5") -> str:
        """
        Get final response from LLM after tool execution
        
        Args:
            model: OpenAI model to use
            
        Returns:
            Final response from LLM
        """
        try:
            if not self.validate_conversation_history():
                print("Conversation history corrupted, resetting...")
                self.reset_conversation()
                return self.get_user_friendly_error_message("conversation_corrupt")
            
            response = self.openai_client.chat.completions.create(
                model=model,
                messages=self.conversation_history
            )
            
            final_message = response.choices[0].message.content
            self.conversation_history.append({"role": "assistant", "content": final_message})
            
            return final_message
            
        except Exception as e:
            print(f"API error: {e}")
            self.reset_conversation()
            return self.get_user_friendly_error_message("api_error")
    
    def reset_conversation(self):
        """Reset the conversation history"""
        self.conversation_history = []
        self.add_system_message()
    
    def get_user_friendly_error_message(self, error_type: str = "general") -> str:
        """
        Get user-friendly error messages without exposing internal details
        
        Args:
            error_type: Type of error that occurred
            
        Returns:
            User-friendly error message
        """
        error_messages = {
            "tool_execution": "I'm having trouble accessing the rental database right now. Please try again in a moment.",
            "api_error": "I'm experiencing some technical difficulties. Let me start fresh and try again.",
            "conversation_corrupt": "Our conversation got a bit confused. Let me start over and we can continue.",
            "general": "Something went wrong while processing your request. Please try asking again.",
            "database": "I'm unable to search the rental database at the moment. Please try again later.",
            "timeout": "The request is taking longer than expected. Please try again."
        }
        
        return error_messages.get(error_type, error_messages["general"])
    
    def get_conversation_summary(self) -> str:
        """Get a summary of the current conversation"""
        if not self.conversation_history:
            return "No conversation yet."
        
        summary = f"Conversation has {len(self.conversation_history)} messages:\n"
        for i, msg in enumerate(self.conversation_history):
            role = msg["role"]
            if isinstance(msg["content"], str):
                content = msg["content"]
            elif hasattr(msg["content"], "__iter__") and not isinstance(msg["content"], str):
                content = str(msg["content"])
            else:
                content = str(msg["content"])
            
            if len(content) > 100:
                content = content[:100] + "..."
            
            summary += f"{i+1}. {role}: {content}\n"
        
        return summary
