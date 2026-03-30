from fastapi import status
from google.auth.transport import requests
from google.oauth2 import id_token
from loguru import logger

from app.config import settings
from app.utils.response import failure_response


def verify_google_token(credential: str):
    """
    Verify the Google ID token sent from the frontend.
    Returns the user's profile information.
    """
    if not credential:
        failure_response(
            message="Google credential is required.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    if not settings.GOOGLE_CLIENT_ID:
        logger.error("GOOGLE_CLIENT_ID is not configured on the server")
        failure_response(
            message="Google authentication is not configured on the server.",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    try:
        idinfo = id_token.verify_oauth2_token(
            credential, 
            requests.Request(), 
            settings.GOOGLE_CLIENT_ID
        )

        google_id = idinfo.get("sub")
        email = idinfo.get("email")
        if not google_id or not email:
            logger.warning("Google token missing required claims: sub/email")
            failure_response(
                message="Google token is missing required identity claims.",
                status_code=status.HTTP_401_UNAUTHORIZED,
            )

        return {
            "google_id": google_id,
            "email": email,
            "name": idinfo.get("name", ""),
            "picture": idinfo.get("picture", ""),
        }
    except ValueError as e:
        logger.warning("Invalid Google ID token: {}", e)
        failure_response(
            message="Invalid Google ID token.",
            status_code=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        logger.exception("Google token verification failed unexpectedly: {}", e)
        failure_response(
            message="Google authentication provider is unavailable.",
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
