import { motion } from 'framer-motion'
import { CATEGORIES } from '../../constants/categories.js'

export default function CategoryTabs({ active, onSelect, counts }) {
  return (
    <div className="lg:hidden -mx-4 px-4 overflow-x-auto pb-1">
      <div className="flex gap-2 w-max" role="tablist" aria-label="Asset categories">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(cat.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                isActive
                  ? 'border-transparent text-white'
                  : 'border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-active"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
              <span className="relative">
                {cat.label} {counts?.[cat.id] ? `· ${counts[cat.id]}` : ''}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
