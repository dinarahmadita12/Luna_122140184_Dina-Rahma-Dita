from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    ForeignKey, 
    DateTime,
    Text,
    Boolean
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .meta import Base


class Medication(Base):
    """ Medication reminder model.
    """
    __tablename__ = 'medications'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String(100), nullable=False)
    time = Column(String(5), nullable=False)  # Format: HH:MM
    frequency = Column(String(20), nullable=False)  # daily, weekly, monthly, as-needed
    taken = Column(Boolean, default=False)
    last_taken = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Define relationship back to user
    user = relationship('User', back_populates='medications')
