from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
# from schemas import RecommendationResponse, FeedbackRequest, ChatbotRequest, ChatbotResponse # Add after pydantic file is done
from recsys.recsys_schema import ProductRecommendationResponse, UserRecommendationResponse
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
# Code for user recommendation
# Load saved model once
association_model = joblib.load(os.path.join(MODEL_DIR, 'association_rule_model.pkl'))
rules = association_model['rules']
merged_data = association_model['data']

def get_association_recommendations(user_id: str, top_n: int = 10):
    # Get product IDs purchased by the user
    user_products = merged_data[merged_data['user_id'] == user_id]['product_id'].unique()

    if len(user_products) == 0:
        return None  # No purchase history or invalid user_id

    recommendation_dict = {}

    # Loop through each purchased product and check rules
    for pid in user_products:
        related_rules = rules[rules['antecedents'].apply(lambda x: pid in x)]

        for _, row in related_rules.iterrows():
            for consequent in row['consequents']:
                if consequent not in user_products:
                    if consequent not in recommendation_dict or row['lift'] > recommendation_dict[consequent]:
                        recommendation_dict[consequent] = row['lift']

    # Sort recommendations by lift
    sorted_recommendations = sorted(recommendation_dict.items(), key=lambda x: x[1], reverse=True)[:top_n]

    # Get product names
    results = []
    for product_id, lift in sorted_recommendations:
        product_name = merged_data.loc[
            merged_data['product_id'] == product_id, 'name'
        ].dropna().unique()
        name = product_name[0] if len(product_name) > 0 else "Unknown Product"

        results.append({
            "product_id": product_id,
            "name": name,
            "lift": round(float(lift), 4)
        })

    return results


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

@app.get("/ping")
def ping_check():
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
@app.get("/api/v1/ecommerce/recommendations/user/{user_id}", response_model=List[UserRecommendationResponse])
async def get_user_recommendations(user_id: str, top_n: int = Query(10, ge=1, le=50)):
    
    recommendations = get_association_recommendations(user_id, top_n)

    if recommendations is None:
        raise HTTPException(status_code=404, detail="Not Found")

    return JSONResponse(content={
        "status": "success",
        "count": len(recommendations),
        "data": recommendations
    })
    # Return a response in JSON format, showing the user recommendations
    # This includes the product recommendation details, e.g. name, price, etc


# --------------------------------------------------------------------------------------------------------


# Create the API endpoint to get product recommendations (make changes to this pls)
@app.get("/api/v1/ecommerce/recommendations/products/{product_id}", response_model=List[ProductRecommendationResponse])
async def get_product_recommendations(product_id: str, top_n: int = Query(10, ge=1, le=50)):

    recommendations = recommend_similar_products(product_id, top_n)
    if not recommendations:
        raise HTTPException(status_code=404, detail="Not Found")
    
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