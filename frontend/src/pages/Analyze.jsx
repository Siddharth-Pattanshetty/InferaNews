import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/axios';
import Skeleton from '../components/Skeleton';
import { BrainCircuit, Sparkles, Network, ArrowRight } from 'lucide-react';

export default function Analyze() {
  const [text, setText] = useState('');
  
  const summarizeMutation = useMutation({
    mutationFn: (inputText) => api.post('/ml/public/summarize', { text: inputText })
  });

  const similarMutation = useMutation({
    mutationFn: (inputText) => api.post('/ml/public/similar', { 
      headline: inputText.substring(0, 100), 
      short_description: inputText.substring(100, 500) 
    })
  });

  const handleAnalyze = () => {
    if (text.length < 50) return;
    summarizeMutation.mutate(text);
    similarMutation.mutate(text);
  };

  const isAnalyzing = summarizeMutation.isPending || similarMutation.isPending;
  const hasResults = summarizeMutation.isSuccess || similarMutation.isSuccess;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)] min-h-[600px]">
      
      {/* Left Pane: Input */}
      <div className="flex flex-col bg-surface border border-border rounded-sm p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <BrainCircuit className="text-accent" size={24} />
          <h2 className="text-2xl font-heading font-bold">Intelligence Analyzer</h2>
        </div>
        
        <p className="text-text-secondary mb-6 text-sm">
          Paste a raw news article or press release below. Our ML models will generate an abstractive summary and find related narratives from our database.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste article text here... (minimum 50 characters)"
          className="flex-1 input-standard resize-none mb-4 font-body leading-relaxed"
        />

        <div className="flex items-center justify-between mt-auto">
          <span className={`text-xs font-medium ${text.length > 5000 ? 'text-red-500' : 'text-text-tertiary'}`}>
            {text.length} / 5000 characters
          </span>
          
          <button
            onClick={handleAnalyze}
            disabled={text.length < 50 || text.length > 5000 || isAnalyzing}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Text'} <ArrowRight size={16} />
          </button>
        </div>
        
        {summarizeMutation.isError && (
          <p className="text-red-500 text-sm mt-4 bg-red-50 p-3 rounded-sm border border-red-100">
            {summarizeMutation.error.message || 'Analysis failed. Please check length requirements.'}
          </p>
        )}
      </div>

      {/* Right Pane: Output */}
      <div className="flex flex-col bg-bg-primary border border-border rounded-sm p-6 overflow-y-auto shadow-inner relative">
        
        {!isAnalyzing && !hasResults && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-text-tertiary">
            <Sparkles size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Waiting for input...</p>
          </div>
        )}

        {/* Summary Section */}
        {(isAnalyzing || summarizeMutation.isSuccess) && (
          <div className="mb-10">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-accent">
              <Sparkles size={18} /> AI Generated Summary
            </h3>
            
            {summarizeMutation.isPending ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : (
              <div className="bg-surface p-5 border-l-4 border-accent rounded-r-sm shadow-sm">
                <p className="text-lg leading-relaxed font-heading text-text-primary">
                  {summarizeMutation.data?.summary}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Similar Articles Section */}
        {(isAnalyzing || similarMutation.isSuccess) && (
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-text-secondary">
              <Network size={18} /> Related Narratives
            </h3>
            
            {similarMutation.isPending ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {similarMutation.data?.results?.map((item, i) => (
                  <div key={i} className="bg-surface p-4 border border-border rounded-sm hover:border-gray-300 transition-colors">
                    <p className="font-medium text-text-primary mb-2 line-clamp-2">
                      {item.text}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="badge-category text-[10px]">Distance: {item.distance.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
