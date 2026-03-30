import uuid
from typing import Any, Dict

from fastapi import APIRouter, Depends, Request, status
from loguru import logger
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.db import get_db
from app.models.domain import User
from app.schemas.user import GoogleAuthRequest, TokenResponse, UserResponse
from app.services.auth import (create_access_token, create_refresh_token,
                               decode_token, get_current_user)
from app.services.oauth import verify_google_token
from app.utils.response import failure_response, success_response

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
    google_id = profile.get("google_id")
    email = profile.get("email")

    if not google_id or not email:
        failure_response(
            "Google account did not return required identity fields.",
            status.HTTP_401_UNAUTHORIZED,
        )

    try:
        # Primary lookup by Google subject ID.
        result = await db.execute(select(User).where(User.google_id == google_id))
        user = result.scalar_one_or_none()
        should_commit = False

        # Fallback lookup by email to avoid duplicate-email 500s.
        if not user:
            result = await db.execute(select(User).where(User.email == email))
            user = result.scalar_one_or_none()

            if user:
                if user.google_id != google_id:
                    logger.warning(
                        "Google auth rejected: conflicting google_id for email={} existing={} incoming={}",
                        email,
                        user.google_id,
                        google_id,
                    )
                    failure_response(
                        "An account with this email already exists under a different Google account.",
                        status.HTTP_409_CONFLICT,
                    )

                # Keep profile fresh for returning users.
                updated_name = profile.get("name") or user.name
                updated_avatar = profile.get("picture") or user.avatar_url
                if user.name != updated_name or user.avatar_url != updated_avatar:
                    user.name = updated_name
                    user.avatar_url = updated_avatar
                    should_commit = True
            else:
                user = User(
                    email=email,
                    name=profile.get("name") or email,
                    google_id=google_id,
                    avatar_url=profile.get("picture"),
                )
                db.add(user)
                should_commit = True

        if should_commit:
            await db.commit()
            await db.refresh(user)

    except IntegrityError:
        await db.rollback()
        logger.exception("Google auth persistence conflict for email={}", email)
        failure_response(
            "Unable to authenticate due to conflicting account data.",
            status.HTTP_409_CONFLICT,
        )
    except Exception:
        await db.rollback()
        logger.exception("Unexpected server error during Google auth for email={}", email)
        failure_response(
            "Authentication failed due to a server error.",
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    
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


