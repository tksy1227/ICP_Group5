import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq

# --- Groq API Client Initialization ---
# This is much more lightweight than loading a model locally.
# It reads the API key from an environment variable for security.
try:
        client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )
        print("Groq client initialized successfully.")
except Exception as e:
    client = None
    print(f"Error initializing Groq client: {e}")
    print("Please make sure the GROQ_API_KEY environment variable is set.")

# --- FastAPI App Initialization ---
app = FastAPI()

# --- CORS Configuration ---
# This allows your deployed React app to communicate with this backend.
origins = [
    "http://localhost:3000",
    "https://front-end-deployment-ei2n.onrender.com", # Your deployed React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request Body ---
class ChatRequest(BaseModel):
    user_id: str
    message: str
    language: str

# --- API Routes ---
@app.get("/")
def read_root():
    return {"message": "Chatbot backend is running"}

@app.post("/api/v1/messaging/chatbot")
async def handle_chat(request: ChatRequest):
    if not client:
        raise HTTPException(status_code=503, detail="Chatbot service is not available. Check API key.")

    try:
        messages = [
            {
                "role": "system",
                "content": f"You are a helpful assistant for palm oil farmers. Please respond in {request.language}."
            },
            {
                "role": "user",
                "content": request.message,
            },
        ]

        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama3-8b-8192", # Use a Llama 3 model available on Groq
            temperature=0.7,
            max_tokens=256,
            top_p=0.95,
            stop=None,
            stream=False,
        )

        response_text = chat_completion.choices[0].message.content
        return {"message": response_text}
    except Exception as e:

        print(f"Error during chat generation with Groq: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate chat response.")