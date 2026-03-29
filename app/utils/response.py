from typing import Any, Dict, Optional, Generic, TypeVar
from pydantic import BaseModel, Field
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse

T = TypeVar("T")

class PaginationMeta(BaseModel):
    current_page: Optional[int] = 0
    total_pages: Optional[int] = 0
    page_size: Optional[int] = 0
    total_data_fetched: Optional[int] = 0
    total_data: Optional[int] = 0
    previous: Optional[str] = None
    next: Optional[str] = None

class APIResponse(BaseModel, Generic[T]):
    status: str = "successful"
    message: str = ""
    data: Optional[T] = None
    metadata: PaginationMeta = Field(default_factory=PaginationMeta)

def success_response(
    data: Any = None, 
    message: str = "Request processed successfully", 
    meta: Optional[PaginationMeta] = None
) -> Dict[str, Any]:
    return {
        "status": "successful",
        "message": message,
        "data": data,
        "metadata": meta.model_dump() if meta else PaginationMeta().model_dump()
    }

def failure_response(
    message: str = "Request failed", 
    status_code: int = status.HTTP_400_BAD_REQUEST,
    data: Any = None
):
    raise HTTPException(
        status_code=status_code,
        detail={
            "status": "failed",
            "message": message,
            "data": data,
            "metadata": PaginationMeta().model_dump()
        }
    )
