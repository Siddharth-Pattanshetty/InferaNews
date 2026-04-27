import { useState } from 'react';
import { api } from '../services/api';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setHasSearched(true);
    // In a real app, we'd pass the query. For mock, just getting all.
    const data = await api.getArticles();
    // Simple mock filter
    setResults(data.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase())));
    setLoading(false);
  };

  return (
    <div className="page-content">
      <h1>Explore Trends</h1>
      <p style={{marginBottom: '2rem'}}>Semantic similarity search powered by FAISS.</p>

      <div className="glass-panel" style={{padding: '1.5rem', marginBottom: '3rem'}}>
        <form onSubmit={handleSearch} style={{display: 'flex', gap: '1rem'}}>
          <div style={{flex: 1, position: 'relative'}}>
            <SearchIcon size={20} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)'}} />
            <input 
              type="text" 
              className="glass-input" 
              style={{paddingLeft: '3rem', borderRadius: '0.5rem', border: '1px solid var(--ghost-border)', background: 'rgba(21, 27, 45, 0.5)'}}
              placeholder="Search topics, keywords, or concepts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {hasSearched && !loading && results.length === 0 && (
        <div style={{textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem'}}>
          No intelligence found matching your query.
        </div>
      )}

      {results.length > 0 && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <h3 style={{marginBottom: '1rem', color: 'var(--primary)'}}>Top Matches</h3>
          {results.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="glass-panel" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none'}}>
              <div>
                <span style={{fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.25rem', display: 'block'}}>{article.category}</span>
                <h4 style={{fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0}}>{article.title}</h4>
              </div>
              <ArrowRight size={20} style={{color: 'var(--text-secondary)'}} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
