from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from uuid import UUID

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

router = APIRouter()

@router.get("/user/{user_id}", response_model=ApiV1EcommerceRecommendationUserGet200Response)
async def get_recommendations_by_user(user_id: UUID, db: Session = Depends(get_db)):
    recommendations = get_user_recommendations(user_id, db)

    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")

    return ApiV1EcommerceRecommendationUserGet200Response(
        items=[RecommendedProductList(Items=recommendations)]
    )


@router.get("/product/{product_id}", response_model=ApiV1EcommerceRecommendationUserProductPost200Response)
async def get_recommendations_by_product(product_id: UUID, db: Session = Depends(get_db)):
    recommendations = get_product_recommendations(product_id, db)

    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")

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
        return ApiV1EcommerceRecommendationFeedbackPostResponse(message="Feedback given successfully")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail={"message": f"Error: {str(e)}"})