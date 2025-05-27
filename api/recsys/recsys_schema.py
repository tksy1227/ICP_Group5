from pydantic import BaseModel
from typing import List

class ProductRecommendationResponse(BaseModel):
    product_id: str
    name: str
    description: str
    similarity: float


class UserRecommendationResponse(BaseModel):
    product_id: str
    name: str
    lift: float