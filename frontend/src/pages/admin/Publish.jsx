import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';
import { Send, Cpu, CheckCircle } from 'lucide-react';

export default function Publish() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  
  const navigate = useNavigate();

  const publishMutation = useMutation({
    mutationFn: (articleData) => api.post('/articles', articleData),
    onSuccess: () => {
      // Small delay to let the user see the success state
      setTimeout(() => navigate('/admin/archive'), 1500);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    publishMutation.mutate({ title, description, content });
  };

  return (
    <div className="max-w-4xl">
      
      <div className="bg-surface border border-border rounded-sm shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-gray-50 flex items-center justify-between">
          <h2 className="font-bold text-text-primary">Intelligence Publishing Engine</h2>
          <span className="badge-ai">Automated ML Pipeline</span>
        </div>

        <div className="p-6">
          {publishMutation.isSuccess ? (
            <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
              <CheckCircle size={64} className="mb-4" />
              <h3 className="text-2xl font-bold mb-2">Publishing Complete</h3>
              <p className="text-text-secondary">Article has been categorized, summarized, and indexed.</p>
              <p className="text-sm mt-4 text-text-tertiary">Redirecting to archive...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-sm text-sm text-blue-800 mb-6 flex gap-3">
                <Cpu size={20} className="shrink-0" />
                <p>
                  <strong>Note:</strong> You only need to provide the raw content. The ML microservice will automatically assign the appropriate category and generate an abstractive summary upon submission.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-standard font-heading text-lg"
                  placeholder="Enter a compelling headline..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Short Description</label>
                <textarea
                  required
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-standard resize-none"
                  placeholder="Brief context or subheadline..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Raw Content</label>
                <textarea
                  required
                  rows="15"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="input-standard font-body leading-relaxed"
                  placeholder="Paste the full article text here. The AI will summarize this."
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={publishMutation.isPending || !title || !description || !content}
                  className="btn-primary flex items-center gap-2"
                >
                  {publishMutation.isPending ? (
                    <>
                      <Cpu className="animate-pulse" size={18} />
                      Processing Intelligence...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Publish & Analyze
                    </>
                  )}
                </button>
              </div>
              
              {publishMutation.isError && (
                <div className="text-red-500 text-sm mt-2 text-right">
                  Error: {publishMutation.error.message || 'Failed to publish'}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
