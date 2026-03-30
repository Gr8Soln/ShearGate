import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.config import settings
from app.core.logging import configure_logging
from app.routers import auth, explain, extract, sessions
from app.utils.response import success_response

configure_logging()

# Create FastAPI app
app = FastAPI(
    title="ShearGate API",
    description="Structural Engineering Connection Design API — BS 5950-1:2000",
    version="1.0.0"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_origin_regex=settings.cors_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_request_timing(request, call_next):
    start = time.perf_counter()
    try:
        response = await call_next(request)
    except Exception:
        elapsed_ms = (time.perf_counter() - start) * 1000
        logger.exception(
            "{} {} failed after {:.2f}ms",
            request.method,
            request.url.path,
            elapsed_ms,
        )
        raise

    elapsed_ms = (time.perf_counter() - start) * 1000
    logger.info(
        "{} {} -> {} ({:.2f}ms)",
        request.method,
        request.url.path,
        response.status_code,
        elapsed_ms,
    )
    return response

# Include routers
app.include_router(auth.router)
app.include_router(extract.router)
app.include_router(explain.router)
app.include_router(sessions.router)


@app.on_event("startup")
async def on_startup() -> None:
    logger.info("ShearGate API started in {} mode", settings.ENVIRONMENT)


@app.on_event("shutdown")
async def on_shutdown() -> None:
    logger.info("ShearGate API shutting down")

@app.get("/")
async def root():
    """API Health Check"""
    return success_response(
        message="ShearGate API is online",
        data={
            "api": "ShearGate",
            "version": "1.0.0",
            "support": "BS 5950-1:2000"
        }
    )
