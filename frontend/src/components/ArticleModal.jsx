import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BrainCircuit, Share2 } from 'lucide-react';
import { useEffect } from 'react';

export default function ArticleModal({ article, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/article/${article._id}`);
    alert('Link copied to clipboard!');
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-bg/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-surface-1 border border-border rounded-2xl shadow-2xl overflow-y-auto"
        >
          {/* Header Controls */}
          <div className="sticky top-0 z-10 flex justify-between items-center p-4 sm:p-6 bg-bg/95 backdrop-blur-xl border-b border-border/50">
            <span className="font-mono text-sm text-accent uppercase tracking-wider">{article.category}</span>
            <div className="flex gap-2">
              <button onClick={handleShare} className="p-2 rounded-full text-text-2 hover:bg-surface-2 hover:text-cyan transition-colors">
                <Share2 size={18} />
              </button>
              <button onClick={onClose} className="p-2 rounded-full text-text-2 hover:bg-danger/20 hover:text-danger transition-colors group">
                <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
            <p className="text-text-2 mb-8 font-mono text-sm">Published: {new Date(article.createdAt).toLocaleString()}</p>

            {/* AI Abstract */}
            {article.summary && (
              <div className="bg-surface-2/50 border-l-4 border-accent rounded-r-xl p-6 mb-10">
                <div className="flex items-center gap-2 text-accent mb-3">
                  <BrainCircuit size={20} />
                  <h3 className="font-heading font-semibold text-lg">AI Abstract</h3>
                </div>
                <p className="text-text-1 text-lg leading-relaxed">{article.summary}</p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert max-w-none text-text-2 leading-loose whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
