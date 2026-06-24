# Hoiku-SMap（保育園 献立自動生成アプリ）

少子高齢化背景下において、保育園児の親の食事準備負担を軽減するアプリケーション。
保育園の献立表を OCR で読み取り、家庭で作る献立を AI が自動提案します。
React + FastAPI で構築されています。

## 機能概要

- **OCR 献立読み取り** — 保育園の献立表を撮影するだけで内容を自動認識
- **AI 献立提案** — 保育園食と重複しない、栄養バランスの良い家庭食を自動生成
- **アレルギー管理** — 登録したアレルギー食材を含む献立を自動除外
- **好き嫌い管理** — 嫌いな食材の「排除」or「改善に向けて工夫」を選択可能
- **買い物リスト生成** — 不足食材を自動でリスト化し、買い物の負担を削減
- **栄養一括管理** — 保育園食 ＋ 家庭食の栄養バランスを可視化

## 必要環境

| 要件 | バージョン |
|------|-----------|
| Node.js | 18 以上 |
| npm | 9 以上 |
| Python | 3.10 以上 |
| OS | Windows / macOS / Linux |

## クイックスタート

### 1. リポジトリをクローン

```bash
git clone https://github.com/your-org/hoiku-smap.git
cd hoiku-smap
```

### 2. バックエンドをセットアップ

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. フロントエンドをセットアップ

```bash
npm install
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

これでフロントエンド（localhost:5173）とバックエンド（localhost:8000）が同時に起動します。

### 4. ブラウザで開く

http://localhost:5173

## NPM Scripts

| コマンド | 内容 |
|---------|------|
| `npm run dev` | フロントエンド・バックエンド同時起動 |
| `npm run dev:frontend` | フロントエンドのみ起動 |
| `npm run dev:backend` | バックエンドのみ起動 |
| `npm run build` | フロントエンドのプロダクションビルド |
| `npm run lint` | ESLint実行 |

## プロジェクト構成

```
hoiku-smap/
├── package.json          # モノレポ設定（npm workspaces）
├── docs/
│   ├── design.md         # 詳細設計書
│   ├── assignment.md     # タスク割当表
│   └── proposal.md       # 提案書
├── backend/
│   ├── main.py           # FastAPI エントリポイント
│   ├── database.py       # DB 接続設定（SQLite）
│   ├── models.py         # データモデル定義
│   ├── requirements.txt  # Python 依存パッケージ
│   └── routers/
│       ├── auth.py       # 認証 API（登録・ログイン）
│       ├── children.py   # お子様管理 API（登録・一覧）
│       └── meals.py      # 献立 API（OCR 読み取り・AI 生成）
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # ルートコンポーネント
│   │   ├── App.css       # グローバルスタイル
│   │   └── pages/
│   │       ├── Home.jsx      # トップページ（機能紹介）
│   │       ├── Login.jsx     # ログイン画面
│   │       ├── Register.jsx  # 新規登録画面
│   │       ├── Dashboard.jsx # お子様管理ダッシュボード
│   │       └── MealPlan.jsx  # 献立作成画面
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロントエンド | React 18 + Vite |
| バックエンド | Python FastAPI |
| データベース | SQLite（開発用）/ PostgreSQL（本番用） |
| AI エンジン | OpenAI API（GPT-4o-mini） |
| OCR | OpenAI Vision API |
| 認証 | JWT（今後実装予定） |

## アーキテクチャ

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  OpenAI API │
│   (React)   │     │  (FastAPI)  │     │  (GPT-4o)   │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │  Database   │
                    │  (SQLite)   │
                    └─────────────┘
```

## ワークフロー

```
① 保育園の献立表を撮影
        ↓
② OCR で献立内容を自動読み取り
        ↓
③ 冷蔵庫にある食材を入力
        ↓
④ AI が家庭の献立を提案（保育園食と重複しない）
        ↓
⑤ 不足食材を買い物リストとして表示
        ↓
⑥ 買い物に行く
```

## ドキュメント

- **提案書** — プロジェクトの背景・目的・技術選定
- **詳細設計書** — アーキテクチャ・API・データベース設計
- **タスク割当表** — メンバー別タスク・スケジュール

## ライセンス

MIT
