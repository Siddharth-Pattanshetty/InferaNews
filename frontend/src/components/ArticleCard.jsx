import { motion } from 'framer-motion';

export default function ArticleCard({ article, onClick }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 flex flex-col h-full cursor-pointer group"
      onClick={() => onClick(article)}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-xs text-accent uppercase tracking-wider">{article.category}</span>
        <span className="text-xs text-text-2">{new Date(article.createdAt).toLocaleDateString()}</span>
      </div>
      <h3 className="font-heading text-xl font-bold mb-3 text-text-1 group-hover:text-cyan transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-text-2 text-sm line-clamp-3 mb-6 flex-1">
        {article.description}
      </p>
      <div className="mt-auto flex justify-end">
        <span className="text-sm font-medium text-accent opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Read Insight →
        </span>
      </div>
    </motion.div>
  );
}
