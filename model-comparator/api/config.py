import os
from typing import List

class Settings:
    """Application settings and configuration"""
    
    # api
    API_TITLE: str = "Model Comparator API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "API for comparing responses from different Large Language Models"
    
    # server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "*").split(",")
    
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    @classmethod
    def get_cors_origins(cls) -> List[str]:
        """Get CORS origins, handling wildcard properly"""
        if "*" in cls.CORS_ORIGINS:
            return ["*"]
        return cls.CORS_ORIGINS

settings = Settings()
