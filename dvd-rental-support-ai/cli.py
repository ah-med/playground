#!/usr/bin/env python3
"""
DVD Rental Support AI CLI App

An interactive command-line interface for chatting with the DVD Rental Support AI agent.
The agent has access to a comprehensive rental business database and can provide rental information,
customer support, and business assistance.
"""

import os
import sys
from api import DvdRentalSupportAPI

def main():
    """Main CLI application"""
    
    print("🎭  DVD RENTAL SUPPORT AI - Customer Support Assistant  🎭")
    print("=" * 60)
    print("I'm your AI customer support assistant with access to a comprehensive rental business database!")
    print("Ask me about rentals, policies, customer service, or any business-related questions.")
    print("Type 'quit' or 'exit' to end the session.")
    print("=" * 60)
    print()

    # Initialize the API
    try:
        api = DvdRentalSupportAPI()
        print("✅ System initialized successfully!")
        print()
    except Exception as e:
        print(f"❌ Failed to initialize system: {e}")
        print("Please check your configuration and try again.")
        sys.exit(1)

    # Main chat loop
    while True:
        try:
            # Get user input
            user_input = input("👤 You: ").strip()
            
            # Check for exit commands
            if user_input.lower() in ['quit', 'exit', 'bye', 'q']:
                print("\n👋 Thank you for using DVD Rental Support AI. Goodbye!")
                break
            
            # Skip empty input
            if not user_input:
                continue
            
            # Get AI response
            print("🤖 Processing your request...")
            response = api.chat_with_tools(user_input)
            
            # Display response
            print(f"\n🎭 Support Assistant: {response}\n")
            
        except KeyboardInterrupt:
            print("\n\n👋 Session interrupted. Goodbye!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")
            print("Please try again or type 'quit' to exit.")

if __name__ == "__main__":
    try:
        print("Initializing DVD Rental Support AI...")
        main()
    except Exception as e:
        print(f"Failed to initialize DVD Rental Support AI: {e}")
        sys.exit(1)
