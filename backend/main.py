from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth, meals, children, recipes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="保育園 献立自動生成アプリ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(children.router, prefix="/api/children", tags=["children"])
app.include_router(meals.router, prefix="/api/meals", tags=["meals"])
app.include_router(recipes.router, prefix="/api/recipes", tags=["recipes"])

@app.get("/")
def root():
    return {"message": "保育園 献立自動生成アプリ API"}
