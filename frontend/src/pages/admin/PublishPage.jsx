import { useState } from 'react';
import { api } from '../../services/api';
import { Send, CheckCircle2, FileText, BrainCircuit, Edit3 } from 'lucide-react';

export default function PublishPage() {
  const [step, setStep] = useState('INPUT'); // INPUT, PREVIEW, SUCCESS
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handleProcess = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setLoading(true);
    // Simulate analyzing the text to get a preview
    const data = await api.analyzeText(content);
    setPreviewData(data);
    setLoading(false);
    setStep('PREVIEW');
  };

  const handleConfirmPublish = async () => {
    setLoading(true);
    await api.publishArticle({ title, content, ...previewData });
    setLoading(false);
    setStep('SUCCESS');
    
    // Reset after a delay
    setTimeout(() => {
      setStep('INPUT');
      setTitle('');
      setContent('');
      setPreviewData(null);
    }, 4000);
  };

  return (
    <div className="page-content">
      <h1 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Publish Intelligence</h1>
      <p style={{marginBottom: '3rem', color: 'var(--text-secondary)'}}>
        {step === 'INPUT' && "Submit raw text or URL. The AI will auto-categorize and summarize it."}
        {step === 'PREVIEW' && "Review the neural classification and summary before final publishing."}
        {step === 'SUCCESS' && "Intelligence has been securely transmitted to the network."}
      </p>

      {step === 'INPUT' && (
        <div className="glass-panel" style={{padding: '2.5rem', maxWidth: '800px'}}>
          <form onSubmit={handleProcess} style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem'}}>Intelligence Headline</label>
              <input 
                type="text" 
                className="glass-input" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a high-impact headline..."
              />
            </div>

            <div>
              <label style={{display: 'block', marginBottom: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem'}}>Article Source</label>
              <textarea 
                className="glass-input" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste raw intelligence or URL here..."
                style={{minHeight: '300px', resize: 'vertical'}}
              />
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
              <button type="submit" className="btn-primary" disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <BrainCircuit size={18} /> {loading ? 'Analyzing...' : 'Process Intelligence'}
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 'PREVIEW' && previewData && (
        <div style={{maxWidth: '800px'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem'}}>
            <div className="glass-panel" style={{padding: '2rem'}}>
              <div style={{color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <BrainCircuit size={20} />
                <h3 style={{fontSize: '1rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em'}}>Classification</h3>
              </div>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)'}}>{previewData.category}</div>
              <p style={{marginTop: '0.5rem', color: 'var(--primary-dim)', fontSize: '0.9rem'}}>98% Confidence</p>
            </div>

            <div className="glass-panel" style={{padding: '2rem'}}>
              <div style={{color: 'var(--secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <FileText size={20} />
                <h3 style={{fontSize: '1rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em'}}>AI Summary</h3>
              </div>
              <p style={{fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-primary)'}}>
                {previewData.summary}
              </p>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem'}}>
            <button onClick={() => setStep('INPUT')} className="btn-secondary" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Edit3 size={18} /> Edit Input
            </button>
            <button onClick={handleConfirmPublish} className="btn-glow" disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Send size={18} /> {loading ? 'Publishing...' : 'Confirm & Publish'}
            </button>
          </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div className="glass-panel" style={{padding: '4rem 2rem', maxWidth: '800px', textAlign: 'center'}}>
          <CheckCircle2 size={64} style={{color: 'var(--primary)', margin: '0 auto 2rem'}} />
          <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Transmission Successful</h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem'}}>The intelligence report has been categorized, summarized, and published to the civilian feed.</p>
        </div>
      )}
    </div>
  );
}
