import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [children, setChildren] = useState([])
  const [newChild, setNewChild] = useState({ name: '', age_months: '' })
  const [allergyInput, setAllergyInput] = useState({ ingredient: '', child_id: '' })
  const [dislikeInput, setDislikeInput] = useState({ ingredient: '', improve: false, child_id: '' })
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || { id: 1 }

  useEffect(() => {
    fetchChildren()
  }, [])

  const fetchChildren = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/children/${user.id}`)
      setChildren(response.data)
    } catch (error) {
      console.error('Failed to fetch children')
    }
  }

  const handleAddChild = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/children', {
        name: newChild.name,
        age_months: parseInt(newChild.age_months),
        user_id: user.id
      })
      setNewChild({ name: '', age_months: '' })
      fetchChildren()
    } catch (error) {
      alert('追加に失敗しました')
    }
  }

  const handleAddAllergy = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/children/allergy', allergyInput)
      setAllergyInput({ ingredient: '', child_id: '' })
      fetchChildren()
    } catch (error) {
      alert('追加に失敗しました')
    }
  }

  const handleAddDislike = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/children/dislike', dislikeInput)
      setDislikeInput({ ingredient: '', improve: false, child_id: '' })
      fetchChildren()
    } catch (error) {
      alert('追加に失敗しました')
    }
  }

  return (
    <div className="container">
      <h1>ダッシュボード</h1>

      <div className="card">
        <h2>お子様を追加</h2>
        <form onSubmit={handleAddChild} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>お名前</label>
            <input
              type="text"
              className="input"
              value={newChild.name}
              onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>月齢</label>
            <input
              type="number"
              className="input"
              value={newChild.age_months}
              onChange={(e) => setNewChild({ ...newChild, age_months: e.target.value })}
            />
          </div>
          <button type="submit" className="btn">追加</button>
        </form>
      </div>

      <div className="card">
        <h2>アレルギー登録</h2>
        <form onSubmit={handleAddAllergy} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>お子様</label>
            <select
              className="input"
              value={allergyInput.child_id}
              onChange={(e) => setAllergyInput({ ...allergyInput, child_id: e.target.value })}
            >
              <option value="">選択してください</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>アレルギー食材</label>
            <input
              type="text"
              className="input"
              value={allergyInput.ingredient}
              onChange={(e) => setAllergyInput({ ...allergyInput, ingredient: e.target.value })}
            />
          </div>
          <button type="submit" className="btn">追加</button>
        </form>
      </div>

      <div className="card">
        <h2>好き嫌い登録</h2>
        <form onSubmit={handleAddDislike} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>お子様</label>
            <select
              className="input"
              value={dislikeInput.child_id}
              onChange={(e) => setDislikeInput({ ...dislikeInput, child_id: e.target.value })}
            >
              <option value="">選択してください</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>嫌いな食材</label>
            <input
              type="text"
              className="input"
              value={dislikeInput.ingredient}
              onChange={(e) => setDislikeInput({ ...dislikeInput, ingredient: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={dislikeInput.improve}
                onChange={(e) => setDislikeInput({ ...dislikeInput, improve: e.target.checked })}
              />
              改善に向けて工夫する
            </label>
          </div>
          <button type="submit" className="btn">追加</button>
        </form>
      </div>

      <div className="card">
        <h2>登録済みのお子様</h2>
        {children.length === 0 ? (
          <p>お子様を追加してください</p>
        ) : (
          children.map(child => (
            <div key={child.id} style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
              <strong>{child.name}</strong>（{child.age_months}ヶ月）
              {child.allergies.length > 0 && (
                <p>アレルギー: {child.allergies.join(', ')}</p>
              )}
              {child.dislikes.length > 0 && (
                <p>嫌い: {child.dislikes.map(d => `${d.ingredient}${d.improve ? '（改善中）' : ''}`).join(', ')}</p>
              )}
            </div>
          ))
        )}
      </div>

      <button
        className="btn"
        onClick={() => navigate('/meal-plan')}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        献立を作成する →
      </button>
    </div>
  )
}

export default Dashboard
