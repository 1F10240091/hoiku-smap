from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    password = Column(String)
    children = relationship("Child", back_populates="user")

class Child(Base):
    __tablename__ = "children"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age_months = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="children")
    allergies = relationship("Allergy", back_populates="child")
    dislikes = relationship("Dislike", back_populates="child")

class Allergy(Base):
    __tablename__ = "allergies"
    id = Column(Integer, primary_key=True, index=True)
    ingredient = Column(String)
    child_id = Column(Integer, ForeignKey("children.id"))
    child = relationship("Child", back_populates="allergies")

class Dislike(Base):
    __tablename__ = "dislikes"
    id = Column(Integer, primary_key=True, index=True)
    ingredient = Column(String)
    improve = Column(Integer, default=0)
    child_id = Column(Integer, ForeignKey("children.id"))
    child = relationship("Child", back_populates="dislikes")

class MenuPlan(Base):
    __tablename__ = "menu_plans"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String)
    child_id = Column(Integer, ForeignKey("children.id"))
    nursery_meals = Column(Text)
    home_meals = Column(Text)
    shopping_list = Column(Text)
