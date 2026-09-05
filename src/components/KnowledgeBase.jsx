import { useState } from 'react'
import articles from '../data/knowledgeBase'

function KnowledgeBase() {
  const [search, setSearch] = useState('')

  const filtered = articles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="content-header">
        <div>
          <div className="page-title">Knowledge Base</div>
          <div className="page-subtitle">{articles.length} articles</div>
        </div>
      </div>

      <input
        className="kb-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search articles..."
      />

      <div className="kb-list">
        {filtered.map((article) => (
          <div key={article.title} className="info-card kb-article">
            <div className="kb-article-header">
              <div className="kb-article-title">{article.title}</div>
              <span className="badge pill-cat">{article.category}</span>
            </div>
            <div className="kb-article-body">{article.body}</div>
          </div>
        ))}
        {filtered.length === 0 && <div className="kb-empty">No articles match "{search}".</div>}
      </div>
    </div>
  )
}

export default KnowledgeBase
