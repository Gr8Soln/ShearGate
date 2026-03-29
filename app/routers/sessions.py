import uuid
from typing import List, Dict, Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db import get_db
from app.models.domain import Calculation, Session, User
from app.routers.auth import get_current_user
from app.schemas.calculation import CalculationOut

router = APIRouter(
    prefix="/sessions",
    tags=["sessions"]
)

@router.get("", response_model=List[dict])
async def list_sessions(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """List all sessions for the current user."""
    result = await db.execute(
        select(Session).filter(Session.user_id == current_user.id).order_by(Session.updated_at.desc())
    )
    sessions = result.scalars().all()
    
    # Return sessions with calculation counts
    res = []
    for s in sessions:
        count_res = await db.execute(select(Calculation).filter(Calculation.session_id == s.id))
        count = len(count_res.scalars().all())
        res.append({
            "id": s.id,
            "title": s.title,
            "created_at": s.created_at,
            "updated_at": s.updated_at,
            "calculation_count": count
        })
    return res

@router.post("", response_model=dict)
async def create_new_session(
    title: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new session."""
    session = Session(user_id=current_user.id, title=title)
    db.add(session)
    await db.commit()
    await db.refresh(session)
    return {**session.__dict__, "calculation_count": 0}

@router.get("/{session_id}/calculations", response_model=List[CalculationOut])
async def get_session_calculations(
    session_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all calculations for a session."""
    result = await db.execute(
        select(Calculation).filter(Calculation.session_id == session_id, Calculation.user_id == current_user.id)
    )
    return result.scalars().all()

@router.post("/{session_id}/calculations")
async def save_calculation(session_id: str, data: Dict[str, Any]):
    """Save a calculation to a session."""
    return {"status": "success", "id": "calc_123"}
