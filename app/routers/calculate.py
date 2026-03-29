from fastapi import APIRouter
from typing import Dict, Any, Optional

from app.schemas.calculation import ConnectionInputs, CalculationResponse
from app.services.bs5950.block_shear import analyze_block_shear

router = APIRouter(
    prefix="/calculate",
    tags=["calculate"]
)

@router.post("")
async def calculate_endpoint(inputs: Dict[str, Any], session_id: Optional[str] = None):
    """Run block shear calculation."""
    # We call our newly created analytical function
    result = analyze_block_shear(inputs)
    
    return {
        "id": "result_123",
        "timestamp": "2026-03-29T12:00:00Z",
        "inputs": inputs,
        "result": result,
        "steps": result.get("steps", [])
    }
