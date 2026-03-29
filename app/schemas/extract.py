from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class ExtractTextRequest(BaseModel):
    """Request schema for extracting connection parameters from text"""
    question: str = Field(..., min_length=1)


class ExtractResponse(BaseModel):
    """Response from extraction endpoints"""
    input_type: str # text, file
    input_raw: str
    input_parsed: Dict[str, Any]
    ai_explanation: Optional[str] = None
    overall_pass: bool = False
    result: Optional[Dict[str, Any]] = None
