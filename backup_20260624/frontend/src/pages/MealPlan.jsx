import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MealPlan() {
  const [nurseryMenu, setNurseryMenu] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [suggestion, setSuggestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || { id: 1 }

  const handleScanImage = async () => {
    if (!imageFile) return
    setLoading(true)
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target.result
        const response = await axios.post('http://localhost:8000/api/meals/scan', {
          image_base64: base64
        })
        setNurseryMenu(response.data.meals)
        setLoading(false)
      }
      reader.readAsDataURL(imageFile)
    } catch (error) {
      alert('読み取りに失敗しました')
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const ingredientList = ingredients.split(/[、,]/).map(i => i.trim()).filter(i => i)
      const response = await axios.post('http://localhost:8000/api/meals/generate', {
        child_id: 1,
        date: new Date().toISOString().split('T')[0],
        nursery_meals: nurseryMenu,
        ingredients: ingredientList
      })
      setSuggestion(JSON.parse(response.data.suggestion))
    } catch (error) {
      alert('提案の生成に失敗しました')
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1>献立を作成する</h1>

      <div className="card">
        <h2>① 保育園の献立表を読み取る</h2>
        <div className="upload-area">
          <p>献立表の画像をドロップまたはクリックして選択</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" className="btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
            ファイルを選択
          </label>
          {imageFile && <p style={{ marginTop: '1rem' }}>{imageFile.name}</p>}
        </div>
        <button
          className="btn"
          onClick={handleScanImage}
          disabled={!imageFile || loading}
        >
          {loading ? '読み取り中...' : '読み取る'}
        </button>

        {nurseryMenu && (
          <div className="meal-result" style={{ marginTop: '1rem' }}>
            <h3>読み取り結果</h3>
            <textarea
              className="input"
              rows={4}
              value={nurseryMenu}
              onChange={(e) => setNurseryMenu(e.target.value)}
              style={{ marginTop: '0.5rem' }}
            />
          </div>
        )}
      </div>

      <div className="card">
        <h2>② 手動で献立を入力（任意）</h2>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          読み取り結果を編集するか、直接入力してください
        </p>
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
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          カンマ区切りで入力してください
        </p>
        <textarea
          className="input"
          rows={2}
          placeholder="例: 卵, 鶏肉, にんじん, じゃがいも, ブロッコリー"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      <button
        className="btn"
        onClick={handleGenerate}
        disabled={!nurseryMenu || loading}
        style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}
      >
        {loading ? '生成中...' : '家庭の献立を提案する'}
      </button>

      {suggestion && (
        <div style={{ marginTop: '2rem' }}>
          <div className="card">
            <h2>提案された家庭の献立</h2>
            <ul>
              {suggestion.home_meals.map((meal, index) => (
                <li key={index} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
                  {meal}
                </li>
              ))}
            </ul>
          </div>

          <div className="shopping-list card">
            <h2>買い物リスト</h2>
            <ul>
              {suggestion.shopping_list.map((item, index) => (
                <li key={index} style={{ padding: '0.5rem 0', borderBottom: '1px solid #ddd' }}>
                  □ {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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
