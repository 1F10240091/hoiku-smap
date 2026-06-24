import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MealPlan() {
  const [nurseryMenu, setNurseryMenu] = useState('')
  const [ingredients, setIngredients] = useState('')
  const navigate = useNavigate()

  return (
    <div className="container">
      <h1>献立を作成する</h1>

      <div className="card">
        <h2>① 保育園の献立表を読み取る</h2>
        <p style={{ color: '#666' }}>OCR機能は未実装です</p>
      </div>

      <div className="card">
        <h2>② 手動で献立を入力</h2>
        <textarea
          className="input"
          rows={4}
          placeholder="例: 昼食: チキンライス、味噌汁、サラダ / 間食: フルーツ"
          value={nurseryMenu}
          onChange={(e) => setNurseryMenu(e.target.value)}
        />
      </div>

      <div className="card">
        <h2>③ 冷蔵庫にある食材を入力</h2>
        <textarea
          className="input"
          rows={2}
          placeholder="例: 卵, 鶏肉, にんじん, じゃがいも"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      <button
        className="btn"
        disabled={!nurseryMenu}
        style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}
      >
        家庭の献立を提案する
      </button>

      <button
        className="btn"
        onClick={() => navigate('/dashboard')}
        style={{ width: '100%', marginTop: '1rem', background: '#666' }}
      >
        ← ダッシュボードに戻る
      </button>
    </div>
  )
}

export default MealPlan
