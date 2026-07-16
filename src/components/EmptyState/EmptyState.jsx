import { motion } from 'framer-motion'

export default function EmptyState({
  title = 'No assets match your search',
  subtitle = 'Try a different keyword, or clear filters to see everything.',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <svg width="180" height="140" viewBox="0 0 200 160" className="mb-6 animate-floatY">
        <ellipse cx="100" cy="140" rx="60" ry="10" fill="currentColor" className="text-surface2 dark:text-surface2-dark" />
        <circle cx="90" cy="70" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-accent/40" />
        <line x1="120" y1="100" x2="150" y2="130" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-accent/70" />
        <circle cx="78" cy="64" r="4" fill="currentColor" className="text-accent" />
        <circle cx="102" cy="64" r="4" fill="currentColor" className="text-accent" />
        <path d="M76 82q14 10 28 0" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" className="text-accent" />
      </svg>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted dark:text-muted-dark mt-1 max-w-xs">{subtitle}</p>
    </motion.div>
  )
}
