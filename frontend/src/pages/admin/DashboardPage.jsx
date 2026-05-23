import { useQuery } from '@tanstack/react-query';
import { RefreshCw, FileText, Activity } from 'lucide-react';
import api from '../../lib/axios';
import Skeleton from '../../components/Skeleton';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Fetch latest 50 articles to compute stats client-side for MVP
      const res = await api.get('/articles?limit=50');
      return res.data;
    },
  });

  const totalArticles = data?.length || 0;
  
  // Compute category breakdown
  const categoryCounts = data?.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Command Center</h1>
          <p className="text-text-2 mt-1">System overview and intelligence metrics.</p>
        </div>
        <button 
          onClick={() => refetch()} 
          disabled={isRefetching}
          className="btn-ghost flex items-center gap-2"
        >
          <RefreshCw size={16} className={isRefetching ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-text-2 font-mono text-sm uppercase tracking-wider mb-1">Total Records</p>
              <h2 className="font-heading text-4xl font-bold">{totalArticles}</h2>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center text-cyan">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-text-2 font-mono text-sm uppercase tracking-wider mb-1">System Status</p>
              <h2 className="font-heading text-2xl font-bold text-success">Online</h2>
            </div>
          </motion.div>
        </div>
      )}

      <h2 className="font-heading text-xl font-bold mb-6">Category Distribution (Last 50)</h2>
      {isLoading ? (
        <Skeleton className="h-64" />
      ) : (
        <div className="glass-card p-6">
          {Object.keys(categoryCounts).length === 0 ? (
            <p className="text-text-2">No data available.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(categoryCounts).sort((a,b) => b[1] - a[1]).map(([cat, count]) => (
                <div key={cat} className="flex items-center gap-4">
                  <span className="w-32 font-mono text-sm text-text-2 uppercase">{cat}</span>
                  <div className="flex-1 h-3 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / totalArticles) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-accent"
                    />
                  </div>
                  <span className="font-mono text-sm">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
