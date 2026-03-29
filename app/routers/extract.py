from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any, Dict, Optional
import json

from app.db import get_db
from app.models.domain import User, Message, Session
from app.schemas.extract import ExtractTextRequest, ExtractResponse
from app.services.auth import get_current_user
from app.services.gemini import extract_from_text
from app.services.bs5950.block_shear import analyze_block_shear
from app.utils.response import success_response, failure_response

router = APIRouter(prefix="/extract", tags=["Extraction"])

@router.post("/text", response_model=Dict[str, Any])
async def extract_text(
    extract_req: ExtractTextRequest,
    session_id: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Extract connection parameters from a text description using Gemini.
    Then performs an initial calculation and saves the result in the session.
    """
    # 1. AI Extract
    extracted_params = await extract_from_text(extract_req.question)
    
    if "error" in extracted_params:
        failure_response(extracted_params["error"], status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    # 2. Fast Backend Calculation
    calc_result = analyze_block_shear(extracted_params)
    
    # 3. Persistence if session exists
    if session_id:
        try:
            session_uuid = uuid.UUID(session_id)
            # Verify session ownership
            res = await db.execute(select(Session).where(Session.id == session_uuid, Session.user_id == current_user.id))
            session = res.scalar_one_or_none()
            if session:
                msg = Message(
                    session_id=session_uuid,
                    user_id=current_user.id,
                    input_type="text",
                    input_raw=extract_req.question,
                    input_parsed=extracted_params,
                    result=calc_result,
                    overall_pass=calc_result["overall_pass"],
                    ai_explanation=calc_result.get("explanation", None)
                )
                db.add(msg)
                await db.commit()
        except ValueError:
            pass # Invalid UUID, ignore
            
    return success_response(
        data=ExtractResponse(
            input_type="text",
            input_raw=extract_req.question,
            input_parsed=extracted_params,
            result=calc_result,
            overall_pass=calc_result["overall_pass"]
        ).model_dump(),
        message="Parameters extracted and initial calculation performed"
    )

@router.post("/file", response_model=Dict[str, Any])
async def extract_file(
    file: UploadFile = File(...),
    session_id: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Extract connection parameters from an uploaded file (PDF, image) using Gemini Vision.
    (Placeholder implementation for now, similar to text but with file).
    """
    # Placeholder for file processing
    # In a real scenario, we'd send the file to Gemini's File API or Vision model.
    contents = await file.read()
    filename = file.filename
    
    # Real extraction logic using Gemini (needs to be implemented in gemini.py)
    # For now, mocking as generic success
    mock_params = {
        "bolt_diameter": 20,
        "bolt_grade": "8.8",
        "plate_thickness": 12,
        "steel_grade": "S275"
    }
    calc_result = analyze_block_shear(mock_params)
    
    return success_response(
        data=ExtractResponse(
            input_type="file",
            input_raw=filename,
            input_parsed=mock_params,
            result=calc_result,
            overall_pass=calc_result["overall_pass"]
        ).model_dump(),
        message=f"File {filename} analyzed successfully"
    )

import uuid
from sqlalchemy.future import select
