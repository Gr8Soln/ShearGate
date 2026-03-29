from fastapi import APIRouter, HTTPException
from app.services.claude import explain_clause

router = APIRouter(
    prefix="/clauses",
    tags=["clauses"]
)

@router.get("/{clause_id}")
async def get_clause_detail(clause_id: str):
    """
    Get detailed explanation for a BS 5950 clause.
    """
    try:
        explanation = await explain_clause(clause_id)
        return explanation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
