import asyncpg
from app.config import settings


class PostgreSQL:
    """PostgreSQL database connection manager"""
    
    pool: asyncpg.Pool = None
    
    @classmethod
    async def connect(cls):
        """Create PostgreSQL connection pool"""
        cls.pool = await asyncpg.create_pool(
            settings.POSTGRES_URL,
            min_size=2,
            max_size=10
        )
        print(f"✅ Connected to PostgreSQL")
    
    @classmethod
    async def disconnect(cls):
        """Close PostgreSQL connection pool"""
        if cls.pool:
            await cls.pool.close()
            print("❌ Disconnected from PostgreSQL")
    
    @classmethod
    async def get_connection(cls):
        """Get a connection from the pool"""
        return await cls.pool.acquire()
    
    @classmethod
    async def release_connection(cls, connection):
        """Release a connection back to the pool"""
        await cls.pool.release(connection)
