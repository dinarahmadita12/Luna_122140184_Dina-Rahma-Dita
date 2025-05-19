from sqlalchemy import (
    Column, 
    Integer, 
    String, 
    Date, 
    Boolean, 
    ForeignKey, 
    DateTime,
    Text
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .meta import Base


class Cycle(Base):
    """ Cycle tracking model."""
    __tablename__ = 'cycles'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    date = Column(Date, nullable=False)
    flow = Column(String(10), nullable=True)  # light, medium, heavy
    is_period = Column(Boolean, default=False)
    is_fertile = Column(Boolean, default=False)
    is_ovulation = Column(Boolean, default=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Define relationship back to user
    user = relationship('User', back_populates='cycles')
