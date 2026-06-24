import { useState } from 'react'
import axios from 'axios'

function Recipes() {
  const [keyword, setKeyword] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8000/api/recipes/search`, {
        params: { keyword }
      })
      setRecipes(response.data.recipes)
    } catch (error) {
      alert('検索に失敗しました')
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h1>レシピ検索</h1>

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label>キーワード（食材名・料理名）</label>
            <input
              className="input"
              placeholder="例: 卵、鶏肉、カレー"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button className="btn" onClick={handleSearch} disabled={loading}>
            {loading ? '検索中...' : '検索'}
          </button>
        </div>
      </div>

      {recipes.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{recipes.length}件見つかりました</p>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem' }}>{recipe.name}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 0.5rem' }}>
                調理時間: {recipe.time}
              </p>
              <div>
                <strong>材料:</strong>{' '}
                {recipe.ingredients.join('、')}
              </div>
            </div>
          ))}
        </div>
      )}

      {recipes.length === 0 && !loading && (
        <p style={{ color: '#999', textAlign: 'center', marginTop: '2rem' }}>
          キーワードを入力して検索してください
        </p>
      )}
    </div>
  )
}

export default Recipes
