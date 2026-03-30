import base64
import json
from typing import Any, Dict, List, Optional

from anthropic import Anthropic
from loguru import logger

from app.config import settings

# Initialize Anthropic client
client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)

# Use user requested model
MODEL = "claude-sonnet-4-20250514" 

async def parse_text_question(question: str) -> Dict[str, Any]:
    """Parse engineering problem text to extract ConnectionInputs."""
    prompt = f"""
    You are a structural engineering assistant expert in BS 5950-1:2000.
    Extract the connection parameters from the following text and return them as a JSON object matching this schema:
    {{
      "connection_type": "lap_joint" | "butt_joint" | "gusset_plate" | "angle_cleat",
      "bolt_grade": "4.6" | "8.8",
      "bolt_diameter": number,
      "hole_diameter": number,
      "steel_grade": "S275" | "S355",
      "plate_thickness": number,
      "member_thickness": optional number,
      "layout": {{
        "rows": number,
        "cols": number,
        "pitch": number,
        "gauge": number,
        "edge_parallel": number,
        "edge_perpendicular": number
      }},
      "applied_force": number,
      "shear_planes": 1 | 2
    }}

    If a value is missing, infer the most engineering-appropriate default or mark as incomplete.
    Return ONLY JSON.

    Question: {question}
    """
    
    response = client.messages.create(
        model=MODEL,
        max_tokens=1000,
        system="You are an expert structural engineer specializing in steel connection design per BS 5950.",
        messages=[{"role": "user", "content": prompt}]
    )
    
    try:
        content = response.content[0].text
        # Extract JSON from response if it has markdown or extra text
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
        
        return json.loads(content)
    except Exception as e:
        logger.exception("Error parsing Claude response: {}", e)
        # Return fallback or raise
        return {}

async def parse_document_question(content: bytes, media_type: str, question: Optional[str] = None) -> Dict[str, Any]:
    """Parse engineering problem from a document (image, PDF, etc.) to extract ConnectionInputs."""
    
    # Format message content based on media type
    # For Images and PDFs
    
    encoded_content = base64.b64encode(content).decode("utf-8")
    
    message_content = []
    
    if media_type.startswith("image/"):
        message_content.append({
            "type": "image",
            "source": {
                "type": "base64",
                "media_type": media_type,
                "data": encoded_content
            }
        })
    elif media_type == "application/pdf":
        message_content.append({
            "type": "document",
            "source": {
                "type": "base64",
                "media_type": media_type,
                "data": encoded_content
            }
        })
    else:
        # Fallback for plain text or others
        message_content.append({
            "type": "text",
            "text": f"Analyzing raw document content (media_type: {media_type})"
        })

    prompt_text = "Extract the connection parameters from this document and return them as JSON matching the BS 5950 ConnectionInputs schema."
    if question:
        prompt_text += f"\nSpecific user question: {question}"
    
    message_content.append({"type": "text", "text": prompt_text})

    response = client.messages.create(
        model=MODEL,
        max_tokens=2000,
        messages=[{"role": "user", "content": message_content}]
    )
    
    try:
        content_out = response.content[0].text
        if "```json" in content_out:
            content_out = content_out.split("```json")[1].split("```")[0].strip()
        return json.loads(content_out)
    except Exception:
        return {}

async def explain_clause(clause_id: str) -> Dict[str, Any]:
    """Explain a BS 5950 clause in markdown."""
    prompt = f"Explain BS 5950-1:2000 Clause {clause_id} in professional engineering terms. Provide context, limitations, and how it applies to bolted connections. Return as Markdown."
    
    response = client.messages.create(
        model=MODEL,
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return {
        "clause": clause_id,
        "title": f"BS 5950 Clause {clause_id}",
        "content": response.content[0].text,
        "related_clauses": [] # AI could also suggest these
    }

async def generate_summary(result: Dict[str, Any]) -> str:
    """Generate a professional engineering summary paragraph for a calculation."""
    prompt = f"Based on the following structural calculation results, write a concise professional summary paragraph for an engineering report: {json.dumps(result)}"
    
    response = client.messages.create(
        model=MODEL,
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return response.content[0].text
