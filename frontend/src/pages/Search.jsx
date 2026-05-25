import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../lib/axios';
import Skeleton from '../components/Skeleton';
import { Search as SearchIcon, Clock } from 'lucide-react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query) {
        setSearchParams({ q: query });
      } else {
        setSearchParams({});
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => debouncedQuery ? api.get(`/articles/search?q=${encodeURIComponent(debouncedQuery)}`) : null,
    enabled: !!debouncedQuery
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="text-text-tertiary" size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search global intelligence..."
          className="input-standard pl-12 py-4 text-lg font-medium shadow-sm"
          autoFocus
        />
      </div>

      <div>
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : !debouncedQuery ? (
          <div className="text-center py-20 text-text-tertiary">
            Enter keywords to search the database.
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-20 text-text-tertiary">
            No results found for "{debouncedQuery}".
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4 border-b border-border pb-2">
              Search Results ({data?.data?.length})
            </h3>
            {data?.data?.map((article) => (
              <Link key={article._id} to={`/article/${article._id}`} className="block editorial-card p-6 rounded-sm group">
                <div className="flex items-center gap-3 mb-2">
                  <span className="badge-category">{article.category}</span>
                  <span className="text-text-tertiary flex items-center gap-1 text-xs">
                    <Clock size={12} />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                <p className="text-text-secondary line-clamp-2">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
