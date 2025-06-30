from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime
import uuid
from zoneinfo import ZoneInfo

Base = declarative_base()

class RecommendationFeedback(Base):
    __tablename__ = "recommendation_feedback"

    user_id = Column(UUID(as_uuid=True), primary_key=False)
    product_id = Column(UUID(as_uuid=True), primary_key=False)
    recommendation_id = Column(UUID(as_uuid=True), primary_key=True)
    action = Column(String, nullable=False)

class RecommendationLog(Base):
    __tablename__ = "recommendations"

    recommendation_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_id = Column(UUID(as_uuid=True), nullable=False)
    product_id = Column(UUID(as_uuid=True), nullable=False)

    # Use timezone-aware UTC timestamp
    timestamp = Column(DateTime(timezone=True), server_default=func.now())