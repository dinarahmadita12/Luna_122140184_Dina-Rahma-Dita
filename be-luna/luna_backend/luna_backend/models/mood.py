from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Date, 
    ForeignKey, 
    DateTime,
    Text
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .meta import Base


class Mood(Base):
    """ Mood tracking model.
    """
    __tablename__ = 'moods'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    date = Column(Date, nullable=False)
    mood = Column(String(20), nullable=False)  # great, good, okay, bad, awful
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Define relationship back to user
    user = relationship('User', back_populates='moods')
