from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from uuid import UUID
import json
import time

from database.database import get_db
from database.models import RecommendationFeedback
from schemas.schemas import (
    ApiV1EcommerceRecommendationUserGet200Response,
    ApiV1EcommerceRecommendationUserProductPost200Response,
    ApiV1EcommerceRecommendationFeedbackPostRequestBody,
    ApiV1EcommerceRecommendationFeedbackPostResponse,
    ErrorResponse,
    HTTPValidationError,
    RecommendedProductList
)
from services.recsys_func import get_user_recommendations, get_product_recommendations
from redis_client import redis_client

router = APIRouter()

@router.get("/user/{user_id}", response_model=ApiV1EcommerceRecommendationUserGet200Response)
async def get_recommendations_by_user(user_id: UUID, db: Session = Depends(get_db)):
    cache_key = f"recommendation:user:{user_id}"
    ttl = 300  # 5 minutes

    cached_data = redis_client.get(cache_key)
    if cached_data:
        recommendations = json.loads(cached_data)
        return ApiV1EcommerceRecommendationUserGet200Response(
            items=[RecommendedProductList(Items=recommendations)]
        )
    
    recommendations = get_user_recommendations(user_id, db)

    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")
    
    redis_client.setex(cache_key, ttl, json.dumps([r.model_dump() for r in recommendations]))

    return ApiV1EcommerceRecommendationUserGet200Response(
        items=[RecommendedProductList(Items=recommendations)]
    )

WINDOW_SIZE_SEC = 3600
REQ_THRESHOLD = 5
CACHE_TTL = 1800

@router.get("/product/{product_id}", response_model=ApiV1EcommerceRecommendationUserProductPost200Response)
async def get_recommendations_by_product(product_id: UUID, db: Session = Depends(get_db)):
    current_timestamp = time.time()
    zset_key = f"product:request_times:{product_id}"
    cache_key = f"recommendation:product:{product_id}"

    # Tracking requests
    redis_client.zadd(zset_key, {current_timestamp: current_timestamp})
    redis_client.zremrangebyscore(zset_key, 0, current_timestamp - WINDOW_SIZE_SEC)
    
    req_count = redis_client.zcard(zset_key)
    redis_client.expire(zset_key, WINDOW_SIZE_SEC)

    if req_count >= REQ_THRESHOLD:
        cached_data = redis_client.get(cache_key)
        if cached_data:
            recommendations = json.loads(cached_data)
            return ApiV1EcommerceRecommendationUserProductPost200Response(
                items=[RecommendedProductList(Items=recommendations)]
            )
        
    # Global leaderboard for monitoring
    redis_client.zincrby('global:product_request_leaderboard', 1, str(product_id))

    recommendations = get_product_recommendations(product_id, db)

    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")

    if req_count >= REQ_THRESHOLD:
        redis_client.setex(cache_key, CACHE_TTL, json.dumps([r.model_dump() for r in recommendations]))

    return ApiV1EcommerceRecommendationUserProductPost200Response(
        items=[RecommendedProductList(Items=recommendations)]
    )


@router.post("/feedback", response_model=ApiV1EcommerceRecommendationFeedbackPostResponse)
async def post_feedback(
    feedback: ApiV1EcommerceRecommendationFeedbackPostRequestBody,
    db: Session = Depends(get_db)
):
    if not all([feedback.user_id, feedback.product_id, feedback.recommendation_id, feedback.action]):
        raise HTTPException(status_code=400, detail={"message": "Missing fields"})

    try:
        db.add(RecommendationFeedback(
            user_id=feedback.user_id,
            product_id=feedback.product_id,
            recommendation_id=feedback.recommendation_id,
            action=feedback.action.value
        ))
        db.commit()

         # Invalidate user-specific cache
        redis_client.delete(f"recommendation:user:{feedback.user_id}")
        return ApiV1EcommerceRecommendationFeedbackPostResponse(message="Feedback given successfully")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail={"message": f"Error: {str(e)}"})