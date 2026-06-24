import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MealPlan from './pages/MealPlan'
import Recipes from './pages/Recipes'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="logo">保育園 献立アプリ</Link>
          <div className="nav-links">
            <Link to="/recipes">レシピ検索</Link>
            <Link to="/dashboard">ダッシュボード</Link>
            <Link to="/login">ログイン</Link>
            <Link to="/register">新規登録</Link>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
