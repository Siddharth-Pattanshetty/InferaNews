import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts & Guards
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Civilian Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ArticlePage from './pages/ArticlePage';

// Auth & Admin Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import PublishPage from './pages/admin/PublishPage';
import ArchivePage from './pages/admin/ArchivePage';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Civilian Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Route>

        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/publish" element={<PublishPage />} />
            <Route path="/admin/archive" element={<ArchivePage />} />
          </Route>
        </Route>

        {/* Fallback 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center text-text-2">
            Intelligence node not found (404).
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
}
