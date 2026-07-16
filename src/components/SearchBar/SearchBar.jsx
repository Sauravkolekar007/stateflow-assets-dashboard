import { FiSearch, FiX } from 'react-icons/fi'

export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, category, type, or tag…"
        aria-label="Search assets"
        className="w-full pl-11 pr-24 py-3.5 rounded-2xl card-surface text-sm sm:text-base outline-none focus-visible:ring-2 focus-visible:ring-accent placeholder:text-muted dark:placeholder:text-muted-dark"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="p-1.5 rounded-full text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-surface2 dark:hover:bg-surface2-dark"
          >
            <FiX size={16} />
          </button>
        )}
        <span className="hidden sm:inline text-xs text-muted dark:text-muted-dark pr-2 tabular-nums">
          {resultCount} result{resultCount === 1 ? '' : 's'}
        </span>
      </div>
    </div>
  )
}
