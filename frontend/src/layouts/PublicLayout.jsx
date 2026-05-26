import { Link, Outlet } from 'react-router-dom';
import { Search, BrainCircuit } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="sticky top-0 z-50 bg-surface/60 backdrop-blur-2xl border-b border-border/50 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-heading font-bold text-accent drop-shadow-sm">
            InferaNews
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-text-secondary hover:text-accent transition-colors">
              Feed
            </Link>
            <Link to="/analyze" className="text-sm font-medium text-text-secondary hover:text-accent transition-colors flex items-center gap-1.5">
              <BrainCircuit size={16} />
              Analyze
            </Link>
            <Link to="/search" className="text-text-secondary hover:text-accent transition-colors">
              <Search size={20} />
            </Link>
            <div className="pl-4 border-l border-border/50">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 relative z-10">
        <Outlet />
      </main>
      
      <footer className="border-t border-border/50 bg-surface/40 backdrop-blur-md py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-text-tertiary text-sm font-medium">
            © {new Date().getFullYear()} InferaNews. Powered by AI Intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}
