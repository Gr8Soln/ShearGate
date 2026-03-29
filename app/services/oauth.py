from google.oauth2 import id_token
from google.auth.transport import requests
from app.config import settings
from app.utils.response import failure_response
from fastapi import status

def verify_google_token(credential: str):
    """
    Verify the Google ID token sent from the frontend.
    Returns the user's profile information.
    """
    try:
        idinfo = id_token.verify_oauth2_token(
            credential, 
            requests.Request(), 
            settings.GOOGLE_CLIENT_ID
        )
        
        # ID token is valid, get the user's Google ID from the 'sub' claim
        return {
            "google_id": idinfo["sub"],
            "email": idinfo["email"],
            "name": idinfo.get("name", ""),
            "picture": idinfo.get("picture", "")
        }
    except ValueError as e:
        # Invalid token
        failure_response(
            message=f"Invalid Google ID token: {str(e)}", 
            status_code=status.HTTP_401_UNAUTHORIZED
        )
