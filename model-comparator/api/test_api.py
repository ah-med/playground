#!/usr/bin/env python3
"""
Test script for the Model Comparator API
"""

import asyncio
import aiohttp
import json
import sys
import os

# Add the parent directory to the path to import compare_llm modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

BASE_URL = "http://localhost:8000"

async def test_api():
    """Test the API endpoints"""
    async with aiohttp.ClientSession() as session:
        print("🧪 Testing Model Comparator API...")
        print("=" * 50)
        
        # Test 1: Root endpoint
        print("\n1. Testing root endpoint...")
        try:
            async with session.get(f"{BASE_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Root endpoint: {data['message']}")
                else:
                    print(f"❌ Root endpoint failed: {response.status}")
        except Exception as e:
            print(f"❌ Root endpoint error: {e}")
        
        # Test 2: Health check
        print("\n2. Testing health check...")
        try:
            async with session.get(f"{BASE_URL}/api/v1/health") as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Health check: {data['status']}")
                    print(f"   Models count: {data['models_count']}")
                    print(f"   Available models: {data['available_models']}")
                else:
                    print(f"❌ Health check failed: {response.status}")
        except Exception as e:
            print(f"❌ Health check error: {e}")
        
        # Test 3: List models
        print("\n3. Testing list models...")
        try:
            async with session.get(f"{BASE_URL}/api/v1/models") as response:
                if response.status == 200:
                    models = await response.json()
                    print(f"✅ List models: Found {len(models)} models")
                    for model in models:
                        print(f"   - {model['name']} ({model['type']})")
                else:
                    print(f"❌ List models failed: {response.status}")
        except Exception as e:
            print(f"❌ List models error: {e}")
        
        # Test 4: Compare models
        print("\n4. Testing model comparison...")
        try:
            payload = {
                "prompt": "What is the capital of France?",
                "model_names": ["MockGPT", "Llama3.2"]
            }
            async with session.post(
                f"{BASE_URL}/api/v1/compare",
                json=payload
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    print(f"✅ Model comparison successful")
                    print(f"   Prompt: {data['prompt']}")
                    print(f"   Responses: {len(data['responses'])}")
                    for resp in data['responses']:
                        print(f"     {resp['model_name']}: {resp['response'][:50]}...")
                    print(f"   Summary: {data['summary']}")
                else:
                    print(f"❌ Model comparison failed: {response.status}")
                    error_text = await response.text()
                    print(f"   Error: {error_text}")
        except Exception as e:
            print(f"❌ Model comparison error: {e}")
        
        print("\n" + "=" * 50)
        print("🎯 API testing completed!")

def main():
    """Main function"""
    print("🚀 Starting API tests...")
    print("Make sure the API is running on http://localhost:8000")
    print("You can start it with: python run.py")
    print()
    
    try:
        asyncio.run(test_api())
    except KeyboardInterrupt:
        print("\n⏹️  Testing interrupted by user")
    except Exception as e:
        print(f"\n💥 Testing failed: {e}")

if __name__ == "__main__":
    main()
