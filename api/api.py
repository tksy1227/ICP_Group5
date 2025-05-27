from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
# from schemas import RecommendationResponse, FeedbackRequest, ChatbotRequest, ChatbotResponse # Add after pydantic file is done
from recsys.recsys_schema import ProductRecommendationResponse
import pickle, joblib
import os
import uvicorn
from typing import List

app = FastAPI()

MODEL_DIR = "../"
# MODEL_DIR = "models"
# user_model = pickle.load(open(os.path.join(MODEL_DIR, "association_model.pkl"), "rb"))
# product_model = pickle.load(open(os.path.join(MODEL_DIR, "content_based_model.pkl"), "rb"))





# --------------------------------------------------------------------------------------------------------
# Code for product recommendation
# Load the saved model
content_model = joblib.load(os.path.join(MODEL_DIR, "content_based_model.pkl"))
tfidf = content_model['tfidf_vectorizer']
tfidf_matrix = content_model['tfidf_matrix']
cosine_sim = content_model['cosine_sim']
content_df = content_model['content_df']
product_indices = content_model['product_indices']

def recommend_similar_products(product_id: str, top_n: int = 10):
    if product_id not in product_indices:
        return []

    idx = product_indices[product_id]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    seen = set()
    results = []

    for i, score in sim_scores:
        row = content_df.iloc[i]
        pid = row['product_id']

        if pid == product_id or pid in seen:
            continue

        results.append({
            "product_id": pid,
            "name": row['name'],
            "description": row['description'],
            "similarity": round(float(score), 4)
        })
        seen.add(pid)

        if len(results) >= top_n:
            break

    return results

# --------------------------------------------------------------------------------------------------------



# Miscellaneous endpoints
@app.get("/health")
def health_check():
    return {"status": "API is running"}



# Define a function to return a description of the app
def get_app_description():
	return (
    	"Welcome to the TokoSawit API!"
    	"This API allows you to get responses from the RecSys Engine and the Chatbot."
	)

# Create the API endpoint to get the app description
@app.get("/")
async def root():
	return {"message": get_app_description()}



# --------------------------------------------------------------------------------------------------------


# Create API endpoint to get user recommendations (make changes to this pls)
@app.get("/api/v1/ecommerce/recommendations/user/{user_id}")
async def get_product_recommendations(user_id: str):
    

    # Return a response in JSON format, showing the user recommendations
    # This includes the product recommendation details, e.g. name, price, etc
    return {"message": f"Product recommendations for user {user_id}"}


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to get product recommendations (make changes to this pls)
@app.get("/api/v1/ecommerce/recommendations/products/{product_id}", response_model=List[RecommendationResponse])
async def get_product_recommendations(product_id: str, top_n: int = Query(10, ge=1, le=50)):

    recommendations = recommend_similar_products(product_id, top_n)
    if not recommendations:
        raise HTTPException(status_code=404, detail="Product ID not found or no similar items.")
    
    return JSONResponse(content={
        "status": "success",
        "count": len(recommendations),
        "data": recommendations
    })

    # Return a response in JSON format, showing the product recommendations
    # This includes the product recommendation details, e.g. name, price, etc


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to post the user feedback
@app.post("/api/v1/ecommerce/recommendations/feedback")
async def post_feedback():


    # Process is to increment it into the postgre SQL database
    return {"message": f"Feedback received"}


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to post the chatbot message
@app.post("/api/v1/messaging/chatbot")
async def post_chatbot_message():


    # Process is to send the message to the chatbot and get a response from it
    return {"message": f"Chatbot message received"}