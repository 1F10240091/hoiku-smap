function Home() {
  return (
    <div className="home">
      <h1>Hoiku-SMap</h1>
      <p className="subtitle">保育園 献立自動生成アプリ</p>
      
      <div className="features">
        <div className="feature-card">
          <h3>📸 献立表スキャン</h3>
          <p>保育園の献立表をOCRで自動読み取り</p>
        </div>
        <div className="feature-card">
          <h3>👶 プロフィール管理</h3>
          <p>子供の年齢・アレルギー・好き嫌いを登録</p>
        </div>
        <div className="feature-card">
          <h3>🧊 冷蔵庫食材入力</h3>
          <p>いまある主要食材を手動入力</p>
        </div>
        <div className="feature-card">
          <h3>🤖 AI献立提案</h3>
          <p>保育園食を考慮した家庭食を自動生成</p>
        </div>
        <div className="feature-card">
          <h3>📊 栄養一括管理</h3>
          <p>保育園食＋家庭食の栄養バランスを可視化</p>
        </div>
        <div className="feature-card">
          <h3>🛒 買い物リスト生成</h3>
          <p>不足食材を自動でリスト化</p>
        </div>
      </div>
    </div>
  )
}

export default Home
