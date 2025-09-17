#!/usr/bin/env python3
"""
DVD Rental Support AI - Gradio Web Interface

A web-based interface for the DVD Rental Support AI using Gradio.
Provides the same functionality as the CLI but with a modern web UI.
"""

import gradio as gr
from api import DvdRentalSupportAPI

api = DvdRentalSupportAPI()

def support_assistant_chat(message, history):
    """
    Main chat function for Gradio interface
    
    Args:
        message: User's current message
        history: Chat history (list of previous messages)

    Returns:
        AI response string
    """
    try:
        response = api.chat_with_tools(message)
        return response
        
    except Exception as e:
        print(f"Chat error: {e}")
        return api.get_user_friendly_error_message("general")

def create_interface():
    """Create and configure the Gradio interface"""
    
    demo = gr.ChatInterface(
        fn=support_assistant_chat,
        title="🎬 DVD Rental Support AI",
        description="Your AI customer support assistant with access to a comprehensive rental business database. Ask me about rentals, policies, or customer service!",
        examples=[
            ["What movies are available for rent?"],
            ["What are your rental policies?"],
            ["How do I return a DVD?"],
            ["What are the late fees?"],
            ["Can you help me find a specific movie?"]
        ],
        type="messages"
    )
    
    return demo

if __name__ == "__main__":
    interface = create_interface()
    interface.launch(
        server_name="0.0.0.0",
        show_error=True
    )
