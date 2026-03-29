import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict


class MessageResponse(BaseModel):
    id: uuid.UUID
    session_id: uuid.UUID
    input_type: str
    input_raw: str
    input_parsed: Optional[Dict[str, Any]] = None
    result: Optional[Dict[str, Any]] = None
    overall_pass: bool
    ai_explanation: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SessionResponse(BaseModel):
    id: uuid.UUID
    title: str
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class SessionDetailResponse(SessionResponse):
    messages: List[MessageResponse] = []


class CreateSessionRequest(BaseModel):
    title: Optional[str] = "New Connection Analysis"


class UpdateSessionRequest(BaseModel):
    title: str
