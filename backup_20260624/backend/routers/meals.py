import os
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import MenuPlan
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

def get_openai_client():
    from openai import OpenAI
    return OpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

class MenuPlanCreate(BaseModel):
    child_id: int
    date: str
    nursery_meals: str
    ingredients: List[str]

class NurseryMenuScan(BaseModel):
    image_base64: str

@router.post("/scan")
def scan_nursery_menu(scan: NurseryMenuScan):
    client = get_openai_client()
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "保育園の献立表の画像から、献立内容を読み取ってJSON形式で返してください。形式: {\"breakfast\": \"...\", \"lunch\": \"...\", \"snack\": \"...\"}"
            },
            {
                "role": "user",
                "content": f"この献立表を読み取ってください: {scan.image_base64}"
            }
        ]
    )
    return {"meals": response.choices[0].message.content}

@router.post("/generate")
def generate_home_meals(plan: MenuPlanCreate, db: Session = Depends(get_db)):
    client = get_openai_client()
    prompt = f"""保育園の献立: {plan.nursery_meals}
ある食材: {', '.join(plan.ingredients)}

上記の保育園の献立と重複しない、家庭で作る献立を3品提案してください。
子供が食べやすい、栄養バランスを考慮してください。
食材リストも出力してください。
JSON形式で返してください: {{\"home_meals\": [\"...\", \"...\", \"...\"], \"shopping_list\": [\"...\", \"...\"]}}
"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "あなたは保育園児のための献立提案アシスタントです。"},
            {"role": "user", "content": prompt}
        ]
    )
    return {"suggestion": response.choices[0].message.content}

@router.get("/{child_id}")
def get_menu_plans(child_id: int, db: Session = Depends(get_db)):
    plans = db.query(MenuPlan).filter(MenuPlan.child_id == child_id).all()
    return [{"id": p.id, "date": p.date, "nursery_meals": p.nursery_meals, "home_meals": p.home_meals, "shopping_list": p.shopping_list} for p in plans]
