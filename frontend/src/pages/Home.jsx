import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container">
      <div className="home-hero">
        <h1>保育園 献立自動生成アプリ</h1>
        <p>保育園の献立表を読み取って、家庭の献立を自動提案</p>
        <Link to="/register" className="btn">今すぐ始める</Link>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>OCR献立読み取り</h3>
          <p>保育園の献立表をスマホで撮影するだけで、献立内容を自動で読み取ります。</p>
        </div>
        <div className="feature-card">
          <h3>AI献立提案</h3>
          <p>保育園食と重複しない、栄養バランスの良い家庭食をAIが自動で提案します。</p>
        </div>
        <div className="feature-card">
          <h3>アレルギー管理</h3>
          <p>子供のアレルギー情報を登録すると、危険食材を含む献立を自動で除外します。</p>
        </div>
        <div className="feature-card">
          <h3>買い物リスト生成</h3>
          <p>不足食材を自動でリスト化。買い物がスムーズになります。</p>
        </div>
      </div>
    </div>
  )
}

export default Home
