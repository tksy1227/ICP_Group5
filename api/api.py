from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from uuid import UUID
from schemas import (
    RecommendedProductListItem,
    RecommendedProductList,
    ApiV1EcommerceRecommendationUserProductPost200Response,
    ApiV1EcommerceRecommendationUserGet200Response,
    ApiV1EcommerceRecommendationFeedbackPostRequestBody,
    ApiV1EcommerceRecommendationFeedbackPostResponse,
    ErrorResponse,
    HTTPValidationError,
    PingGet200Response
)
import pandas as pd
import joblib
import os
import uvicorn
from typing import List

from recsys.recommendation import get_user_recommendations, get_product_recommendations

app = FastAPI()

# --------------------------------------------------------------------------------------------------------

# Miscellaneous endpoints
@app.get(
    "/ping",
    response_model=PingGet200Response,
    responses={
        401: {"model": ErrorResponse, "description": "Not Found"}
    }
)
def health_check(authenticated: bool = True):  # Simulated condition
    if not authenticated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"message": "Not Found"}
        )

    return PingGet200Response(message="pong")


# --------------------------------------------------------------------------------------------------------


# Create API endpoint to get user recommendations (make changes to this pls)
@app.get(
    "/api/v1/ecommerce/recommendations/user/{user_id}",
    response_model=ApiV1EcommerceRecommendationUserGet200Response,
    responses={
        404: {"model": ErrorResponse, "description": "Not Found"},
        422: {"model": HTTPValidationError, "description": "Validation Error"}
    }
)
def get_recommendations_by_user(user_id: UUID):
    recommendations = get_user_recommendations(user_id)

    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")

    return ApiV1EcommerceRecommendationUserGet200Response(
        items=[RecommendedProductList(Items=recommendations)]
    )
    # Return a response in JSON format, showing the user recommendations
    # This includes the product recommendation details, e.g. name, price, etc


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to get product recommendations (make changes to this pls)
@app.get(
    "/api/v1/ecommerce/recommendation/product/{product_id}",
    response_model = ApiV1EcommerceRecommendationUserProductPost200Response,
    responses = {
        404: {"model": ErrorResponse, "description": "Not Found"},
        422: {"model": HTTPValidationError, "description": "Validation Error"}
    }
)
def get_recommendations_by_product(product_id: UUID):
    recommendations = get_product_recommendations(product_id)

    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")

    return ApiV1EcommerceRecommendationUserProductPost200Response(
        items = [RecommendedProductList(Items=recommendations)]
    )

    # Return a response in JSON format, showing the product recommendations
    # This includes the product recommendation details, e.g. name, price, etc


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to post the user feedback
async def post_feedback(feedback: ApiV1EcommerceRecommendationFeedbackPostRequestBody):
    try:
        if not all([feedback.user_id, feedback.product_id, feedback.recommendation_id, feedback.action]):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"message": "Not Found"}
            )

        new_row = {
            "user_id": str(feedback.user_id),
            "product_id": str(feedback.product_id),
            "recommendation_id": str(feedback.recommendation_id),
            "action": feedback.action.value
        }

        file_path = "recsys_feedback.csv"

        # Append or create the CSV
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
            df = df.append(new_row, ignore_index=True)
        else:
            df = pd.DataFrame([new_row])

        df.to_csv(file_path, index=False)

        return ApiV1EcommerceRecommendationFeedbackPostResponse(
            message="Feedback given successfully"
        )

    except HTTPException as e:
        raise e
    except Exception as e:
        # Catch-all for unexpected errors
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": "Not Found"}
        )

    # Process is to increment it into the postgre SQL database


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to post the chatbot message
@app.post("/api/v1/messaging/chatbot")
async def post_chatbot_message():


    # Process is to send the message to the chatbot and get a response from it
    return {"message": f"Chatbot message received"}