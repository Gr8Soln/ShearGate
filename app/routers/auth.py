from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any

from app.schemas.user import UserCreate, UserLogin, UserResponse, Token

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/signup", response_model=UserResponse)
async def signup(user_data: UserCreate):
    """Register a new user."""
    # TODO: Implement actual registration logic
    return {
        "id": "mock_id_123",
        "email": user_data.email,
        "name": user_data.name,
        "created_at": "2026-03-29T12:00:00Z"
    }

@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    """Authenticate user and return token."""
    # TODO: Implement actual login logic
    return {"access_token": "mock_token", "token_type": "bearer"}

@router.post("/refresh", response_model=Token)
async def refresh_auth(refresh_token: Dict[str, str]):
    """Refresh authentication token."""
    return {"access_token": "mock_token", "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_me():
    """Get current authenticated user."""
    return {
        "id": "mock_id_123",
        "email": "test@example.com",
        "name": "Test User",
        "created_at": "2026-03-29T12:00:00Z"
    }
