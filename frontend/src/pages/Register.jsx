import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password
      })
      alert('登録が完了しました')
      navigate('/login')
    } catch (error) {
      alert('登録に失敗しました')
    }
  }

  return (
    <div className="auth-form">
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>お名前</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>メールアドレス</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>パスワード</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">登録する</button>
      </form>
    </div>
  )
}

export default Register
