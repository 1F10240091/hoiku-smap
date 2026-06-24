import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      })
      if (response.data.error) {
        alert(response.data.error)
      } else {
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/dashboard')
      }
    } catch (error) {
      alert('ログインに失敗しました')
    }
  }

  return (
    <div className="auth-form">
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn">ログイン</button>
      </form>
    </div>
  )
}

export default Login
