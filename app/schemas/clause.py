from pydantic import BaseModel
from typing import Optional, List


class ClauseBase(BaseModel):
    """Base clause schema"""
    number: str
    title: str
    section: str
    content: str
    equation: Optional[str] = None


class ClauseResponse(ClauseBase):
    """Clause response schema"""
    id: int
    references: Optional[List[str]] = []


class ClauseSearchResponse(BaseModel):
    """Clause search response"""
    results: List[ClauseResponse]
    total: int
