import bcrypt
from sqlalchemy import Column, Integer, Text, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .meta import Base


class User(Base):
    """ User model for authentication and authorization.
    """
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Define relationships
    cycles = relationship('Cycle', back_populates='user', cascade='all, delete-orphan')
    moods = relationship('Mood', back_populates='user', cascade='all, delete-orphan')
    symptoms = relationship('Symptom', back_populates='user', cascade='all, delete-orphan')
    medications = relationship('Medication', back_populates='user', cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash the password for storage."""
        pwhash = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        self.password_hash = pwhash.decode('utf8')
    
    def check_password(self, password):
        """Check the password against the stored hash."""
        expected_hash = self.password_hash.encode('utf8')
        return bcrypt.checkpw(password.encode('utf8'), expected_hash)
