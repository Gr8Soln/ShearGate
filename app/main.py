import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import Settings
from app.routers import auth, clauses, calculate, parse, sessions

# Initialize settings
settings = Settings()

# Create FastAPI app
app = FastAPI(
    title="Block Shear Analyzer API",
    description="Backend API for the BS5950 Block Shear Analysis Tool",
    version="1.0.0"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list if hasattr(settings, 'cors_origins_list') else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(parse.router)
app.include_router(calculate.router)
app.include_router(sessions.router)
app.include_router(clauses.router)

@app.get("/")
async def root():
    """
    Health check endpoint.
    """
    return {
        "status": "online",
        "service": "Block Shear Analyzer API",
        "timestamp": time.time(),
        "environment": getattr(settings, "ENVIRONMENT", "development")
    }
