import asyncio
import time
from datetime import datetime
from .interfaces import ModelInterface, ModelResponse
from openai import OpenAI


class MockModel(ModelInterface):
    """Just a mock model for testing purposes"""
    
    def __init__(self, name: str, response_delay: float = 0.1):
        super().__init__(name)
        self.response_delay = response_delay
    
    async def generate_response(self, prompt: str) -> ModelResponse:
        start_time = time.time()
        
        await asyncio.sleep(self.response_delay)
        
        mock_responses = {
            "hello": f"Hello! I'm {self.name}. How can I help you today?",
            "help": f"I'm {self.name}, a mock model. I can simulate responses for testing.",
            "test": f"This is a test response from {self.name}."
        }
        
        response = mock_responses.get(prompt.lower(), f"I'm {self.name}. I received your prompt: '{prompt}'")
        
        response_time = time.time() - start_time
        
        return ModelResponse(
            model_name=self.name,
            response=response,
            response_time=response_time,
            timestamp=datetime.now(),
            metadata={"mock_model": True, "prompt_length": len(prompt)}
        )


class OpenAICompatibleModel(ModelInterface):
    """Model that works with OpenAI-compatible APIs"""
    
    def __init__(self, name: str, api_key: str, base_url: str, model: str = "gpt-3.5-turbo"):
        super().__init__(name, {"api_key": api_key, "base_url": base_url, "model": model})
        self.api_key = api_key
        self.base_url = base_url
        self.model = model
    
    def _get_metadata(self, chat_response, prompt: str) -> dict:
        """Extract metadata from the chat response"""
        return {
            "model": self.model,
            "base_url": self.base_url,
            "prompt_tokens": chat_response.usage.prompt_tokens if chat_response.usage else len(prompt.split()),
            "completion_tokens": chat_response.usage.completion_tokens if chat_response.usage else 0,
            "total_tokens": chat_response.usage.total_tokens if chat_response.usage else len(prompt.split()),
            "api_call": True,
            "finish_reason": chat_response.choices[0].finish_reason,
            "provider": "openai_compatible"
        }
    
    def _get_error_metadata(self, error: Exception) -> dict:
        """Get metadata for error responses"""
        return {
            "error": True, 
            "error_message": str(error),
            "provider": "openai_compatible"
        }
    
    async def generate_response(self, prompt: str) -> ModelResponse:
        start_time = time.time()
        
        try:
            client = OpenAI(
                api_key=self.api_key,
                base_url=self.base_url
            )
            
            chat_response = await asyncio.to_thread(
                client.chat.completions.create,
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000,
                temperature=0.7
            )
            
            response = chat_response.choices[0].message.content
            
            response_time = time.time() - start_time
            
            return ModelResponse(
                model_name=self.name,
                response=response,
                response_time=response_time,
                timestamp=datetime.now(),
                metadata=self._get_metadata(chat_response, prompt)
            )
        except Exception as e:
            response_time = time.time() - start_time
            return ModelResponse(
                model_name=self.name,
                response=f"Error: {str(e)}",
                response_time=response_time,
                timestamp=datetime.now(),
                metadata=self._get_error_metadata(e)
            )

class AnthropicCompatibleModel(ModelInterface):
    """Model that works with Anthropic Claude APIs"""
    
    def __init__(self, name: str, api_key: str, model: str = "claude-3-sonnet-20240229"):
        super().__init__(name, {"api_key": api_key, "model": model})
        self.api_key = api_key
        self.model = model
    
    async def generate_response(self, prompt: str) -> ModelResponse:
        start_time = time.time()
        
        try:
            await asyncio.sleep(0.3) 
            
            response = f"Claude {self.model} response: {prompt[:50]}..."
            
            response_time = time.time() - start_time
            
            return ModelResponse(
                model_name=self.name,
                response=response,
                response_time=response_time,
                timestamp=datetime.now(),
                metadata={
                    "model": self.model,
                    "provider": "anthropic",
                    "prompt_tokens": len(prompt.split()),
                    "api_call": True
                }
            )
        except Exception as e:
            response_time = time.time() - start_time
            return ModelResponse(
                model_name=self.name,
                response=f"Error: {str(e)}",
                response_time=response_time,
                timestamp=datetime.now(),
                metadata={
                    "error": True, 
                    "error_message": str(e),
                    "provider": "anthropic"
                }
            )

class OllamaModel(OpenAICompatibleModel):
    """Model that connects to a local Ollama instance"""
    
    def __init__(self, name: str, model: str, base_url: str = "http://localhost:11434/v1", api_key: str = "ollama"):
        super().__init__(name, api_key, base_url, model)
    
    def _get_metadata(self, chat_response, prompt: str) -> dict:
        base_metadata = super()._get_metadata(chat_response, prompt)
        
        return {
            **base_metadata,
            "provider": "ollama",
            "local": True
        }
    
    def _get_error_metadata(self, error: Exception) -> dict:
        base_metadata = super()._get_error_metadata(error)
        
        return {
            **base_metadata,
            "provider": "ollama",
            "local": True
        }
