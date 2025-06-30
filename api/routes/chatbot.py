from fastapi import APIRouter
from schemas.schemas import (
    ApiV1MessagingChatbotPostRequestBody,
    ApiV1MessagingChatbotPost200Response
)
from services.chatbot_func import get_chatbot_response_with_recommendations

router = APIRouter()

@router.post("/chatbot", response_model=ApiV1MessagingChatbotPost200Response)
async def post_chatbot_message(body: ApiV1MessagingChatbotPostRequestBody):
    return get_chatbot_response_with_recommendations(body)