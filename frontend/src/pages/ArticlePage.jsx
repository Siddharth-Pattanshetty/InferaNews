import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import api from '../lib/axios';
import Skeleton from '../components/Skeleton';

export default function ArticlePage() {
  const { id } = useParams();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const res = await api.get(`/articles/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="w-32 h-6 mb-10" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-3/4 h-12" />
        <Skeleton className="w-full h-64 mt-8" />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="text-center py-20 text-danger">
        Intelligence file corrupted or missing.
        <br />
        <Link to="/" className="text-accent hover:underline mt-4 inline-block">Return to Feed</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-text-2 hover:text-accent transition-colors mb-10 font-medium">
        <ArrowLeft size={16} /> Back to Briefing
      </Link>

      <span className="font-mono text-sm text-accent uppercase tracking-wider block mb-4">
        {article.category}
      </span>
      
      <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6 leading-tight text-text-1">
        {article.title}
      </h1>
      
      <p className="text-text-2 font-mono text-sm mb-12">
        Published: {new Date(article.createdAt).toLocaleString()}
      </p>

      {article.summary && (
        <div className="bg-surface-2/50 border-l-4 border-accent rounded-r-xl p-6 sm:p-8 mb-12">
          <div className="flex items-center gap-2 text-accent mb-4">
            <BrainCircuit size={20} />
            <h3 className="font-heading font-semibold text-xl">AI Abstract</h3>
          </div>
          <p className="text-text-1 text-lg leading-relaxed">
            {article.summary}
          </p>
        </div>
      )}

      <div className="prose prose-invert max-w-none text-text-2 leading-loose whitespace-pre-wrap text-lg">
        {article.content}
      </div>
    </article>
  );
}
