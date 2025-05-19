from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Date, 
    ForeignKey, 
    DateTime,
    Text,
    ARRAY
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .meta import Base


class Symptom(Base):
    """ Symptom tracking model.
    """
    __tablename__ = 'symptoms'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    date = Column(Date, nullable=False)
    symptoms = Column(ARRAY(String), nullable=False)
    intensity = Column(String(20), nullable=False)  # mild, moderate, severe
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Define relationship back to user
    user = relationship('User', back_populates='symptoms')
