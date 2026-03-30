from typing import Any, Dict

from loguru import logger

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


async def explain_reference(ref_id: str, ref_type: str) -> str:
    module = _provider_module()
    logger.info("AI provider selected for reference explain: {}", settings.AI_PROVIDER)
    return await module.explain_reference(ref_id, ref_type)


async def explain_result(inputs: Dict[str, Any], result: Dict[str, Any]) -> str:
    module = _provider_module()
    logger.info("AI provider selected for result explain: {}", settings.AI_PROVIDER)
    return await module.explain_result(inputs, result)
