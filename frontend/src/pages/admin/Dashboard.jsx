import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import Skeleton from '../../components/Skeleton';
import { Database, Activity, CheckCircle2, FileText } from 'lucide-react';

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/articles?limit=50')
  });

  const totalArticles = data?.pagination?.total || 0;
  
  // Group by category manually for the dashboard
  const categoryCounts = data?.data?.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border p-6 rounded-sm shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Database size={24} />
          </div>
          <div>
            <p className="text-sm text-text-secondary font-medium">Total Articles</p>
            {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : <p className="text-3xl font-bold text-text-primary">{totalArticles}</p>}
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-sm shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-text-secondary font-medium">ML Service</p>
            <p className="text-xl font-bold text-emerald-600 flex items-center gap-2 mt-1">
              <CheckCircle2 size={20} /> Online
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-sm shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-text-secondary font-medium">Categories</p>
            {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : <p className="text-3xl font-bold text-text-primary">{Object.keys(categoryCounts).length}</p>}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50">
          <h2 className="font-bold text-text-primary">Intelligence Distribution</h2>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-3/4" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className="p-4 border border-border rounded-sm">
                  <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">{cat}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              ))}
              {Object.keys(categoryCounts).length === 0 && (
                <p className="text-text-tertiary col-span-full">No articles published yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
