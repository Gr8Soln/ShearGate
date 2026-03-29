import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


class UserResponse(BaseModel):
    """User response schema"""
    id: uuid.UUID
    email: EmailStr
    name: str
    google_id: str
    avatar_url: Optional[str] = None
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class GoogleAuthRequest(BaseModel):
    """Request schema for Google OAuth credential (ID Token)"""
    credential: str


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Token payload data"""
    user_id: Optional[str] = None
