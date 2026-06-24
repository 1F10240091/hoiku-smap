from fastapi import APIRouter, Query

router = APIRouter()

SAMPLE_RECIPES = [
    {"id": 1, "name": "親子丼", "ingredients": ["鶏もも肉", "卵", "玉ねぎ", "だし", "醤油", "米"], "time": "20分"},
    {"id": 2, "name": "パスタ ペペロンチーノ", "ingredients": ["パスタ", "にんにく", "唐辛子", "オリーブオイル"], "time": "15分"},
    {"id": 3, "name": "卵焼き", "ingredients": ["卵", "砂糖", "醤油"], "time": "10分"},
    {"id": 4, "name": "味噌汁", "ingredients": ["味噌", "豆腐", "わかめ", "にんじん"], "time": "10分"},
    {"id": 5, "name": "チキンライス", "ingredients": ["鶏もも肉", "米", "玉ねぎ", "ケチャップ", "ピーマン"], "time": "30分"},
    {"id": 6, "name": "お好み焼き", "ingredients": ["小麦粉", "卵", "キャベツ", "豚バラ肉"], "time": "25分"},
    {"id": 7, "name": "カレーライス", "ingredients": ["米", "玉ねぎ", "じゃがいも", "にんじん", "豚肉"], "time": "40分"},
    {"id": 8, "name": "サンドイッチ", "ingredients": ["食パン", "ハム", "レタス", "トマト", "マヨネーズ"], "time": "10分"},
    {"id": 9, "name": "ホットケーキ", "ingredients": ["ホットケーキミックス", "卵", "牛乳", "バナナ"], "time": "15分"},
    {"id": 10, "name": "豆腐ハンバーグ", "ingredients": ["豆腐", "豚ひき肉", "卵", "玉ねぎ", "パン粉"], "time": "30分"},
    {"id": 11, "name": "冷やし中華", "ingredients": ["中華麺", "きゅうり", "ハム", "卵", "ウスターソース"], "time": "15分"},
    {"id": 12, "name": "ブロッコリーのお浸し", "ingredients": ["ブロッコリー", "だし", "醤油"], "time": "10分"},
]

@router.get("/search")
def search_recipes(keyword: str = Query("")):
    if not keyword:
        return {"recipes": SAMPLE_RECIPES}
    results = [
        r for r in SAMPLE_RECIPES
        if keyword in r["name"] or any(keyword in i for i in r["ingredients"])
    ]
    return {"recipes": results}
