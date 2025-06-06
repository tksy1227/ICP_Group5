from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.responses import JSONResponse
from uuid import UUID
from schemas import (
    RecommendedProductListItem,
    RecommendedProductList,
    ApiV1EcommerceRecommendationUserProductPost200Response,
    ApiV1EcommerceRecommendationUserGet200Response,
    ApiV1EcommerceRecommendationFeedbackPostRequestBody,
    ApiV1EcommerceRecommendationFeedbackPostResponse,
    ApiV1MessagingChatbotPostRequestBody,
    ApiV1MessagingChatbotPost200Response,
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
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import RecommendationFeedback
from chatbot.vector_store import get_retriever
from langchain.chains import RetrievalQA
from langchain.llms.base import LLM
from chatbot.llm import LocalLlamaLLM
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to your Streamlit Cloud domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

retriever = get_retriever()

# Construct the RetrievalQA chain using retriever + Replicate LLM
qa_chain = RetrievalQA.from_chain_type(
    llm=LocalLlamaLLM(),  
    chain_type="stuff",
    retriever=retriever
)

# --------------------------------------------------------------------------------------------------------

# Miscellaneous endpoints
@app.get(
    "/ping",
    response_model=PingGet200Response,
    responses={
        401: {"model": ErrorResponse, "description": "Not Found"}
    }
)
async def health_check(authenticated: bool = True):  # Simulated condition
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
async def get_recommendations_by_user(user_id: UUID, db: Session = Depends(get_db)):
    recommendations = get_user_recommendations(user_id, db)

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
    response_model=ApiV1EcommerceRecommendationUserProductPost200Response,
    responses={
        404: {"model": ErrorResponse, "description": "Not Found"},
        422: {"model": HTTPValidationError, "description": "Validation Error"}
    }
)
async def get_recommendations_by_product(product_id: UUID, db: Session = Depends(get_db)):
    recommendations = get_product_recommendations(product_id, db)

    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")

    return ApiV1EcommerceRecommendationUserProductPost200Response(
        items=[RecommendedProductList(Items=recommendations)]
    )

    # Return a response in JSON format, showing the product recommendations
    # This includes the product recommendation details, e.g. name, price, etc


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to post the user feedback
@app.post(
    "/api/v1/ecommerce/recommendation/feedback",
    response_model=ApiV1EcommerceRecommendationFeedbackPostResponse,
    responses={400: {"model": ErrorResponse, "description": "Bad Request"}}
)

async def post_feedback(
    feedback: ApiV1EcommerceRecommendationFeedbackPostRequestBody,
    db: Session = Depends(get_db)
):
    try:
        if not all([feedback.user_id, feedback.product_id, feedback.recommendation_id, feedback.action]):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"message": "Missing fields"}
            )

        feedback_row = RecommendationFeedback(
            user_id=feedback.user_id,
            product_id=feedback.product_id,
            recommendation_id=feedback.recommendation_id,
            action=feedback.action.value
        )

        db.add(feedback_row)
        db.commit()

        return ApiV1EcommerceRecommendationFeedbackPostResponse(
            message="Feedback given successfully"
        )

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"message": f"Error: {str(e)}"}
        )

# async def post_feedback(feedback: ApiV1EcommerceRecommendationFeedbackPostRequestBody):
#     try:
#         if not all([feedback.user_id, feedback.product_id, feedback.recommendation_id, feedback.action]):
#             raise HTTPException(
#                 status_code=status.HTTP_400_BAD_REQUEST,
#                 detail={"message": "Not Found"}
#             )

#         new_row = {
#             "user_id": str(feedback.user_id),
#             "product_id": str(feedback.product_id),
#             "recommendation_id": str(feedback.recommendation_id),
#             "action": feedback.action.value
#         }

#         file_path = "recsys_feedback.csv"

#         # Create or append to CSV
#         if not os.path.exists(file_path):
#             # Write new file with header
#             df = pd.DataFrame([new_row])
#             df.to_csv(file_path, index=False)
#         else:
#             # Append without rewriting header
#             df = pd.DataFrame([new_row])
#             df.to_csv(file_path, mode='a', header=False, index=False)

#         return ApiV1EcommerceRecommendationFeedbackPostResponse(
#             message="Feedback given successfully"
#         )

#     except HTTPException:
#         raise
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail={"message": "Not Found"}
#         )

    # Process is to increment it into the postgre SQL database


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to post the chatbot message
@app.post(
    "/api/v1/messaging/chatbot",
    response_model=ApiV1MessagingChatbotPost200Response,
    responses={
        422: {"model": HTTPValidationError, "description": "Validation Error"}
    }
)
async def post_chatbot_message(body: ApiV1MessagingChatbotPostRequestBody):
    user_msg = body.message

    if not user_msg or user_msg.strip() == "":
        return ApiV1MessagingChatbotPost200Response(
            message="Please enter a valid message.",
            recommended_products=[]
        )
    
    response_text = qa_chain.run(user_msg)

    # Simulated static product
    sample_product = RecommendedProductListItem(
        product_id=UUID("123e4567-e89b-42d3-a456-426614174000"),
        name="Fertilizer ABC",
        category="Fertilizer",
        price=100000,
        recommendation_id=UUID("123e4567-e89b-42d3-a456-426614174000"),
        relevance_score=0.95
    )

    return ApiV1MessagingChatbotPost200Response(
        message=response_text,
        recommended_products=[RecommendedProductList(Items=[sample_product])]
    )

    # try:
    #     response_text = qa_chain.run(user_msg)

    #     # Simulated static product (replace with real logic later)
    #     sample_product = RecommendedProductListItem(
    #         product_id="123e4567-e89b-12d3-a456-426614174000",
    #         name="Fertilizer ABC",
    #         category="Fertilizer",
    #         price=100000,
    #         recommendation_id="123e4567-e89b-12d3-a456-426614174000",
    #         relevance_score=0.95
    #     )

    #     return ApiV1MessagingChatbotPost200Response(
    #         message=response_text,
    #         recommended_products=[RecommendedProductList(Items=[sample_product])]
    #     )

    # except Exception as e:
    #     return ApiV1MessagingChatbotPost200Response(
    #         message="Sorry, I encountered an error.",
    #         recommended_products=[]
    #     )
    # Process is to send the message to the chatbot and get a response from it