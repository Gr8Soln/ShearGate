import json
import os
from typing import Any, Dict

from loguru import logger
from openai import AsyncOpenAI

from app.core.config import settings

CONTEXT_FILE = "bs5950_context.md"
if os.path.exists(CONTEXT_FILE):
    with open(CONTEXT_FILE, "r", encoding="utf-8") as f:
        BS5950_CONTEXT = f.read()
else:
    BS5950_CONTEXT = "BS 5950-1:2000 context not available."


SYSTEM_PROMPT = f"""
You are ShearGate AI, a structural engineering assistant specializing in BS 5950-1:2000 (Structural use of steelwork in building).
Your goal is to extract connection parameters from user descriptions/files and provide narrative explanations for calculations.

CONTEXT:
{BS5950_CONTEXT}

RULES:
1. Always refer to specific clauses (e.g., [CLAUSE:6.2.4]) or tables (e.g., [TABLE:T.30]) using this exact sentinel format.
2. For parameter extraction, return a valid JSON object.
3. If information is missing, make reasonable engineering assumptions for a standard bolted connection and list them.
4. Calculations are performed on the frontend, but you must provide the narrative "why" and "how".
"""


client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY.strip() else None


def _strip_markdown_fence(text: str) -> str:
    cleaned = text.strip()
    if cleaned.startswith("```json"):
        return cleaned[7:].removesuffix("```").strip()
    if cleaned.startswith("```"):
        return cleaned[3:].removesuffix("```").strip()
    return cleaned


async def _ask_openai(prompt: str, max_tokens: int = 800, temperature: float = 0.1) -> str:
    if client is None:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        temperature=temperature,
        max_tokens=max_tokens,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
    )

    return (response.choices[0].message.content or "").strip()


async def extract_from_text(question: str) -> Dict[str, Any]:
    if client is None:
        return {"error": "OPENAI_API_KEY is not configured"}

    prompt = (
        "Extract connection parameters from the structural engineering question below. "
        "Return ONLY a valid JSON object, no prose or markdown.\n\n"
        f"Question: {question}"
    )

    try:
        text = await _ask_openai(prompt, max_tokens=700, temperature=0)
        text = _strip_markdown_fence(text)
        return json.loads(text)
    except Exception as e:
        logger.exception("Failed to parse OpenAI extraction response: {}", e)
        return {"error": "Failed to parse OpenAI response", "raw": text if "text" in locals() else ""}


async def explain_reference(ref_id: str, ref_type: str) -> str:
    prompt = (
        f"Explain the purpose and application of {ref_type} {ref_id} "
        "in the context of bolted connection design under BS 5950-1:2000."
    )

    try:
        return await _ask_openai(prompt, max_tokens=700, temperature=0.2)
    except Exception as e:
        logger.exception("Failed to explain reference using OpenAI: {}", e)
        return "AI explanation is temporarily unavailable."


async def explain_result(inputs: Dict[str, Any], result: Dict[str, Any]) -> str:
    prompt = (
        "Explain the following calculation result. "
        f"Inputs: {json.dumps(inputs)}. Result: {json.dumps(result)}. "
        "Highlight key checks, governing failure mode, and practical engineering interpretation."
    )

    try:
        return await _ask_openai(prompt, max_tokens=900, temperature=0.25)
    except Exception as e:
        logger.exception("Failed to explain result using OpenAI: {}", e)
        return "AI explanation is temporarily unavailable."
