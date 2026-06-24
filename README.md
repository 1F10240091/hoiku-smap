# Hoiku-SMap（保育園 献立自動生成アプリ）

保育園の献立表を OCR で読み取り、家庭で作る献立を AI が自動提案します。

## 機能概要（実装予定）

- **献立表スキャン** — 保育園の献立表をOCRで自動読み取り
- **プロフィール管理** — 子供の年齢・アレルギー・好き嫌いを登録
- **冷蔵庫食材入力** — いまある主要食材を手動入力
- **AI献立提案** — 保育園食を考慮した家庭食を自動生成
- **栄養一括管理** — 保育園食＋家庭食の栄養バランスを可視化
- **買い物リスト生成** — 不足食材を自動でリスト化

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロントエンド | React 19 + Vite 8 |
| バックエンド | Python Django + DRF |
| データベース | SQLite（開発）/ PostgreSQL（本番） |
| AI | OpenAI API（未実装） |

## クイックスタート

### 1. セットアップ

```bash
npm run setup
```

### 2. 開発サーバーを起動

```bash
npm run dev
```

### 3. ブラウザで開く

http://localhost:5173

## プロジェクト構成

```
hoiku-smap/
├── package.json
├── backend/
│   ├── manage.py            # Django管理コマンド
│   ├── config/              # プロジェクト設定
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── accounts/            # 認証・ユーザー管理
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── serializers/
│   ├── children/            # 子供管理
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── serializers/
│   ├── meals/               # 献立管理
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── serializers/
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── App.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Login.jsx
│           ├── Register.jsx
│           ├── Dashboard.jsx
│           └── MealPlan.jsx
└── docs/
    └── resources.md
```
