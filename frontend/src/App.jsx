import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';

import Home from './pages/Home';
import Search from './pages/Search';
import Article from './pages/Article';
import Analyze from './pages/Analyze';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/analyze" element={<Analyze />} />
      </Route>
      {/* Admin routes will go here in Phase 2 */}
    </Routes>
  );
}
