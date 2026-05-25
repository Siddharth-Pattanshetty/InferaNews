import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Search from './pages/Search';
import Article from './pages/Article';
import Analyze from './pages/Analyze';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Publish from './pages/admin/Publish';
import Archive from './pages/admin/Archive';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/analyze" element={<Analyze />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/publish" element={<Publish />} />
          <Route path="/admin/archive" element={<Archive />} />
        </Route>
      </Route>
    </Routes>
  );
}
