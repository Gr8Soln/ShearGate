from typing import Any, Dict

from fastapi import APIRouter, HTTPException

from app.services.bs5950.data import BS5950_TABLES

router = APIRouter(
    prefix="/clauses",
    tags=["clauses"]
)

@router.get("/{table_id}")
async def get_table_details(table_id: str) -> Dict[str, Any]:
    """
    Get the details of a BS5950 table.
    For example: /clauses/T.30
    """
    # Specifically intercept "T." queries
    if table_id.startswith("T."):
        table_data = BS5950_TABLES.get(table_id)
        if not table_data:
            raise HTTPException(status_code=404, detail="Table not found")
        return {"id": table_id, "data": table_data}
    
    # Normally this would fetch other clause info, returning a placeholder
    return {"id": table_id, "detail": "Clause text goes here"}
