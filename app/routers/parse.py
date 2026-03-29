from typing import Any, Dict

from fastapi import APIRouter, File, UploadFile

from app.schemas.calculation import ConnectionInputs, ParseQuestionRequest

router = APIRouter(
    prefix="/parse",
    tags=["parse"]
)

@router.post("/text")
async def parse_text(request: ParseQuestionRequest):
    """Parse engineering problem text to extract inputs."""
    # TODO: Implement AI parsing
    return {
        "boltGrade": "8.8",
        "boltDiameter": 20,
        "numberOfBolts": 4,
        "pitch": 70,
        "edgeDistance": 50,
        "endDistance": 50,
        "plateMaterial": "S275",
        "plateThickness": 10,
        "gauge": 60,
        "connectionType": "bearing",
        "appliedLoad": 320
    }

@router.post("/image")
async def parse_image(file: UploadFile = File(...)):
    """Parse image to extract inputs."""
    # TODO: Implement vision parsing
    return {
        "boltGrade": "8.8",
        "boltDiameter": 20,
        "numberOfBolts": 4,
        "pitch": 70,
        "edgeDistance": 50,
        "endDistance": 50,
        "plateMaterial": "S275",
        "plateThickness": 10,
        "gauge": 60,
        "connectionType": "bearing",
        "appliedLoad": 320
    }
