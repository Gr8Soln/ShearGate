from pydantic import BaseModel, Field
from typing import Optional, List, Literal
from datetime import datetime


class ConnectionInputs(BaseModel):
    """Connection input parameters"""
    boltGrade: Literal["4.6", "8.8"]
    boltDiameter: float = Field(..., gt=0)
    numberOfBolts: int = Field(..., gt=0)
    pitch: float = Field(..., gt=0)
    edgeDistance: float = Field(..., gt=0)
    endDistance: float = Field(..., gt=0)
    plateMaterial: Literal["S275", "S355", "S235"]
    plateThickness: float = Field(..., gt=0)
    gauge: float = Field(..., gt=0)
    connectionType: Literal["bearing", "slip-resistant", "tension"]
    appliedLoad: float = Field(..., ge=0)


class CalculationStep(BaseModel):
    """Single calculation step"""
    step: int
    title: str
    content: str
    clause: str
    formulas: List[str]


class CalculationResult(BaseModel):
    """Calculation result"""
    blockShearOccurs: bool
    blockShearCapacity: float
    appliedLoad: float
    utilizationRatio: float
    verdict: str
    mode1Capacity: float
    mode2Capacity: float
    calculations: Optional[dict] = None


class CalculationCreate(BaseModel):
    """Create calculation request"""
    questionText: Optional[str] = None
    inputs: ConnectionInputs


class CalculationResponse(BaseModel):
    """Calculation response"""
    id: str = Field(..., alias="_id")
    user_id: Optional[str] = None
    timestamp: datetime
    questionText: Optional[str] = None
    inputs: ConnectionInputs
    result: CalculationResult
    steps: List[CalculationStep]
    
    class Config:
        populate_by_name = True


class ParseQuestionRequest(BaseModel):
    """Parse question text request"""
    question: str = Field(..., min_length=10)


class ParseImageRequest(BaseModel):
    """Parse image request"""
    image_base64: str
