import { Activity, Database, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="page-content">
      <h1>Command Center</h1>
      <p style={{marginBottom: '3rem'}}>System health and processing intelligence.</p>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem'}}>
        <div className="glass-panel" style={{padding: '2rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)'}}>
            <Database size={20} />
            <span style={{fontWeight: 'bold'}}>Articles Processed</span>
          </div>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)'}}>14,208</div>
          <p style={{color: 'var(--primary-dim)', fontSize: '0.9rem', marginTop: '0.5rem'}}>+24 today</p>
        </div>

        <div className="glass-panel" style={{padding: '2rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--tertiary-light)'}}>
            <Activity size={20} />
            <span style={{fontWeight: 'bold'}}>Avg. Summarization Time</span>
          </div>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)'}}>1.2s</div>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem'}}>BART / DistilBART</p>
        </div>

        <div className="glass-panel" style={{padding: '2rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)'}}>
            <Users size={20} />
            <span style={{fontWeight: 'bold'}}>Active Categories</span>
          </div>
          <div style={{fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)'}}>12</div>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem'}}>Logistic Regression model</p>
        </div>
      </div>
    </div>
  );
}
