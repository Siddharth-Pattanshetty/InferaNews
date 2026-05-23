import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import ArticleCard from '../components/ArticleCard';
import CategoryChip from '../components/CategoryChip';
import Skeleton from '../components/Skeleton';
import ArticleModal from '../components/ArticleModal';

const CATEGORIES = ['politics', 'entertainment', 'technology', 'sports', 'business', 'health', 'science', 'world', 'uncategorized'];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', page, activeCategory],
    queryFn: async () => {
      const params = new URLSearchParams({ page, limit: 12 });
      if (activeCategory) params.append('category', activeCategory);
      const res = await api.get(`/articles?${params.toString()}`);
      return res.data; // The array of articles
    },
    refetchInterval: 30000, // Poll every 30s
  });

  const handleCategoryClick = (cat) => {
    setActiveCategory(activeCategory === cat ? null : cat);
    setPage(1);
  };

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-heading text-4xl font-bold mb-4">Intelligence Feed</h1>
        <p className="text-text-2 text-lg">Real-time global summaries decrypted by AI.</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <CategoryChip 
            key={cat} 
            category={cat} 
            isActive={activeCategory === cat} 
            onClick={handleCategoryClick} 
          />
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card p-6 h-64 flex flex-col gap-4">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-4 mt-auto" />
              <Skeleton className="w-2/3 h-4" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-danger p-6 bg-danger/10 rounded-xl border border-danger/20">
          Failed to connect to the Intelligence Network.
        </div>
      ) : data?.length === 0 ? (
        <div className="text-text-2 text-center py-20">
          No intelligence found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map(article => (
            <ArticleCard 
              key={article._id} 
              article={article} 
              onClick={setSelectedArticle} 
            />
          ))}
        </div>
      )}

      {/* Pagination (Simple for MVP) */}
      <div className="mt-12 flex justify-center gap-4">
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
          disabled={!data || data.length < 12}
          className="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}
    </div>
  );
}
