import { CATEGORIES } from '../../constants/categories.js'
import { motion } from 'framer-motion'

export default function Sidebar({ active, onSelect, counts }) {
  return (
    <aside className="hidden lg:block w-60 shrink-0">
      <div className="sticky top-24 card-surface rounded-2xl p-3">
        <p className="px-3 pt-2 pb-3 text-xs font-semibold uppercase tracking-wider text-muted dark:text-muted-dark">
          Categories
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="Asset categories">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                aria-current={isActive}
                className={`relative w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-ink dark:text-ink-dark'
                    : 'text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-surface2 dark:bg-surface2-dark"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative flex items-center gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.label}
                </span>
                <span className="relative text-xs text-muted dark:text-muted-dark tabular-nums">
                  {counts?.[cat.id] ?? ''}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
