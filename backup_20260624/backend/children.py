from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Child, Allergy, Dislike
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ChildCreate(BaseModel):
    name: str
    age_months: int
    user_id: int

class AllergyCreate(BaseModel):
    ingredient: str
    child_id: int

class DislikeCreate(BaseModel):
    ingredient: str
    improve: bool = False
    child_id: int

@router.post("/")
def create_child(child: ChildCreate, db: Session = Depends(get_db)):
    new_child = Child(name=child.name, age_months=child.age_months, user_id=child.user_id)
    db.add(new_child)
    db.commit()
    db.refresh(new_child)
    return {"id": new_child.id, "name": new_child.name, "age_months": new_child.age_months}

@router.get("/{user_id}")
def get_children(user_id: int, db: Session = Depends(get_db)):
    children = db.query(Child).filter(Child.user_id == user_id).all()
    result = []
    for child in children:
        allergies = [a.ingredient for a in db.query(Allergy).filter(Allergy.child_id == child.id).all()]
        dislikes = [{"ingredient": d.ingredient, "improve": d.improve} for d in db.query(Dislike).filter(Dislike.child_id == child.id).all()]
        result.append({
            "id": child.id,
            "name": child.name,
            "age_months": child.age_months,
            "allergies": allergies,
            "dislikes": dislikes
        })
    return result

@router.post("/allergy")
def add_allergy(allergy: AllergyCreate, db: Session = Depends(get_db)):
    new_allergy = Allergy(ingredient=allergy.ingredient, child_id=allergy.child_id)
    db.add(new_allergy)
    db.commit()
    return {"message": "Allergy added"}

@router.post("/dislike")
def add_dislike(dislike: DislikeCreate, db: Session = Depends(get_db)):
    new_dislike = Dislike(ingredient=dislike.ingredient, improve=dislike.improve, child_id=dislike.child_id)
    db.add(new_dislike)
    db.commit()
    return {"message": "Dislike added"}
