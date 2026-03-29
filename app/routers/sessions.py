from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete, update
from typing import Any, Dict, List, Optional
import uuid

from app.db import get_db
from app.models.domain import User, Session, Message
from app.schemas.session import (
    SessionResponse, SessionDetailResponse, MessageResponse, 
    CreateSessionRequest, UpdateSessionRequest
)
from app.services.auth import get_current_user
from app.utils.response import success_response, failure_response

router = APIRouter(prefix="/sessions", tags=["Sessions"])

@router.get("", response_model=Dict[str, Any])
async def get_sessions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all sessions for the current user."""
    result = await db.execute(
        select(Session)
        .where(Session.user_id == current_user.id)
        .order_by(Session.updated_at.desc())
    )
    sessions = result.scalars().all()
    
    return success_response(
        data=[SessionResponse.model_validate(s) for s in sessions],
        message="Sessions retrieved successfully"
    )

@router.post("", response_model=Dict[str, Any])
async def create_session(
    session_req: CreateSessionRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new engineering session."""
    session = Session(
        user_id=current_user.id,
        title=session_req.title
    )
    db.add(session)
    await db.commit()
    await db.refresh(session)
    
    return success_response(
        data=SessionResponse.model_validate(session),
        message="Session created successfully"
    )

@router.get("/{session_id}", response_model=Dict[str, Any])
async def get_session_detail(
    session_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get detailed session info including message history."""
    result = await db.execute(
        select(Session)
        .where(Session.id == session_id, Session.user_id == current_user.id)
    )
    session = result.scalar_one_or_none()
    
    if not session:
        failure_response("Session not found", status.HTTP_404_NOT_FOUND)
        
    # Get messages
    msg_result = await db.execute(
        select(Message)
        .where(Message.session_id == session_id)
        .order_by(Message.created_at.asc())
    )
    messages = msg_result.scalars().all()
    
    # Manually build detail to match schema
    detail = SessionDetailResponse.model_validate(session)
    detail.messages = [MessageResponse.model_validate(m) for m in messages]
    
    return success_response(
        data=detail,
        message="Session details retrieved"
    )

@router.patch("/{session_id}", response_model=Dict[str, Any])
async def update_session(
    session_id: uuid.UUID,
    update_req: UpdateSessionRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update session title."""
    result = await db.execute(
        update(Session)
        .where(Session.id == session_id, Session.user_id == current_user.id)
        .values(title=update_req.title)
    )
    
    if result.rowcount == 0:
        failure_response("Session not found", status.HTTP_404_NOT_FOUND)
        
    await db.commit()
    return success_response(message="Session updated")

@router.delete("/{session_id}", response_model=Dict[str, Any])
async def delete_session(
    session_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a session and all its messages."""
    result = await db.execute(
        delete(Session)
        .where(Session.id == session_id, Session.user_id == current_user.id)
    )
    
    if result.rowcount == 0:
        failure_response("Session not found", status.HTTP_404_NOT_FOUND)
        
    await db.commit()
    return success_response(message="Session deleted")
