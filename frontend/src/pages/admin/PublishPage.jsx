import { useState } from 'react';
import { api } from '../../services/api';
import { Send } from 'lucide-react';

export default function PublishPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setLoading(true);
    await api.publishArticle({ title, content });
    setLoading(false);
    setSuccess(true);
    setTitle('');
    setContent('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="page-content">
      <h1>Publish Intelligence</h1>
      <p style={{marginBottom: '2rem'}}>Submit raw text. The AI will auto-categorize and summarize it.</p>

      <div className="glass-panel" style={{padding: '2rem', maxWidth: '800px'}}>
        <form onSubmit={handlePublish} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500'}}>Headline / Title</label>
            <input 
              type="text" 
              className="glass-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title..."
              style={{background: 'rgba(21, 27, 45, 0.5)', border: '1px solid var(--ghost-border)', borderRadius: '0.5rem'}}
            />
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500'}}>Full Content</label>
            <textarea 
              className="glass-input" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the full article content here for AI processing..."
              style={{
                minHeight: '250px', 
                resize: 'vertical',
                background: 'rgba(21, 27, 45, 0.5)', 
                border: '1px solid var(--ghost-border)', 
                borderRadius: '0.5rem',
                padding: '1rem'
              }}
            />
          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem'}}>
            {success && <span style={{color: 'var(--primary)'}}>Intelligence published successfully!</span>}
            <button type="submit" className="btn-primary" disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Send size={18} /> {loading ? 'Processing...' : 'Publish to Feed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
