import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import api from '../../lib/axios';
import { motion } from 'framer-motion';

export default function PublishPage() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [publishedArticle, setPublishedArticle] = useState(null);

  const queryClient = useQueryClient();

  const publishMutation = useMutation({
    mutationFn: async (newArticle) => {
      // Backend auto-calls ML to generate category and summary
      const res = await api.post('/articles', newArticle);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      setPublishedArticle(data);
      setStep(3); // Go to success
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !content) return;
    
    // We move to step 2 (Processing) and trigger the mutation
    setStep(2);
    publishMutation.mutate({ title, description, content });
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setContent('');
    setPublishedArticle(null);
    setStep(1);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-3xl font-bold mb-2">Publish Intelligence</h1>
      <p className="text-text-2 mb-8">Enter raw data. AI will automatically classify and summarize.</p>

      {step === 1 && (
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <div className="glass-card p-8 space-y-6">
            <div>
              <label className="block font-mono text-sm text-text-2 uppercase tracking-wider mb-2">Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-well text-xl font-bold"
                placeholder="Enter headline..."
                required
              />
            </div>
            
            <div>
              <label className="block font-mono text-sm text-text-2 uppercase tracking-wider mb-2">Short Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-well min-h-[100px] resize-y"
                placeholder="Brief summary for feed cards..."
                required
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-text-2 uppercase tracking-wider mb-2">Full Briefing</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-well min-h-[300px] resize-y"
                placeholder="Paste full article text here..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn-primary flex items-center gap-2">
              <Sparkles size={18} />
              Process & Publish
            </button>
          </div>
        </motion.form>
      )}

      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6"
        >
          <Loader2 size={48} className="text-accent animate-spin" />
          <div>
            <h2 className="font-heading text-2xl font-bold mb-2">Analyzing Intelligence...</h2>
            <p className="text-text-2">Routing through ML pipeline for classification and summarization.</p>
          </div>
          {publishMutation.isError && (
            <div className="text-danger mt-4 bg-danger/10 p-4 rounded-lg">
              Error: {publishMutation.error?.message || 'Failed to publish'}
              <button onClick={() => setStep(1)} className="block mt-4 text-white underline">Go back</button>
            </div>
          )}
        </motion.div>
      )}

      {step === 3 && publishedArticle && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6"
        >
          <div className="w-20 h-20 bg-success/20 text-success rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={40} />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold mb-2">Successfully Published</h2>
            <p className="text-text-2 mb-6">AI processing complete.</p>
          </div>

          <div className="w-full text-left bg-surface-2 p-6 rounded-xl space-y-4 mb-8">
            <div>
              <span className="text-text-2 text-sm">Predicted Category:</span>
              <p className="font-mono text-accent uppercase tracking-wider">{publishedArticle.category}</p>
            </div>
            <div>
              <span className="text-text-2 text-sm">Generated Abstract:</span>
              <p className="text-text-1">{publishedArticle.summary || 'No summary generated.'}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={reset} className="btn-ghost">Publish Another</button>
            <Link to={`/article/${publishedArticle._id}`} className="btn-primary" target="_blank">View Live Article</Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
