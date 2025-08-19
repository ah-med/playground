#!/usr/bin/env python3
"""
Startup script for the Model Comparator API
"""

import uvicorn
import sys
import os

# Add the parent directory to the path to import compare_llm modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import settings

def main():
    """Start the FastAPI server"""
    print(f"Starting Model Comparator API on {settings.HOST}:{settings.PORT}")
    print(f"Debug mode: {settings.DEBUG}")
    print(f"Available endpoints:")
    print(f"  - GET  /api/v1/models")
    print(f"  - POST /api/v1/compare")
    print(f"  - GET  /api/v1/health")
    print(f"\nAPI Documentation: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"ReDoc: http://{settings.HOST}:{settings.PORT}/redoc")
    
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )

if __name__ == "__main__":
    main()
