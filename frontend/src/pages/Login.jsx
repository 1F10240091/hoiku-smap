import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      })
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/dashboard')
    } catch (error) {
      alert('ログインに失敗しました')
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h2>ログイン</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn" style={{ width: '100%' }}>
            ログイン
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
