from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from routes import ecommerce, chatbot, monitoring
from schemas.schemas import PingGet200Response,ErrorResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


app.include_router(ecommerce.router, prefix="/api/v1/ecommerce/recommendation", tags=["Ecommerce"])
app.include_router(chatbot.router, prefix="/api/v1/messaging", tags=["Chatbot"])
app.include_router(monitoring.router, prefix="/api/v1/monitoring", tags=['Monitoring'])