import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Compass } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,92,255,0.4)] group-hover:shadow-[0_0_25px_rgba(124,92,255,0.6)] transition-all">
            <Compass size={18} className="text-white" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-text-1">
            Infera<span className="text-accent">News</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${location.pathname === '/' ? 'text-accent' : 'text-text-2 hover:text-text-1'}`}
          >
            Feed
          </Link>
          <Link 
            to="/search" 
            className={`font-medium transition-colors flex items-center gap-1 ${location.pathname === '/search' ? 'text-cyan' : 'text-text-2 hover:text-text-1'}`}
          >
            <Search size={16} /> Search
          </Link>
        </div>
      </nav>

      {/* Main Content with Page Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
