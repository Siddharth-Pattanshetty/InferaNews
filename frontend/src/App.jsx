import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, FileText, Search, LayoutDashboard, Edit3, Database } from 'lucide-react';
import './App.css';

// --- PAGES ---
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AnalysisPage from './pages/AnalysisPage';
import SearchPage from './pages/SearchPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import PublishPage from './pages/admin/PublishPage';
import ManageContentPage from './pages/admin/ManageContentPage';

// --- LAYOUTS ---
const PublicLayout = ({ children }) => (
  <div className="app-container">
    <nav className="top-nav glass-panel-high">
      <div className="nav-brand">
        <span className="brand-icon">🧠</span> InferaNews
      </div>
      <div className="nav-links">
        <Link to="/"><Home size={18}/> Feed</Link>
        <Link to="/analyze"><FileText size={18}/> Analyze</Link>
        <Link to="/search"><Search size={18}/> Search</Link>
      </div>
      <div className="nav-actions">
        {/* Admin link removed from public civilian route for security */}
      </div>
    </nav>
    <main className="main-content">
      {children}
    </main>
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="admin-container">
    <aside className="admin-sidebar glass-panel-high">
      <div className="nav-brand">
        <span className="brand-icon">⚡</span> Admin Center
      </div>
      <div className="admin-links">
        <Link to="/admin"><LayoutDashboard size={18}/> Dashboard</Link>
        <Link to="/admin/publish"><Edit3 size={18}/> Publish</Link>
        <Link to="/admin/manage"><Database size={18}/> Manage</Link>
      </div>
      <div className="admin-bottom">
        <Link to="/" className="btn-secondary">Back to Site</Link>
      </div>
    </aside>
    <main className="admin-content">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/article/:id" element={<PublicLayout><ArticlePage /></PublicLayout>} />
        <Route path="/analyze" element={<PublicLayout><AnalysisPage /></PublicLayout>} />
        <Route path="/search" element={<PublicLayout><SearchPage /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><DashboardPage /></AdminLayout>} />
        <Route path="/admin/publish" element={<AdminLayout><PublishPage /></AdminLayout>} />
        <Route path="/admin/manage" element={<AdminLayout><ManageContentPage /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
