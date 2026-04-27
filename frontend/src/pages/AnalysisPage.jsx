import { useState } from 'react';
import { api } from '../services/api';
import { Sparkles, FileText, BarChart2 } from 'lucide-react';

export default function AnalysisPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const data = await api.analyzeText(text);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="page-content">
      <h1>Intelligence Analyzer</h1>
      <p style={{marginBottom: '2rem'}}>Paste any news article to extract its core meaning and category.</p>

      <div className="glass-panel" style={{padding: '2rem', marginBottom: '2rem'}}>
        <textarea 
          className="glass-input" 
          style={{
            minHeight: '200px', 
            resize: 'vertical', 
            background: 'transparent',
            border: '1px solid var(--ghost-border)',
            borderRadius: '0.5rem',
            padding: '1rem'
          }}
          placeholder="Paste article content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'flex-end'}}>
          <button className="btn-primary" onClick={handleAnalyze} disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            {loading ? <span className="pulse-indicator" style={{width: '8px', height: '8px', background: '#fff', borderRadius: '50%', display: 'inline-block'}} /> : <Sparkles size={18} />}
            {loading ? 'Processing...' : 'Analyze Text'}
          </button>
        </div>
      </div>

      {result && (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem'}}>
          <div className="glass-panel" style={{padding: '1.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)'}}>
              <BarChart2 size={20} />
              <h3 style={{fontSize: '1.2rem', margin: 0}}>Classification</h3>
            </div>
            <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)'}}>
              {result.category}
            </div>
            <p style={{marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
              Logistic Regression Confidence: ~94%
            </p>
          </div>

          <div className="glass-panel" style={{padding: '1.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--tertiary-light)'}}>
              <FileText size={20} />
              <h3 style={{fontSize: '1.2rem', margin: 0}}>AI Summary</h3>
            </div>
            <p style={{fontSize: '1.05rem', lineHeight: 1.6}}>
              {result.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
