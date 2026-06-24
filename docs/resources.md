# 使用リソース

## 外部API

### OpenAI API
- **用途**: OCR（献立表読み取り）、AI献立生成
- **モデル**: GPT-4o-mini（OCR・生成ともに統一）
- **料金**: $0.15/100万トークン（入力）, $0.60/100万トークン（出力）
- **コスト試算（月間）**:
  - 1日3回利用: 月約150トークン → **月額10円〜50円**
- **必要環境変数**: `OPENAI_API_KEY`

### コスト削減策
- GPT-4o-miniに統一（OCRも対応可能、GPT-4oより10倍安い）
- 同じ献立表はキャッシュしてAPI呼び出しを削減
- 必要最低限のトークンでプロンプトを設計

## データベース

### PostgreSQL（本番用）
- **推奨サービス**: Supabase（無料枠500MB）
- **ローカル開発**: SQLite（現在の構成）

### SQLite（開発用）
- **用途**: ローカル開発・テスト
- **ファイル**: `backend/hoiku.db`

## 栄養データ

### 日本食品標準成分表
- **提供元**: 厚生労働省
- **URL**: https://www.mext.go.jp/a_menu/sports/ikuseiryo/002/index.html
- **利用方法**: アプリ内に主要食材の栄養データをDBに格納

## 必要な環境変数

```env
# OpenAI API
OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# データベース（本番用）
DATABASE_URL=postgresql://user:password@localhost:5432/hoiku_smap
```

## フロントエンド

- React 19 + Vite
- Axios（API通信）
- React Router（ルーティング）

## バックエンド

- FastAPI
- SQLAlchemy（ORM）
- Pydantic（バリデーション）
- python-multipart（ファイルアップロード）
- openai（OpenAI APIクライアント）
