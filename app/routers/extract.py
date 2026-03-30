import uuid
from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, File, Form, Query, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.db import get_db
from app.models.domain import Message, Session, User
from app.schemas.extract import ExtractResponse, ExtractTextRequest
from app.services.ai_provider import extract_from_file, extract_from_text
from app.services.auth import get_current_user
from app.services.bs5950.block_shear import analyze_block_shear
from app.utils.response import failure_response, success_response

router = APIRouter(prefix="/extract", tags=["Extraction"])


def _to_float(value: Any) -> Optional[float]:
    try:
        if value is None or value == "":
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def _normalize_extracted_params(raw: Dict[str, Any]) -> Dict[str, Any]:
    """Normalize AI output to include both snake_case and camelCase keys."""
    layout = raw.get("layout") if isinstance(raw.get("layout"), dict) else {}

    bolt_diameter = _to_float(raw.get("bolt_diameter") or raw.get("boltDiameter"))
    pitch = _to_float(raw.get("pitch") or layout.get("pitch"))
    gauge = _to_float(raw.get("gauge") or layout.get("gauge"))
    edge_distance = _to_float(
        raw.get("edge_distance")
        or raw.get("edgeDistance")
        or layout.get("edge_perpendicular")
    )
    end_distance = _to_float(
        raw.get("end_distance")
        or raw.get("endDistance")
        or layout.get("edge_parallel")
    )
    plate_thickness = _to_float(
        raw.get("plate_thickness") or raw.get("plateThickness")
    )
    applied_force = _to_float(
        raw.get("applied_force") or raw.get("appliedLoad") or raw.get("applied_load")
    )

    number_of_bolts: Optional[int] = None
    if raw.get("number_of_bolts") is not None:
        try:
            number_of_bolts = int(raw.get("number_of_bolts"))
        except (TypeError, ValueError):
            number_of_bolts = None
    elif raw.get("numberOfBolts") is not None:
        try:
            number_of_bolts = int(raw.get("numberOfBolts"))
        except (TypeError, ValueError):
            number_of_bolts = None
    elif layout.get("rows") and layout.get("cols"):
        try:
            number_of_bolts = int(layout.get("rows")) * int(layout.get("cols"))
        except (TypeError, ValueError):
            number_of_bolts = None

    steel_grade = (
        raw.get("steel_grade")
        or raw.get("plate_material")
        or raw.get("plateMaterial")
        or raw.get("material")
    )
    bolt_grade = raw.get("bolt_grade") or raw.get("boltGrade")
    connection_type = raw.get("connection_type") or raw.get("connectionType")

    normalized = {
        # snake_case
        "connection_type": connection_type,
        "bolt_grade": bolt_grade,
        "bolt_diameter": bolt_diameter,
        "number_of_bolts": number_of_bolts,
        "pitch": pitch,
        "edge_distance": edge_distance,
        "end_distance": end_distance,
        "plate_thickness": plate_thickness,
        "steel_grade": steel_grade,
        "gauge": gauge,
        "applied_force": applied_force,
        # camelCase
        "connectionType": connection_type,
        "boltGrade": bolt_grade,
        "boltDiameter": bolt_diameter,
        "numberOfBolts": number_of_bolts,
        "edgeDistance": edge_distance,
        "endDistance": end_distance,
        "plateThickness": plate_thickness,
        "plateMaterial": steel_grade,
        "appliedLoad": applied_force,
    }

    # Preserve original AI fields and overlay normalized aliases.
    return {**raw, **{k: v for k, v in normalized.items() if v is not None}}

@router.post("/text", response_model=Dict[str, Any])
async def extract_text(
    extract_req: ExtractTextRequest,
    session_id: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Extract connection parameters from a text description using AI.
    Then performs an initial calculation and saves the result in the session.
    """
    # 1. AI Extract
    raw_extracted = await extract_from_text(extract_req.question)
    extracted_params = _normalize_extracted_params(raw_extracted)
    
    if "error" in raw_extracted:
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
    question: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Extract connection parameters from an uploaded file (PDF, image) using AI.
    """
    contents = await file.read()
    filename = file.filename or "uploaded-file"

    raw_extracted = await extract_from_file(
        file_bytes=contents,
        filename=filename,
        media_type=file.content_type,
        question=question,
    )
    extracted_params = _normalize_extracted_params(raw_extracted)

    if "error" in raw_extracted:
        failure_response(raw_extracted["error"], status.HTTP_500_INTERNAL_SERVER_ERROR)

    calc_result = analyze_block_shear(extracted_params)

    if session_id:
        try:
            session_uuid = uuid.UUID(session_id)
            res = await db.execute(
                select(Session).where(
                    Session.id == session_uuid,
                    Session.user_id == current_user.id,
                )
            )
            session = res.scalar_one_or_none()
            if session:
                msg = Message(
                    session_id=session_uuid,
                    user_id=current_user.id,
                    input_type="file",
                    input_raw=question or filename,
                    input_parsed=extracted_params,
                    result=calc_result,
                    overall_pass=calc_result.get("overall_pass", False),
                    ai_explanation=calc_result.get("explanation"),
                )
                db.add(msg)
                await db.commit()
        except ValueError:
            pass
    
    return success_response(
        data=ExtractResponse(
            input_type="file",
            input_raw=filename,
            input_parsed=extracted_params,
            result=calc_result,
            overall_pass=calc_result.get("overall_pass", False)
        ).model_dump(),
        message=f"File {filename} analyzed successfully"
    )
