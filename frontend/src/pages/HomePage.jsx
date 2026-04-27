import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getArticles().then(data => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-content">
      <h1>Daily Briefing</h1>
      <p style={{marginBottom: '2rem'}}>Top summaries and trending intelligence.</p>
      
      {loading ? (
        <div style={{color: 'var(--primary)'}}>Loading intelligence...</div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem'}}>
          {articles.map(article => (
            <div key={article.id} className="glass-panel" style={{padding: '1.5rem', display: 'flex', flexDirection: 'column'}}>
              <span style={{
                fontSize: '0.75rem', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                color: 'var(--primary)',
                marginBottom: '0.5rem'
              }}>{article.category}</span>
              <h3 style={{marginBottom: '1rem', fontSize: '1.25rem'}}>{article.title}</h3>
              <p style={{fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1}}>{article.summary}</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
                  {new Date(article.date).toLocaleDateString()}
                </span>
                <Link to={`/article/${article.id}`} className="btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.85rem'}}>Read Insight</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
