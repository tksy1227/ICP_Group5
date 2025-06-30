from uuid import UUID
from schemas.schemas import (
    ApiV1MessagingChatbotPostRequestBody,
    ApiV1MessagingChatbotPost200Response,
    RecommendedProductListItem,
    RecommendedProductList,
)
from adapters.vector_store import get_retriever
from adapters.llm import LocalLlamaLLM
from langchain.chains import RetrievalQA

# Initialize the chain (reuse this object across requests)
retriever = get_retriever()
qa_chain = RetrievalQA.from_chain_type(llm=LocalLlamaLLM(), chain_type="stuff", retriever=retriever)

def get_chatbot_response_with_recommendations(request: ApiV1MessagingChatbotPostRequestBody) -> ApiV1MessagingChatbotPost200Response:
    user_msg = request.message

    if not user_msg or user_msg.strip() == "":
        return ApiV1MessagingChatbotPost200Response(
            message="Please enter a valid message.",
            recommended_products=[]
        )
    
    response_text = qa_chain.run(user_msg)

    # TODO: Replace with real recommendation logic
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