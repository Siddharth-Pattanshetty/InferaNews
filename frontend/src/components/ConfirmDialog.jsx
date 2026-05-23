import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', isDestructive = false }) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
          onClick={onCancel}
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md bg-surface-1 border border-border rounded-2xl shadow-2xl p-6"
        >
          <h2 className="font-heading text-xl font-bold text-text-1 mb-2">{title}</h2>
          <p className="text-text-2 mb-8">{message}</p>

          <div className="flex justify-end gap-3">
            <button 
              onClick={onCancel}
              className="px-4 py-2 rounded-lg font-medium text-text-2 hover:bg-surface-2 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDestructive 
                  ? 'bg-danger text-white hover:bg-red-600' 
                  : 'bg-accent text-white hover:bg-purple-600'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
