from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import sys
import os

# Add the parent directory to the path to import compare_llm modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from compare_llm.compare_llm import CompareLLM


app = FastAPI(
    title="Model Comparator API",
    description="API for comparing responses from different Large Language Models",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # dev only, configure for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

comparator = CompareLLM()

class ComparisonRequest(BaseModel):
    prompt: str
    model_names: Optional[List[str]] = None

class ModelInfo(BaseModel):
    name: str
    type: str

class ComparisonResponse(BaseModel):
    model_name: str
    response: str
    response_time: float
    timestamp: str
    metadata: Optional[Dict[str, Any]] = None

class ComparisonResult(BaseModel):
    prompt: str
    responses: List[ComparisonResponse]
    summary: Dict[str, Any]

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Model Comparator API",
        "version": "1.0.0",
        "endpoints": {
            "models": "/api/v1/models",
            "compare": "/api/v1/compare"
        }
    }

@app.get("/api/v1/models", response_model=List[ModelInfo])
async def get_models():
    """Get the list of available models"""
    models = []
    for name, model in comparator.available_models.items():
        model_info = ModelInfo(
            name=name,
            type=model.__class__.__name__,
        )
        models.append(model_info)
    
    return models

@app.post("/api/v1/compare", response_model=ComparisonResult)
async def compare_models(request: ComparisonRequest):
    """Compare the answers from different LLMs"""
    try:
        if not request.prompt.strip():
            raise HTTPException(status_code=400, detail="Prompt cannot be empty")
        
        responses = await comparator.compare_models(
            prompt=request.prompt,
            model_names=request.model_names
        )
        
        api_responses = []
        for response in responses:
            api_response = ComparisonResponse(
                model_name=response.model_name,
                response=response.response,
                response_time=response.response_time,
                timestamp=response.timestamp.isoformat(),
                metadata=response.metadata
            )
            api_responses.append(api_response)
        
        summary = comparator.get_comparison_summary(responses)
        
        return ComparisonResult(
            prompt=request.prompt,
            responses=api_responses,
            summary=summary
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "models_count": len(comparator.available_models),
        "available_models": list(comparator.available_models.keys())
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
