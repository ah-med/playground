"""
LLM Comparison System

A modular system for comparing multiple LLM models with the same prompts.
"""

from .interfaces import ModelInterface, ModelResponse
from .models import MockModel, OpenAICompatibleModel, AnthropicCompatibleModel

__all__ = [
    'ModelInterface',
    'ModelResponse', 
    'MockModel',
    'OpenAICompatibleModel',
    'AnthropicCompatibleModel',
    'CompareLLM'
]

__version__ = "1.0.0"
