import json
from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, Request, status

from app.schemas.user import UserResponse
from app.services.ai_provider import explain_reference, explain_result
from app.services.auth import get_current_user
from app.utils.response import failure_response, success_response

router = APIRouter(prefix="/explain", tags=["Exploration"])

@router.post("/result", response_model=Dict[str, Any])
async def explain_calculation(
    request: Request,
    current_user: Any = Depends(get_current_user)
):
    """
    Provide a narrative explanation of a calculation result.
    Request body: { "inputs": { ... }, "result": { ... } }
    """
    body = await request.json()
    inputs = body.get("inputs")
    result = body.get("result")
    
    if not inputs or not result:
        failure_response("Inputs and calculation result are required", status.HTTP_400_BAD_REQUEST)
        
    explanation = await explain_result(inputs, result)
    
    return success_response(
        data={"explanation": explanation},
        message="Calculation result explained by AI"
    )

@router.post("/reference", response_model=Dict[str, Any])
async def explain_bs5950_reference(
    request: Request,
    current_user: Any = Depends(get_current_user)
):
    """
    Explain a BS 5950 clause, table, or parameter.
    Request body: { "ref_id": "6.2.4", "ref_type": "clause" }
    """
    body = await request.json()
    ref_id = body.get("ref_id")
    ref_type = body.get("ref_type", "reference")
    
    if not ref_id:
        failure_response("Reference ID (ref_id) is required", status.HTTP_400_BAD_REQUEST)
        
    explanation = await explain_reference(ref_id, ref_type)
    
    return success_response(
        data={"explanation": explanation},
        message=f"BS 5950 {ref_type} {ref_id} explained by AI"
    )
