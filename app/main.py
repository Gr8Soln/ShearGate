import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth, extract, explain, sessions
from app.utils.response import success_response

# Create FastAPI app
app = FastAPI(
    title="ConnCalc API",
    description="Structural Engineering Connection Design API — BS 5950-1:2000",
    version="1.0.0"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(extract.router)
app.include_router(explain.router)
app.include_router(sessions.router)

@app.get("/")
async def root():
    """API Health Check"""
    return success_response(
        message="ConnCalc API is online",
        data={
            "api": "ConnCalc",
            "version": "1.0.0",
            "support": "BS 5950-1:2000"
        }
    )
