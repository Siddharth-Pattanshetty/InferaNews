import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PenTool, Archive, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdminLayout() {
  const location = useLocation();
  const { logout, user } = useAuth();

  const links = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/publish', label: 'Publish', icon: PenTool },
    { path: '/admin/archive', label: 'Archive', icon: Archive },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-l-0 border-y-0 rounded-l-none fixed h-screen flex flex-col pt-8 pb-6 px-4 z-40">
        <div className="px-2 mb-10">
          <span className="font-heading font-bold text-xl text-text-1">
            Admin <span className="text-accent">Panel</span>
          </span>
          <p className="text-xs font-mono text-text-2 mt-1">Operator: {user?.username}</p>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-accent/10 text-accent border border-accent/20' 
                    : 'text-text-2 hover:bg-surface-2 hover:text-text-1'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-accent' : 'text-text-2'} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-border">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-2 hover:bg-surface-2 transition-all">
            <ArrowLeft size={18} /> Back to Site
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 transition-all text-left"
          >
            <LogOut size={18} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
