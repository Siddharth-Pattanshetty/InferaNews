import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';
import Skeleton from '../components/Skeleton';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default function Article() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => api.get(`/articles/${id}`)
  });

  const article = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-64 w-full mt-8" />
      </div>
    );
  }

  if (!article) {
    return <div className="text-center py-20">Article not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors font-medium">
        <ArrowLeft size={16} /> Back to feed
      </Link>
      
      <article>
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="badge-category">{article.category}</span>
            <span className="text-text-tertiary flex items-center gap-1 text-sm">
              <Clock size={14} />
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl text-text-secondary leading-relaxed">
            {article.description}
          </p>
        </header>

        {article.summary && (
          <div className="bg-accent-light border border-accent/20 rounded-sm p-6 mb-10">
            <div className="flex items-center gap-2 text-accent font-bold mb-3 uppercase tracking-wider text-sm">
              <Sparkles size={16} />
              AI Summary
            </div>
            <p className="text-lg text-text-primary leading-relaxed font-heading">
              {article.summary}
            </p>
          </div>
        )}

        <div className="prose prose-lg max-w-none text-text-primary leading-loose font-body">
          {article.content.split('\n').map((paragraph, idx) => (
            paragraph.trim() ? <p key={idx} className="mb-6">{paragraph}</p> : null
          ))}
        </div>
      </article>

      {/* Related Narratives Section */}
      {article.similarArticles && article.similarArticles.length > 0 && (
        <section className="mt-20 pt-10 border-t border-border">
          <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-2">
            Related Narratives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.similarArticles.map((similar) => (
              <Link key={similar._id || similar.id || Math.random()} to={`/article/${similar._id || similar.id}`} className="editorial-card p-5 rounded-sm block group">
                <h4 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {similar.title || similar.headline || similar.text?.substring(0, 50) + '...'}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
