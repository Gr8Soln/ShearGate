import os
import json
import google.generativeai as genai
from typing import Any, Dict, List, Optional
from app.config import settings

# Load BS 5950 context
CONTEXT_FILE = "bs5950_context.md"
if os.path.exists(CONTEXT_FILE):
    with open(CONTEXT_FILE, "r", encoding="utf-8") as f:
        BS5950_CONTEXT = f.read()
else:
    BS5950_CONTEXT = "BS 5950-1:2000 context not available."

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = f"""
You are ConnCalc AI, a structural engineering assistant specializing in BS 5950-1:2000 (Structural use of steelwork in building).
Your goal is to extract connection parameters from user descriptions/files and provide narrative explanations for calculations.

CONTEXT:
{BS5950_CONTEXT}

RULES:
1. Always refer to specific clauses (e.g., [CLAUSE:6.2.4]) or tables (e.g., [TABLE:T.30]) using this exact sentinel format.
2. For parameter extraction, return a valid JSON object.
3. If information is missing, make reasonable engineering assumptions for a standard bolted connection and list them.
4. Calculations are performed on the frontend, but you must provide the narrative "why" and "how".
"""

model = genai.GenerativeModel(
    model_name=settings.GEMINI_MODEL,
    system_instruction=SYSTEM_PROMPT
)

async def extract_from_text(question: str) -> Dict[str, Any]:
    """Extract connection parameters from a text description."""
    prompt = f"Extract connection parameters from the following structural engineering question. Return ONLY JSON.\n\nQuestion: {question}"
    
    response = model.generate_content(prompt)
    try:
        # Clean markdown code blocks if present
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3].strip()
        elif text.startswith("```"):
            text = text[3:-3].strip()
        return json.loads(text)
    except Exception as e:
        return {{"error": "Failed to parse Gemini response", "raw": response.text}}

async def explain_reference(ref_id: str, ref_type: str) -> str:
    """Explain a specific BS 5950 clause or table."""
    prompt = f"Explain the purpose and application of {ref_type} {ref_id} in the context of bolted connection design."
    response = model.generate_content(prompt)
    return response.text

async def explain_result(inputs: Dict[str, Any], result: Dict[str, Any]) -> str:
    """Provide a narrative explanation of a calculation result."""
    prompt = f"Explain the following calculation result. Inputs: {json.dumps(inputs)}. Result: {json.dumps(result)}. Highlight any critical checks or failures."
    response = model.generate_content(prompt)
    return response.text
