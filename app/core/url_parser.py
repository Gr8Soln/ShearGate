from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


def parse_database_url(url: str) -> str:
    """Normalize DB URLs for SQLAlchemy + asyncpg."""
    if not url:
        return url

    # Ensure scheme is postgresql+asyncpg
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)

    parts = urlsplit(url)
    
    # Only process postgresql+asyncpg URLs
    if parts.scheme != "postgresql+asyncpg":
        return url

    # Parse query parameters
    query = dict(parse_qsl(parts.query))
    
    # Remove asyncpg-incompatible parameters (libpq style)
    # These often come from Neon/Vercel/Render connection strings
    incompatible = ["sslmode", "channel_binding"]
    has_ssl_requested = any(k in query for k in ["ssl", "sslmode"])
    
    for key in incompatible:
        query.pop(key, None)
        
    # If SSL was explicitly requested via sslmode, ensure ssl=require is set for asyncpg
    if has_ssl_requested and "ssl" not in query:
        query["ssl"] = "require"

    # Reconstruct the URL
    new_query = urlencode(query)
    return urlunsplit((parts.scheme, parts.netloc, parts.path, new_query, parts.fragment))
