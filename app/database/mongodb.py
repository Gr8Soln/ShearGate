from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings


class MongoDB:
    """MongoDB database connection manager"""
    
    client: AsyncIOMotorClient = None
    database = None
    
    @classmethod
    async def connect(cls):
        """Connect to MongoDB"""
        cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
        cls.database = cls.client[settings.MONGODB_DB_NAME]
        print(f"✅ Connected to MongoDB: {settings.MONGODB_DB_NAME}")
    
    @classmethod
    async def disconnect(cls):
        """Disconnect from MongoDB"""
        if cls.client:
            cls.client.close()
            print("❌ Disconnected from MongoDB")
    
    @classmethod
    def get_database(cls):
        """Get database instance"""
        return cls.database


# Collection helpers
def get_users_collection():
    """Get users collection"""
    return MongoDB.get_database()["users"]


def get_calculations_collection():
    """Get calculations collection"""
    return MongoDB.get_database()["calculations"]
