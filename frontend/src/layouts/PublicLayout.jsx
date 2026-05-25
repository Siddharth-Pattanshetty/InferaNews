import { Link, Outlet } from 'react-router-dom';
import { Search, BrainCircuit } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-heading font-bold text-accent">
            InferaNews
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Feed
            </Link>
            <Link to="/analyze" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
              <BrainCircuit size={16} />
              Analyze
            </Link>
            <Link to="/search" className="text-text-secondary hover:text-text-primary transition-colors">
              <Search size={20} />
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="border-t border-border bg-surface py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-text-tertiary text-sm">
            © {new Date().getFullYear()} InferaNews. Powered by AI Intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}
