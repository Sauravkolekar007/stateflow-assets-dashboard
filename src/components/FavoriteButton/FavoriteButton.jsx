import { FiHeart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useFavorites } from '../../context/FavoritesContext.jsx'

export default function FavoriteButton({ assetId, title, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(assetId)

  const handleClick = (e) => {
    e.stopPropagation()
    toggleFavorite(assetId)
    toast(active ? `Removed "${title}" from favorites` : `Added "${title}" to favorites`, {
      icon: active ? '💔' : '❤️',
    })
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
        active
          ? 'bg-red-500/15 text-red-500'
          : 'bg-black/5 dark:bg-white/10 text-muted dark:text-muted-dark hover:text-red-500'
      } ${className}`}
    >
      <motion.span
        key={active ? 'on' : 'off'}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.4 }}
        className="block"
      >
        <FiHeart size={16} fill={active ? 'currentColor' : 'none'} />
      </motion.span>
    </button>
  )
}
