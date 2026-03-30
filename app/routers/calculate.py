import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.db import get_db
from app.models.domain import Calculation, Session, User
from app.routers.auth import get_current_user
from app.schemas.calculation import ConnectionInputs, SolutionResult
from app.services.bs5950.block_shear import analyze_block_shear
from app.services.claude import generate_summary

router = APIRouter(
    prefix="/calculate",
    tags=["calculate"]
)

@router.post("", response_model=SolutionResult)
async def calculate_connection(
    inputs: ConnectionInputs,
    session_id: Optional[uuid.UUID] = None,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    """
    Performs BS5950 calculation and optionally saves it to a session.
    """
    # 1. Run engineering checks
    calc_results = analyze_block_shear(inputs.model_dump())
    
    # 2. Add summary via AI
    summary = await generate_summary(calc_results)
    
    solution = SolutionResult(
        connection_type=inputs.connection_type,
        inputs=inputs,
        checks=calc_results["steps"], # Map steps to checks for now
        overall_pass=calc_results["overall_pass"],
        governing_check=calc_results["governing_check"],
        summary=summary
    )
    
    # 3. Handle Auto-Save if user is logged in
    if current_user and session_id:
        # Verify session belongs to user
        result = await db.execute(select(Session).filter(Session.id == session_id, Session.user_id == current_user.id))
        session = result.scalars().first()
        
        if session:
            db_calc = Calculation(
                session_id=session_id,
                user_id=current_user.id,
                input_raw="User submitted form", # Could be refined
                input_parsed=inputs.model_dump(),
                result=solution.model_dump(),
                overall_pass=solution.overall_pass,
                governing_check=solution.governing_check
            )
            db.add(db_calc)
            await db.commit()
            
    return solution
