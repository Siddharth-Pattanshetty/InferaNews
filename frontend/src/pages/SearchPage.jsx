import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import api from '../lib/axios';
import useDebounce from '../hooks/useDebounce';
import ArticleCard from '../components/ArticleCard';
import Skeleton from '../components/Skeleton';
import ArticleModal from '../components/ArticleModal';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      const res = await api.get(`/articles/search?q=${encodeURIComponent(debouncedSearch)}`);
      return res.data;
    },
    enabled: !!debouncedSearch,
  });

  return (
    <div>
      <header className="mb-10 max-w-2xl mx-auto text-center">
        <h1 className="font-heading text-4xl font-bold mb-6">Database Query</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-2" size={20} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search intelligence archives..."
            className="input-well pl-12 py-4 text-lg"
          />
        </div>
      </header>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 h-64 flex flex-col gap-4">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-4 mt-auto" />
            </div>
          ))}
        </div>
      ) : !debouncedSearch ? (
        <div className="text-text-2 text-center py-20 font-mono">
          Enter a query to begin decryption.
        </div>
      ) : data?.length === 0 ? (
        <div className="text-text-2 text-center py-20 font-mono">
          No matches found for "{debouncedSearch}".
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
