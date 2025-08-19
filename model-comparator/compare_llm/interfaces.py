from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from dataclasses import dataclass
from datetime import datetime


@dataclass
class ModelResponse:
    """Container for model response data"""
    model_name: str
    response: str
    response_time: float
    timestamp: datetime
    metadata: Optional[Dict[str, Any]] = None


class ModelInterface(ABC):
    """Abstract interface for LLM models"""
    
    def __init__(self, name: str, config: Optional[Dict[str, Any]] = None):
        self.name = name
        self.config = config or {}
    
    @abstractmethod
    async def generate_response(self, prompt: str) -> ModelResponse:
        """Generate a response for the given prompt"""
        pass
    
    def _get_metadata(self, response_data: Any, prompt: str) -> Dict[str, Any]:
        """Get metadata for successful responses."""
        return {}
    
    def _get_error_metadata(self, error: Exception) -> Dict[str, Any]:
        """Get metadata for error responses."""
        return {
            "error": True,
            "error_message": str(error)
        }
    
    def __str__(self) -> str:
        return f"{self.__class__.__name__}({self.name})"
