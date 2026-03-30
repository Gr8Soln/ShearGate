import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional

from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.config import settings
from app.core.db import get_db
from app.models.domain import User
from app.utils.response import failure_response

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/google")

def create_access_token(user_id: str) -> str:
    """Create a new access token."""
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": user_id, "exp": expire, "kind": "access"}
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    """Create a new refresh token."""
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": user_id, "exp": expire, "kind": "refresh"}
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.ALGORITHM)

def decode_token(token: str) -> Dict[str, Any]:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return {}

async def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: AsyncSession = Depends(get_db)
) -> User:
    """Dependency for getting the current authenticated user."""
    payload = decode_token(token)
    
    if not payload or payload.get("kind") != "access":
        failure_response("Invalid or expired access token", status.HTTP_401_UNAUTHORIZED)
        
    user_id = payload.get("sub")
    if user_id is None:
        failure_response("Invalid token payload", status.HTTP_401_UNAUTHORIZED)
        
    try:
        user_uuid = uuid.UUID(user_id)
    except ValueError:
        failure_response("Invalid user ID in token", status.HTTP_401_UNAUTHORIZED)
        
    result = await db.execute(select(User).where(User.id == user_uuid))
    user = result.scalar_one_or_none()
    
    if user is None:
        failure_response("User not found", status.HTTP_401_UNAUTHORIZED)
        
    return user
