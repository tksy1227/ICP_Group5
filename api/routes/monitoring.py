from fastapi import APIRouter, HTTPException, status, Depends
from redis_client import redis_client

router = APIRouter()

@router.get("/monitoring/hot-products")
async def get_hot_products():
    # Fetch top 10 products from leaderboard
    hot_products = redis_client.zrevrange('global:product_request_leaderboard', 0, 9, withscores=True)

    return {"hot_products": [{"product_id": product_id, "request_count": int(request_count)} for product_id, request_count in hot_products]}