import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Trash2, Edit, Eye, Search, Filter } from 'lucide-react';

export default function ManageContentPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const data = await api.getArticles();
    
    // Assigning mock priorities/statuses for the Ethereal Archive design
    const enhancedData = data.map((a, i) => ({
      ...a,
      priority: i % 2 === 0 ? 'Alpha' : 'Beta',
      status: 'Processed'
    }));
    
    setArticles(enhancedData);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this intelligence report?')) {
      await api.deleteArticle(id);
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-content">
      <h1 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Intelligence Archive</h1>
      <p style={{marginBottom: '3rem', color: 'var(--text-secondary)'}}>Review, edit, and manage processed intelligence streams.</p>

      {/* Search & Filters */}
      <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center'}}>
        <div style={{flex: 1, position: 'relative'}}>
          <Search size={18} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)'}} />
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Search intelligence repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{paddingLeft: '2.75rem', background: 'var(--surface-high)', borderRadius: '2rem', border: '1px solid var(--ghost-border)'}}
          />
        </div>
        <button className="filter-chip active" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <Filter size={14} /> Priority
        </button>
        <button className="filter-chip">Category</button>
        <button className="filter-chip">Date</button>
      </div>

      {/* Archive List */}
      <div>
        {loading ? (
          <div style={{padding: '2rem', color: 'var(--primary)', textAlign: 'center'}}>Accessing Archive...</div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {filteredArticles.map((article) => (
              <div key={article.id} className="archive-card">
                
                {/* Left Section: Status & Details */}
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span style={{
                      color: article.priority === 'Alpha' ? 'var(--primary)' : 'var(--secondary)',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      [{article.priority}]
                    </span>
                    <span style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 style={{fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0}}>
                    {article.title}
                  </h3>
                  
                  <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem'}}>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                    <span style={{display: 'flex', alignItems: 'center'}}>
                      <span className="status-indicator status-processed"></span>
                      {article.status}
                    </span>
                  </div>
                </div>

                {/* Right Section: Actions */}
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <button className="btn-secondary" style={{padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}} title="View">
                    <Eye size={18} />
                  </button>
                  <button className="btn-secondary" style={{padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'}} title="Edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="btn-secondary" style={{padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#ff6e84'}} title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>

              </div>
            ))}
            
            {filteredArticles.length === 0 && (
              <div style={{padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-secondary)'}}>
                <Search size={32} style={{margin: '0 auto 1rem', opacity: 0.5}} />
                <p>No intelligence reports matched your query.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
