import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { X, BrainCircuit } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [articleDetail, setArticleDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    api.getArticles().then(data => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const openModal = async (id) => {
    setSelectedArticleId(id);
    setLoadingDetail(true);
    const data = await api.getArticleById(id);
    setArticleDetail(data);
    setLoadingDetail(false);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedArticleId(null);
    setArticleDetail(null);
    document.body.style.overflow = 'auto';
  };

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
                <button onClick={() => openModal(article.id)} className="btn-secondary" style={{padding: '0.5rem 1rem', fontSize: '0.85rem'}}>Read Insight</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL OVERLAY --- */}
      {selectedArticleId && createPortal(
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
            
            {loadingDetail ? (
              <div style={{padding: '4rem', textAlign: 'center', color: 'var(--primary)'}}>Decrypting intelligence...</div>
            ) : articleDetail ? (
              <div style={{padding: '3rem 4rem'}}>
                <span style={{
                  fontSize: '0.85rem', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  display: 'block'
                }}>{articleDetail.category}</span>
                
                <h2 style={{fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '1.5rem'}}>{articleDetail.title}</h2>
                <p style={{color: 'var(--text-secondary)', marginBottom: '3rem'}}>
                  Published: {new Date(articleDetail.date).toLocaleDateString()}
                </p>

                <div className="glass-panel" style={{padding: '2rem', marginBottom: '3rem', background: 'rgba(0, 245, 255, 0.05)', borderLeft: '4px solid var(--tertiary)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--tertiary)'}}>
                    <BrainCircuit size={20} />
                    <h3 style={{margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)'}}>AI Abstract</h3>
                  </div>
                  <p style={{fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-primary)'}}>
                    {articleDetail.summary}
                  </p>
                </div>

                <div style={{fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap'}}>
                  {articleDetail.content}
                </div>
              </div>
            ) : (
              <div style={{padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)'}}>Intelligence file corrupted or missing.</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
