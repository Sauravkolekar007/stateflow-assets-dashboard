import { FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-border-dark mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
          </span>
          <span className="font-display font-bold text-sm">StateFlow</span>
          <span className="text-xs text-muted dark:text-muted-dark hidden sm:inline">
            — assets for every app state
          </span>
        </div>

        <p className="text-xs text-muted dark:text-muted-dark flex items-center gap-1.5 order-3 sm:order-2">
          Built with <FiHeart className="text-red-500" size={12} /> as a frontend internship submission
        </p>

        <div className="flex items-center gap-3 order-2 sm:order-3">
          <a
            href="https://github.com/Sauravkolekar007"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-surface2 dark:hover:bg-surface2-dark transition-colors"
          >
            <FiGithub size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-kolekar-623bb61b5?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-lg text-muted dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-surface2 dark:hover:bg-surface2-dark transition-colors"
          >
            <FiLinkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
