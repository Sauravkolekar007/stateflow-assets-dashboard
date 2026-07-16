import { useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiHeart, FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useFavorites } from '../../context/FavoritesContext.jsx'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { favorites } = useFavorites()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const handleQuickSearch = (e) => {
    const q = e.target.value
    navigate(q ? `/?q=${encodeURIComponent(q)}` : '/')
  }

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="StateFlow home">
          <span className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center shadow-glow">
            <span className="w-3 h-3 rounded-full bg-white/90 group-hover:animate-floatY" />
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight hidden sm:inline">
            StateFlow
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-accent bg-accent/10' : 'text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-accent bg-accent/10' : 'text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark'}`
            }
          >
            Favorites
          </NavLink>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Quick search (desktop) */}
          <div className="hidden sm:flex items-center relative">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  autoFocus
                  defaultValue={params.get('q') || ''}
                  onChange={handleQuickSearch}
                  onBlur={() => setSearchOpen(false)}
                  placeholder="Search assets…"
                  aria-label="Search assets"
                  className="mr-2 px-3 py-2 rounded-lg text-sm bg-surface2 dark:bg-surface2-dark border border-border dark:border-border-dark outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Toggle search"
              className="p-2 rounded-lg text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-surface2 dark:hover:bg-surface2-dark transition-colors"
            >
              <FiSearch size={18} />
            </button>
          </div>

          {/* Favorites */}
          <Link
            to="/favorites"
            aria-label={`Favorites (${favorites.length})`}
            className="relative p-2 rounded-lg text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-surface2 dark:hover:bg-surface2-dark transition-colors"
          >
            <FiHeart size={18} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-accent text-white text-[10px] leading-4 text-center font-semibold">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-surface2 dark:hover:bg-surface2-dark transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-muted dark:text-muted-dark hover:bg-surface2 dark:hover:bg-surface2-dark"
          >
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border dark:border-border-dark"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              <input
                type="text"
                defaultValue={params.get('q') || ''}
                onChange={handleQuickSearch}
                placeholder="Search assets…"
                aria-label="Search assets"
                className="mb-2 px-3 py-2 rounded-lg text-sm bg-surface2 dark:bg-surface2-dark border border-border dark:border-border-dark outline-none"
              />
              <NavLink onClick={() => setMobileOpen(false)} to="/" end className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface2 dark:hover:bg-surface2-dark">
                Dashboard
              </NavLink>
              <NavLink onClick={() => setMobileOpen(false)} to="/favorites" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface2 dark:hover:bg-surface2-dark">
                Favorites
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
