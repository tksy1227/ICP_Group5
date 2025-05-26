from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "API is running"}

# Define a function to return a description of the app
def get_app_description():
	return (
    	"Welcome to the TokoSawit API!"
    	"This API allows you to get responses from the RecSys Engine and the Chatbot."
    	"Use the '/predict/' endpoint with a POST request to make predictions."
    	"Example usage: POST to '/predict/' with JSON data containing sepal_length, sepal_width, petal_length, and petal_width."
	)

# Create the API endpoint to get the app description
@app.get("/")
async def root():
	return {"message": get_app_description()}

# Create API endpoint to get user recommendations (make changes to this pls)
@app.get("/api/v1/ecommerce/recommendations/user/{user_id}")
async def get_product_recommendations(user_id: str):


    # Return a response in JSON format, showing the user recommendations
    # This includes the product recommendation details, e.g. name, price, etc
    return {"message": f"Product recommendations for user {user_id}"}

# Create the API endpoint to get product recommendations (make changes to this pls)
@app.get(" /api/v1/ecommerce/recommendations/products/{product_id}")
async def get_product_recommendations(product_id: str):


    # Return a response in JSON format, showing the product recommendations
    # This includes the product recommendation details, e.g. name, price, etc
    return {"message": f"Product recommendations for product {product_id}"}

# Create the API endpoint to post the user feedback
@app.post("/api/v1/ecommerce/recommendations/feedback")
async def post_feedback():


    # Process is to increment it into the postgre SQL database
    return {"message": f"Feedback received"}


# Create the API endpoint to post the chatbot message
@app.post("/api/v1/messaging/chatbot")
async def post_chatbot_message():


    # Process is to send the message to the chatbot and get a response from it
    return {"message": f"Chatbot message received"}