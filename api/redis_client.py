import redis.asyncio as redis

redis_pool = redis.ConnectionPool.from_url("redis://localhost:6379", decode_responses=True)
redis_client = redis.Redis(connection_pool=redis_pool)