import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export default function Skeleton({ className, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={twMerge('bg-surface-2 animate-pulse rounded-xl', className)}
      {...props}
    />
  );
}
