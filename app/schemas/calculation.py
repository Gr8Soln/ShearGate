import uuid
from datetime import datetime
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field


class BoltLayout(BaseModel):
    rows: int
    cols: int
    pitch: float
    gauge: float
    edge_parallel: float
    edge_perpendicular: float


class ConnectionInputs(BaseModel):
    """Connection input parameters"""
    connection_type: Literal["lap_joint", "butt_joint", "gusset_plate", "angle_cleat"]
    bolt_grade: Literal["4.6", "8.8"]
    bolt_diameter: float = Field(..., gt=0)
    hole_diameter: float = Field(..., gt=0)
    steel_grade: Literal["S275", "S355"]
    plate_thickness: float = Field(..., gt=0)
    member_thickness: Optional[float] = None
    layout: BoltLayout
    applied_force: float = Field(..., ge=0)
    shear_planes: Literal[1, 2]


class CalcStep(BaseModel):
    """Single calculation step"""
    description: str
    formula: str
    substitution: str
    result: str
    unit: str
    clause: Optional[str] = None


class CheckResult(BaseModel):
    """Single check result (e.g. Shear, Bearing)"""
    id: str
    name: str
    clause: str
    clause_title: str
    steps: List[CalcStep]
    capacity: float
    applied: float
    utilisation: float
    pass_: bool = Field(..., alias="pass")
    note: Optional[str] = None

    model_config = ConfigDict(populate_by_name=True)


class SolutionResult(BaseModel):
    """Full solution result"""
    connection_type: str
    inputs: ConnectionInputs
    checks: List[CheckResult]
    overall_pass: bool
    governing_check: str
    summary: str


class CalculationOut(BaseModel):
    """Calculation database output"""
    id: uuid.UUID
    session_id: uuid.UUID
    user_id: uuid.UUID
    input_raw: str
    input_parsed: ConnectionInputs
    result: SolutionResult
    overall_pass: bool
    governing_check: str
    created_at: datetime

    class Config:
        from_attributes = True


class SaveCalculationRequest(BaseModel):
    """Save calculation request"""
    input_raw: str
    input_parsed: ConnectionInputs
    result: SolutionResult
    overall_pass: bool
    governing_check: str


class ParseQuestionRequest(BaseModel):
    """Parse question text request"""
    question: str = Field(..., min_length=1)


class ParseResponse(BaseModel):
    """Response from parse endpoints"""
    raw_question: str
    inputs: ConnectionInputs
    confidence: Optional[float] = None
    assumptions: Optional[List[str]] = None
