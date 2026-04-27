import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, BrainCircuit } from 'lucide-react';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getArticleById(id).then(data => {
      setArticle(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="page-content" style={{color: 'var(--primary)'}}>Decrypting intelligence...</div>;
  if (!article) return <div className="page-content">Article not found.</div>;

  return (
    <div className="page-content">
      <Link to="/" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)'}}>
        <ArrowLeft size={16} /> Back to Briefing
      </Link>

      <span style={{
        fontSize: '0.85rem', 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em',
        color: 'var(--primary)',
        marginBottom: '1rem',
        display: 'block'
      }}>{article.category}</span>
      
      <h1 style={{fontSize: '3rem', lineHeight: 1.1, marginBottom: '2rem'}}>{article.title}</h1>
      <p style={{color: 'var(--text-secondary)', marginBottom: '3rem'}}>
        Published: {new Date(article.date).toLocaleDateString()}
      </p>

      <div className="glass-panel" style={{padding: '2rem', marginBottom: '3rem', background: 'rgba(135, 47, 213, 0.05)', borderLeft: '4px solid var(--tertiary)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--tertiary)'}}>
          <BrainCircuit size={20} />
          <h3 style={{margin: 0, fontSize: '1.2rem'}}>AI Abstract</h3>
        </div>
        <p style={{fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-primary)'}}>
          {article.summary}
        </p>
      </div>

      <div style={{fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap'}}>
        {article.content}
      </div>
    </div>
  );
}
