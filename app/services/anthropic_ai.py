import json
import os
from typing import Any, Dict

from anthropic import AsyncAnthropic
from loguru import logger

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


client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY) if settings.ANTHROPIC_API_KEY.strip() else None

FALLBACK_MODELS = [
    settings.ANTHROPIC_MODEL,
    "claude-3-5-haiku-20241022",
    "claude-3-haiku-20240307",
]


def _strip_markdown_fence(text: str) -> str:
    cleaned = text.strip()
    if cleaned.startswith("```json"):
        return cleaned[7:].removesuffix("```").strip()
    if cleaned.startswith("```"):
        return cleaned[3:].removesuffix("```").strip()
    return cleaned


def _extract_message_text(response: Any) -> str:
    chunks = []
    for block in response.content:
        if getattr(block, "type", "") == "text":
            chunks.append(block.text)
    return "\n".join(chunks).strip()


async def _ask_anthropic(prompt: str, max_tokens: int = 800, temperature: float = 0.1) -> str:
    if client is None:
        raise RuntimeError("ANTHROPIC_API_KEY is not configured")

    tried_models = []
    last_error: Exception | None = None

    # Keep order but remove duplicates if configured model equals one fallback.
    model_candidates = list(dict.fromkeys(FALLBACK_MODELS))

    for model_name in model_candidates:
        tried_models.append(model_name)
        try:
            response = await client.messages.create(
                model=model_name,
                max_tokens=max_tokens,
                temperature=temperature,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": prompt}],
            )
            if model_name != settings.ANTHROPIC_MODEL:
                logger.warning(
                    "Configured Anthropic model unavailable. Fallback model '{}' used.",
                    model_name,
                )
            return _extract_message_text(response)
        except Exception as e:
            last_error = e
            error_text = str(e)
            # Retry only for model-not-found style errors; otherwise fail fast.
            if "not_found_error" in error_text or "model:" in error_text:
                continue
            raise

    raise RuntimeError(
        f"No available Anthropic model found. Tried: {', '.join(tried_models)}"
    ) from last_error


async def extract_from_text(question: str) -> Dict[str, Any]:
    """Extract connection parameters from a text description."""
    if client is None:
        return {"error": "ANTHROPIC_API_KEY is not configured"}

    prompt = (
        "Extract connection parameters from the structural engineering question below. "
        "Return ONLY a valid JSON object, no prose or markdown.\n\n"
        f"Question: {question}"
    )

    try:
        text = await _ask_anthropic(prompt, max_tokens=700, temperature=0)
        text = _strip_markdown_fence(text)
        return json.loads(text)
    except Exception as e:
        logger.exception("Failed to parse Anthropic extraction response: {}", e)
        return {"error": "Failed to parse Anthropic response", "raw": text if "text" in locals() else ""}


async def explain_reference(ref_id: str, ref_type: str) -> str:
    """Explain a specific BS 5950 clause or table."""
    prompt = (
        f"Explain the purpose and application of {ref_type} {ref_id} "
        "in the context of bolted connection design under BS 5950-1:2000."
    )

    try:
        return await _ask_anthropic(prompt, max_tokens=700, temperature=0.2)
    except Exception as e:
        logger.exception("Failed to explain reference using Anthropic: {}", e)
        return "AI explanation is temporarily unavailable."


async def explain_result(inputs: Dict[str, Any], result: Dict[str, Any]) -> str:
    """Provide a narrative explanation of a calculation result."""
    prompt = (
        "Explain the following calculation result. "
        f"Inputs: {json.dumps(inputs)}. Result: {json.dumps(result)}. "
        "Highlight key checks, governing failure mode, and practical engineering interpretation."
    )

    try:
        return await _ask_anthropic(prompt, max_tokens=900, temperature=0.25)
    except Exception as e:
        logger.exception("Failed to explain result using Anthropic: {}", e)
        return "AI explanation is temporarily unavailable."
