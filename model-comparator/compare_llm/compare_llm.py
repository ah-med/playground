from typing import List, Dict, Any, Optional
import asyncio
from datetime import datetime
from .interfaces import ModelInterface, ModelResponse
from .models import MockModel, OllamaModel

class CompareLLM:
    """Main class for comparing multiple LLM models"""
    
    def __init__(self):
        self.available_models: Dict[str, ModelInterface] = {
            "MockGPT": MockModel("MockGPT", response_delay=0.1),
            "Llama3.2": OllamaModel("Llama3.2", model="llama3.2"),
            "Llama2": OllamaModel("Llama2", model="llama2")
        }
        self.comparison_history: List[Dict[str, Any]] = []
    
    def register_model(self, model: ModelInterface) -> None:
        """Register a new model for comparison"""
        self.available_models[model.name] = model
        print(f"Registered model: {model.name}")
    
    def unregister_model(self, model_name: str) -> bool:
        """Unregister a model by name"""
        if model_name in self.available_models:
            del self.available_models[model_name]
            print(f"Unregistered model: {model_name}")
            return True
        return False
    
    def list_models(self) -> List[str]:
        """List all registered model names"""
        return list(self.available_models.keys())
    
    async def compare_models(self, prompt: str, model_names: Optional[List[str]] = None) -> List[ModelResponse]:
        """
        Compare multiple models with the same prompt
        
        Args:
            prompt: The prompt to send to all models
            model_names: List of model names to compare. If None, compares all registered models.
        
        Returns:
            List of ModelResponse objects from all models
        """
        if not self.available_models:
            raise ValueError("No models registered. Please register at least one model.")
        
        if model_names is None:
            models_to_compare = list(self.available_models.values())
        else:
            models_to_compare = []
            for name in model_names:
                if name in self.available_models:
                    models_to_compare.append(self.available_models[name])
                else:
                    print(f"Warning: Model '{name}' not found, skipping.")
        
        if not models_to_compare:
            raise ValueError("No valid models to compare.")
        
        print(f"Comparing {len(models_to_compare)} models with prompt: '{prompt[:100]}{'...' if len(prompt) > 100 else ''}'")
        
        tasks = [model.generate_response(prompt) for model in models_to_compare]
        responses = await asyncio.gather(*tasks, return_exceptions=True)
        
        processed_responses = []
        for i, response in enumerate(responses):
            if isinstance(response, Exception):
                processed_responses.append(ModelResponse(
                    model_name=models_to_compare[i].name,
                    response=f"Error: {str(response)}",
                    response_time=0.0,
                    timestamp=datetime.now(),
                    metadata={"error": True, "error_message": str(response)}
                ))
            else:
                processed_responses.append(response)
        
        comparison_record = {
            "timestamp": datetime.now(),
            "prompt": prompt,
            "responses": [
                {
                    "model_name": r.model_name,
                    "response": r.response,
                    "response_time": r.response_time,
                    "metadata": r.metadata
                } for r in processed_responses
            ]
        }
        self.comparison_history.append(comparison_record)
        
        return processed_responses
    
    def get_comparison_summary(self, responses: List[ModelResponse]) -> Dict[str, Any]:
        """Generate a summary of the comparison results"""
        if not responses:
            return {}
        
        response_times = [r.response_time for r in responses if not r.metadata.get("error")]
        avg_response_time = sum(response_times) / len(response_times) if response_times else 0
        min_response_time = min(response_times) if response_times else 0
        max_response_time = max(response_times) if response_times else 0
        
        error_count = sum(1 for r in responses if r.metadata.get("error"))
        
        summary = {
            "total_models": len(responses),
            "successful_models": len(responses) - error_count,
            "error_count": error_count,
            "response_time_stats": {
                "average": round(avg_response_time, 3),
                "min": round(min_response_time, 3),
                "max": round(max_response_time, 3)
            },
            "models": [
                {
                    "name": r.model_name,
                    "response_time": round(r.response_time, 3),
                    "has_error": r.metadata.get("error", False),
                    "response_preview": r.response[:100] + "..." if len(r.response) > 100 else r.response,
                    "response": r.response
                } for r in responses
            ]
        }
        
        return summary
    
    def print_comparison_summary(self, responses: List[ModelResponse]) -> None:
        """Print a formatted comparison summary"""
        summary = self.get_comparison_summary(responses)
        
        print("\n" + "="*80)
        print("🤖 LLM COMPARISON RESULTS")
        print("="*80)
        print(f"Total Models: {summary['total_models']}")
        print(f"Successful: {summary['successful_models']}")
        print(f"Errors: {summary['error_count']}")
        print(f"Average Response Time: {summary['response_time_stats']['average']}s")
        print(f"Fastest: {summary['response_time_stats']['min']}s")
        print(f"Slowest: {summary['response_time_stats']['max']}s")
        
        print("\n" + "MODEL RESPONSES:")
        print("-" * 80)
        
        for i, model_result in enumerate(summary['models'], 1):
            status = "✅" if not model_result['has_error'] else "😕"
            print(f"\n{i}. {status} {model_result['name']}")
            print(f"    Response Time: {model_result['response_time']}s")
            
            if model_result['has_error']:
                print(f"    Error in response")
            else:
                print(f"    Response:")
                response_lines = model_result['response'].split('\n')
                for line in response_lines:
                    if line.strip():
                        print(f"      {line}")
        
        print("\n" + "="*80)
    

async def main():
    print("Setting up LLM comparison system...")
    
    comparator = CompareLLM()
    
    print(f"Available models 🤖: {', '.join(comparator.list_models())}")
    print("\n" + "="*60)
    
    while True:
        print("\n Enter your question (or 'quit' to exit):")
        prompt = input("> ").strip()
        
        if prompt.lower() in ['quit', 'exit', 'q']:
            print("👋 Goodbye! Thanks for using the LLM comparison system.")
            break
        
        if not prompt:
            print("Please enter a valid question 🙄.")
            continue
        
        print(f"\n Comparing models for: '{prompt}'")
        print("⏳ Processing...")
        
        try:
            responses = await comparator.compare_models(prompt)
            comparator.print_comparison_summary(responses)
        except Exception as e:
            print(f"Error during comparison 🥺: {e}")
    
    
    
if __name__ == "__main__":  
    asyncio.run(main())
