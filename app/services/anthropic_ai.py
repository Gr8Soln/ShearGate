import base64
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


async def extract_from_file(
    file_bytes: bytes,
    filename: str,
    media_type: str | None,
    question: str | None = None,
) -> Dict[str, Any]:
    """Extract connection parameters directly from image/PDF bytes using Anthropic."""
    if client is None:
        return {"error": "ANTHROPIC_API_KEY is not configured"}

    if not media_type:
        return {"error": "Uploaded file content type is missing"}

    encoded = base64.b64encode(file_bytes).decode("utf-8")

    content: list[dict[str, Any]] = []
    if media_type.startswith("image/"):
        content.append(
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": media_type,
                    "data": encoded,
                },
            }
        )
    elif media_type == "application/pdf":
        content.append(
            {
                "type": "document",
                "source": {
                    "type": "base64",
                    "media_type": media_type,
                    "data": encoded,
                },
            }
        )
    else:
        return {
            "error": (
                f"Unsupported file type '{media_type}'. "
                "Please upload an image or PDF file."
            )
        }

    prompt = (
        "Extract bolted-connection parameters from this engineering file and return ONLY valid JSON. "
        "Prefer fields compatible with ShearGate inputs, such as: "
        "bolt_grade, bolt_diameter, number_of_bolts, pitch, gauge, edge_distance, end_distance, "
        "steel_grade, plate_thickness, applied_force, connection_type."
    )
    if question:
        prompt += f"\nUser note: {question}"
    prompt += f"\nFilename: {filename}"

    content.append({"type": "text", "text": prompt})

    try:
        tried_models = []
        last_error: Exception | None = None
        for model_name in list(dict.fromkeys(FALLBACK_MODELS)):
            tried_models.append(model_name)
            try:
                response = await client.messages.create(
                    model=model_name,
                    max_tokens=1200,
                    temperature=0,
                    system=SYSTEM_PROMPT,
                    messages=[{"role": "user", "content": content}],
                )
                text = _extract_message_text(response)
                text = _strip_markdown_fence(text)
                return json.loads(text)
            except Exception as e:
                last_error = e
                error_text = str(e)
                if "not_found_error" in error_text or "model:" in error_text:
                    continue
                raise

        raise RuntimeError(
            f"No available Anthropic model found. Tried: {', '.join(tried_models)}"
        ) from last_error
    except Exception as e:
        logger.exception("Failed to parse Anthropic file extraction response: {}", e)
        return {
            "error": "Failed to parse Anthropic file extraction response",
            "raw": text if "text" in locals() else "",
        }


async def explain_reference(ref_id: str, ref_type: str) -> str:
    """Explain a specific BS 5950 clause or table."""
    prompt = (
        f"Explain the purpose and application of {ref_type} {ref_id} "
        "in the context of bolted connection design under BS 5950-1:2000. "
        "Formatting rules: write symbols with inline LaTeX, e.g. $A_{e}$, $K_{e}$, $A_{tn}$, $P_{bs}$, $N/mm^2$. "
        "Do not use plain compact tokens like Atn, Pbs, Ke, ae when a symbol form exists."
    )

    try:
        return await _ask_anthropic(prompt, max_tokens=700, temperature=0.2)
    except Exception as e:
        logger.exception("Failed to explain reference using Anthropic: {}", e)
        return "AI explanation is temporarily unavailable."


async def explain_result(inputs: Dict[str, Any], result: Dict[str, Any]) -> str:
    """Provide a narrative explanation of a calculation result."""
    result_snapshot = {
        "pass": result.get("pass"),
        "utilization": result.get("utilization"),
        "design_capacity_kN": result.get("Pbs"),
        "applied_load_kN": inputs.get("appliedLoad") or inputs.get("applied_force"),
        "material": inputs.get("plateMaterial") or inputs.get("steel_grade"),
        "key_values": {
            "py": result.get("py"),
            "fu": result.get("fu"),
            "Av": result.get("Av"),
            "At": result.get("At"),
            "Atn": result.get("Atn"),
            "Pbs1": result.get("Pbs1"),
            "Pbs2": result.get("Pbs2"),
            "Pbs": result.get("Pbs"),
        },
        "steps": [
            {
                "title": step.get("title"),
                "clause": step.get("clause"),
                "description": step.get("description"),
            }
            for step in result.get("steps", [])[:6]
            if isinstance(step, dict)
        ],
    }

    prompt = (
        "Write a clean engineering narrative for this bolted-connection result.\n\n"
        "Output requirements (strict):\n"
        "1) Use plain text only (no JSON, no markdown code fences).\n"
        "2) Use exactly these section headers, each on its own line:\n"
        "Summary:\nGoverning Check:\nKey Checks:\nPractical Interpretation:\n"
        "3) Under Key Checks, provide 3 to 5 bullet points using '- '.\n"
        "4) Do NOT echo raw dictionaries, arrays, quoted keys, braces, or the literal word 'steps'.\n"
        "5) Keep it concise and readable for engineers.\n"
        "6) Reference standards with sentinels when relevant, e.g. [CLAUSE:6.2.4] or [TABLE:T.9].\n"
        "7) For variables and exponents, use inline LaTeX wrapped in $, e.g. $A_{tn}$, $P_{bs}$, $\\gamma_m$, $N/mm^2$.\n"
        "8) Do not use plain compact tokens like Atn, Pbs, Ke, ae when a symbol form exists.\n\n"
        f"Inputs: {json.dumps(inputs)}\n"
        f"Result summary: {json.dumps(result_snapshot)}"
    )

    try:
        return await _ask_anthropic(prompt, max_tokens=900, temperature=0.25)
    except Exception as e:
        logger.exception("Failed to explain result using Anthropic: {}", e)
        return "AI explanation is temporarily unavailable."
