import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import Skeleton from '../components/Skeleton';
import { Clock } from 'lucide-react';

const CATEGORIES = ['All', 'Technology', 'Business', 'Politics', 'Science', 'Health', 'Entertainment'];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, isLoading } = useQuery({
    queryKey: ['articles', activeCategory],
    queryFn: async () => {
      const endpoint = activeCategory === 'All' 
        ? '/articles' 
        : `/articles?category=${activeCategory.toLowerCase()}`;
      return await api.get(endpoint);
    }
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-accent text-white border border-accent'
                : 'bg-surface text-text-secondary border border-border hover:border-border-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))
        ) : data?.data?.length === 0 ? (
          <div className="col-span-full py-12 text-center text-text-tertiary">
            No articles found in this category.
          </div>
        ) : (
          data?.data?.map((article, idx) => (
            <Link key={article._id} to={`/article/${article._id}`} className="group flex flex-col gap-4 editorial-card p-5 rounded-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-category">{article.category}</span>
                <span className="text-text-tertiary flex items-center gap-1 text-xs">
                  <Clock size={12} />
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h2 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                {article.title}
              </h2>
              
              <p className="text-text-secondary line-clamp-3 leading-relaxed">
                {article.description}
              </p>
              
              {article.summary && (
                <div className="mt-auto pt-4 border-t border-border">
                  <div className="badge-ai mb-2">AI Summary</div>
                  <p className="text-sm text-text-secondary line-clamp-2 italic border-l-2 border-accent pl-3">
                    {article.summary}
                  </p>
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
