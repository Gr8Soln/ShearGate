from io import BytesIO
from typing import Any, Dict

from loguru import logger
from pypdf import PdfReader

from app.core.config import settings
from app.services import anthropic_ai, gemini, openai_ai


def _provider_module():
    provider = settings.AI_PROVIDER
    if provider == "openai":
        return openai_ai
    if provider == "gemini":
        return gemini
    return anthropic_ai


async def extract_from_text(question: str) -> Dict[str, Any]:
    module = _provider_module()
    logger.info("AI provider selected for extraction: {}", settings.AI_PROVIDER)
    return await module.extract_from_text(question)


async def extract_from_file(
    file_bytes: bytes,
    filename: str,
    media_type: str | None,
    question: str | None = None,
) -> Dict[str, Any]:
    module = _provider_module()
    logger.info("AI provider selected for file extraction: {}", settings.AI_PROVIDER)

    if hasattr(module, "extract_from_file"):
        return await module.extract_from_file(
            file_bytes=file_bytes,
            filename=filename,
            media_type=media_type,
            question=question,
        )

    # Fallback for providers that do not support native file/vision extraction:
    # parse PDF text locally, then run the existing text extraction pipeline.
    if media_type == "application/pdf":
        try:
            reader = PdfReader(BytesIO(file_bytes))
            extracted_text = "\n".join((page.extract_text() or "") for page in reader.pages).strip()
            if not extracted_text:
                return {
                    "error": "Could not extract readable text from the uploaded PDF."
                }

            prompt = (
                "Extract connection parameters from this PDF content. "
                "Return ONLY a valid JSON object.\n\n"
                f"Filename: {filename}\n"
                f"User note: {question or 'N/A'}\n\n"
                f"PDF text:\n{extracted_text[:40000]}"
            )
            return await extract_from_text(prompt)
        except Exception as e:
            logger.exception("PDF fallback extraction failed: {}", e)
            return {"error": "Failed to extract parameters from PDF text."}

    return {
        "error": (
            f"File extraction is not implemented for provider '{settings.AI_PROVIDER}'. "
            "Switch AI_PROVIDER to 'anthropic' for image extraction support."
        )
    }


async def explain_reference(ref_id: str, ref_type: str) -> str:
    module = _provider_module()
    logger.info("AI provider selected for reference explain: {}", settings.AI_PROVIDER)
    return await module.explain_reference(ref_id, ref_type)


async def explain_result(inputs: Dict[str, Any], result: Dict[str, Any]) -> str:
    module = _provider_module()
    logger.info("AI provider selected for result explain: {}", settings.AI_PROVIDER)
    return await module.explain_result(inputs, result)
