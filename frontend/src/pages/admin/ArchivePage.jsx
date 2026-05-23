import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/axios';
import useDebounce from '../../hooks/useDebounce';
import CategoryChip from '../../components/CategoryChip';
import Skeleton from '../../components/Skeleton';
import ConfirmDialog from '../../components/ConfirmDialog';
import { motion } from 'framer-motion';

const CATEGORIES = ['politics', 'entertainment', 'technology', 'sports', 'business', 'health', 'science', 'world', 'uncategorized'];

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [activeCategory, setActiveCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-archive', page, activeCategory, debouncedSearch],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 10 });
      if (activeCategory) params.append('category', activeCategory);
      
      const endpoint = debouncedSearch 
        ? `/articles/search?q=${encodeURIComponent(debouncedSearch)}&${params.toString()}`
        : `/articles?${params.toString()}`;
        
      const res = await api.get(endpoint);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-archive'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      setDeleteId(null);
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-2">Intelligence Archive</h1>
      <p className="text-text-2 mb-8">Manage, search, and purge records.</p>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-2" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            placeholder="Search titles, descriptions, content..."
            className="input-well pl-12"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <CategoryChip 
              key={cat} 
              category={cat} 
              isActive={activeCategory === cat} 
              onClick={(c) => { setActiveCategory(activeCategory === c ? null : c); setPage(1); }} 
            />
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full h-24" />
          ))
        ) : data?.length === 0 ? (
          <div className="text-center py-12 text-text-2 border border-border rounded-2xl border-dashed">
            No records found.
          </div>
        ) : (
          data?.map((article, i) => (
            <motion.div 
              key={article._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(124,92,255,0.8)]" />
                  <span className="font-mono text-xs text-text-2 uppercase tracking-wider">{article.category}</span>
                  <span className="text-xs text-text-2/50">•</span>
                  <span className="text-xs text-text-2">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg truncate pr-4">{article.title}</h3>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <Link 
                  to={`/article/${article._id}`}
                  target="_blank"
                  className="flex-1 sm:flex-none p-2 flex items-center justify-center gap-2 text-text-2 hover:bg-surface-2 hover:text-cyan rounded-lg transition-colors"
                >
                  <ExternalLink size={16} /> <span className="sm:hidden text-sm">View</span>
                </Link>
                <button 
                  onClick={() => setDeleteId(article._id)}
                  className="flex-1 sm:flex-none p-2 flex items-center justify-center gap-2 text-text-2 hover:bg-danger/20 hover:text-danger rounded-lg transition-colors"
                >
                  <Trash2 size={16} /> <span className="sm:hidden text-sm">Delete</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="flex items-center text-text-2">Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={!data || data.length < 10}
          className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Purge Record"
        message="Are you sure you want to permanently delete this intelligence record? This action cannot be undone."
        confirmText={deleteMutation.isPending ? "Purging..." : "Purge"}
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
