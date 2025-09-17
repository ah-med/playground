#!/usr/bin/env python3
"""
Core Tool Handling for DVD Rental Support AI

This module contains the core tool execution logic and ToolHandler class
that manages the execution of database tools when requested by the LLM.
"""

from typing import Dict, Any
from tools import DvdRentalTools


class ToolHandler:
    """Handles execution of tools when requested by the LLM"""
    
    def __init__(self):
        self.tool = DvdRentalTools()
    
    def execute_tool(self, function_name: str, arguments: Dict[str, Any]) -> Any:
        """
        Execute a tool function based on the function name and arguments
        
        Args:
            function_name: Name of the function to execute
            arguments: Dictionary of arguments for the function
            
        Returns:
            Result of the tool execution
        """
        try:
            if function_name == "get_movie_information":
                return self.tool.get_movie_information(arguments["movie_title"])
            
            elif function_name == "search_movies":
                filtered_args = {k: v for k, v in arguments.items() if v is not None}
                return self.tool.search_movies(**filtered_args)
            
            elif function_name == "get_customer_rental_history":
                return self.tool.get_customer_rental_history(arguments["customer_id"])
            
            elif function_name == "find_customer_and_get_history":
                filtered_args = {k: v for k, v in arguments.items() if v is not None}
                return self.tool.find_customer_and_get_history(**filtered_args)
            
            else:
                raise ValueError(f"Unknown function: {function_name}")
                
        except Exception as e:
            return {"error": f"Tool execution failed: {str(e)}"}
