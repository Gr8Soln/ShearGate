from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.schemas.calculation import ParseQuestionRequest, ParseResponse
from app.services.claude import parse_document_question, parse_text_question

router = APIRouter(
    prefix="/parse",
    tags=["parse"]
)

@router.post("/text", response_model=ParseResponse)
async def parse_text(request: ParseQuestionRequest):
    """Parse engineering problem text to extract inputs."""
    inputs = await parse_text_question(request.question)
    if not inputs:
        raise HTTPException(status_code=422, detail="Could not parse connection parameters from text")
    
    return {
        "raw_question": request.question,
        "inputs": inputs,
        "confidence": 0.85, # Mock confidence
        "assumptions": []
    }

@router.post("/image", response_model=ParseResponse)
async def parse_image(
    file: UploadFile = File(...),
    question: Optional[str] = Form(None)
):
    """Parse document (image, PDF) to extract inputs."""
    content = await file.read()
    media_type = file.content_type
    
    if not media_type or (not media_type.startswith("image/") and media_type != "application/pdf"):
        raise HTTPException(
            status_code=400, 
            detail="Unsupported file type. Please upload an image or PDF."
        )
    
    inputs = await parse_document_question(content, media_type, question)
    if not inputs:
        raise HTTPException(status_code=422, detail="Could not parse connection parameters from document")
    
    return {
        "raw_question": question or f"Uploaded document: {file.filename}",
        "inputs": inputs,
        "confidence": 0.80, # Mock confidence
        "assumptions": []
    }
