from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
import uuid
from typing import Any, Dict
from app.db import get_db
from app.models.domain import User
from app.schemas.user import GoogleAuthRequest, TokenResponse, UserResponse
from app.services.auth import create_access_token, create_refresh_token, get_current_user, decode_token
from app.services.oauth import verify_google_token
from app.utils.response import success_response, failure_response


router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/google", response_model=Dict[str, Any])
async def google_auth(
    auth_req: GoogleAuthRequest, 
    db: AsyncSession = Depends(get_db)
):
    """
    Authenticate with Google ID token.
    Finds or creates the user and returns JWT tokens.
    """
    profile = verify_google_token(auth_req.credential)
    
    # Check if user exists
    result = await db.execute(select(User).where(User.google_id == profile["google_id"]))
    user = result.scalar_one_or_none()
    
    if not user:
        # Create new user
        user = User(
            email=profile["email"],
            name=profile["name"],
            google_id=profile["google_id"],
            avatar_url=profile["picture"]
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    
    # Generate tokens
    user_id_str = str(user.id)
    access_token = create_access_token(user_id_str)
    refresh_token = create_refresh_token(user_id_str)
    
    return success_response(
        data={
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": UserResponse.model_validate(user)
        },
        message="Successfully authenticated with Google"
    )

@router.post("/refresh", response_model=Dict[str, Any])
async def refresh_token(request: Request, db: AsyncSession = Depends(get_db)):
    """Refresh the access token using a refresh token."""
    body = await request.json()
    refresh_token = body.get("refresh_token")
    
    if not refresh_token:
        failure_response("Refresh token required", status.HTTP_400_BAD_REQUEST)
        
    payload = decode_token(refresh_token)
    if not payload or payload.get("kind") != "refresh":
        failure_response("Invalid or expired refresh token", status.HTTP_401_UNAUTHORIZED)
        
    user_id = payload.get("sub")
    # Verify user still exists
    result = await db.execute(select(User).where(User.id == uuid.UUID(user_id)))
    user = result.scalar_one_or_none()
    
    if not user:
        failure_response("User not found", status.HTTP_404_NOT_FOUND)
        
    new_access = create_access_token(user_id)
    new_refresh = create_refresh_token(user_id)
    
    return success_response(
        data={
            "access_token": new_access,
            "refresh_token": new_refresh,
            "token_type": "bearer"
        },
        message="Token refreshed successfully"
    )

@router.get("/me", response_model=Dict[str, Any])
async def get_me(current_user: User = Depends(get_current_user)):
    """Get the current authenticated user profile."""
    return success_response(
        data=UserResponse.model_validate(current_user),
        message="User profile retrieved"
    )

@router.post("/logout", response_model=Dict[str, Any])
async def logout():
    """Stateless logout."""
    return success_response(message="Logged out successfully")


