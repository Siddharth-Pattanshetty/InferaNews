import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, PenTool, Archive, LogOut, Settings } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Publish', path: '/admin/publish', icon: PenTool },
    { name: 'Archive', path: '/admin/archive', icon: Archive },
  ];

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="text-xl font-heading font-bold text-accent">
            InferaNews <span className="text-xs font-sans text-text-tertiary ml-1">OPS</span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-accent-light text-accent' 
                    : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-primary">{user.username}</span>
              <span className="text-xs text-text-tertiary">Administrator</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium text-danger-text hover:bg-danger-bg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8">
          <h1 className="text-xl font-bold font-heading">
            {navItems.find(i => i.path === location.pathname)?.name || 'Admin'}
          </h1>
          <div className="flex items-center gap-4 text-text-tertiary">
            <ThemeToggle />
            <Settings size={20} className="hover:text-text-primary cursor-pointer transition-colors" />
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
