import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import Skeleton from '../../components/Skeleton';
import { Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Archive() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-articles'],
    queryFn: () => api.get('/articles?limit=50')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/articles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-sm shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-surface-muted flex items-center justify-between">
        <h2 className="font-bold text-text-primary">Intelligence Archive</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-muted text-text-secondary border-b border-border text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Headline</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-3/4" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-4 w-8 ml-auto" /></td>
                </tr>
              ))
            ) : data?.data?.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-text-tertiary">
                  No articles found in the archive.
                </td>
              </tr>
            ) : (
              data?.data?.map((article) => (
                <tr key={article._id} className="hover:bg-surface-hover transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-text-primary line-clamp-1">{article.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-category text-[10px]">{article.category}</span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        to={`/article/${article._id}`} 
                        target="_blank"
                        className="text-text-tertiary hover:text-accent transition-colors"
                        title="View Public Article"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id, article.title)}
                        disabled={deleteMutation.isPending && deleteMutation.variables === article._id}
                        className="text-text-tertiary hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete Article"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
