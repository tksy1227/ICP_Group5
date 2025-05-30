from pydantic import BaseModel, UUID4
from enum import Enum
from typing import Optional, List, Union

# --------------------------------------------------------------------------------------------------------
# Action
class ActionEnum(str, Enum):
    clicked = "clicked"
    added_to_cart = "added_to_cart"
    purchased = "purchased"
    reviewed = "reviewed"

class UserAction(BaseModel):
    action: ActionEnum

# --------------------------------------------------------------------------------------------------------
# ApiV1EcommerceRecommendationFeedbackPostRequestBody
class ApiV1EcommerceRecommendationFeedbackPostRequestBody(BaseModel):
    user_id: Optional[UUID4]
    product_id: Optional[UUID4]
    recommendation_id: Optional[UUID4]
    action: Optional[ActionEnum]


# --------------------------------------------------------------------------------------------------------
# ApiV1EcommerceRecommendationFeedbackPostResponse
class ApiV1EcommerceRecommendationFeedbackPostResponse(BaseModel):
    message: Optional[str]


# --------------------------------------------------------------------------------------------------------
# ApiV1EcommerceRecommendationUserGet200Response
class RecommendedProductListItem(BaseModel): # RecommendedProductListItem
    product_id: Optional[UUID4]
    name: Optional[str]
    category: Optional[str]
    price: Optional[float]
    recommendation_id: Optional[UUID4]
    relevance_score: Optional[float]

class RecommendedProductList(BaseModel): # RecommendedProductList
    Items: Optional[List[RecommendedProductListItem]]

class ApiV1EcommerceRecommendationUserGet200Response(BaseModel):
    items: Optional[List[RecommendedProductList]]


# --------------------------------------------------------------------------------------------------------
# ApiV1EcommerceRecommendationUserProductPost200Response
class ApiV1EcommerceRecommendationUserProductPost200Response(BaseModel):
    items: Optional[List[RecommendedProductList]]


# --------------------------------------------------------------------------------------------------------
# ApiV1MessagingChatbotPost200Response
class ApiV1MessagingChatbotPost200Response(BaseModel):
    message: str
    recommended_products: Optional[List[RecommendedProductList]]


# --------------------------------------------------------------------------------------------------------
# ApiV1MessagingChatbotPostRequestBody
class ApiV1MessagingChatbotPostRequestBody(BaseModel):
    user_id: Optional[UUID4]
    message: Optional[str]


# --------------------------------------------------------------------------------------------------------
# ErrorResponse
class ErrorResponse(BaseModel):
    message: Optional[str]


# --------------------------------------------------------------------------------------------------------
# HTTPValidationError
class ValidationError(BaseModel): # ValidationError
    loc: List[Union[str, int]]
    msg: str
    type: str

class HTTPValidationError(BaseModel):
    detail: List[ValidationError]


# --------------------------------------------------------------------------------------------------------
# PingGet200Response
class PingGet200Response(BaseModel):
    message: Optional[str]


# --------------------------------------------------------------------------------------------------------
