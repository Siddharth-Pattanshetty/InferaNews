import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Trash2, Edit } from 'lucide-react';

export default function ManageContentPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const data = await api.getArticles();
    setArticles(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this intelligence report?')) {
      await api.deleteArticle(id);
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  return (
    <div className="page-content">
      <h1>Content Repository</h1>
      <p style={{marginBottom: '2rem'}}>Manage processed articles and intelligence.</p>

      <div className="glass-panel" style={{overflow: 'hidden'}}>
        {loading ? (
          <div style={{padding: '2rem', color: 'var(--primary)'}}>Loading repository...</div>
        ) : (
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead>
              <tr style={{borderBottom: '1px solid var(--ghost-border)', background: 'rgba(21, 27, 45, 0.5)'}}>
                <th style={{padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500'}}>Title</th>
                <th style={{padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500'}}>Category</th>
                <th style={{padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500'}}>Date</th>
                <th style={{padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} style={{borderBottom: '1px solid rgba(58, 73, 74, 0.1)', transition: 'background 0.2s'}} onMouseOver={e => e.currentTarget.style.background='rgba(46, 52, 71, 0.3)'} onMouseOut={e => e.currentTarget.style.background='transparent'}>
                  <td style={{padding: '1rem', color: 'var(--text-primary)'}}>{article.title}</td>
                  <td style={{padding: '1rem'}}><span style={{color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>{article.category}</span></td>
                  <td style={{padding: '1rem', color: 'var(--text-secondary)'}}>{new Date(article.date).toLocaleDateString()}</td>
                  <td style={{padding: '1rem', textAlign: 'right'}}>
                    <button style={{background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginRight: '1rem'}} title="Edit">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(article.id)} style={{background: 'none', border: 'none', color: '#ffb4ab', cursor: 'pointer'}} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan="4" style={{padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)'}}>No articles found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
