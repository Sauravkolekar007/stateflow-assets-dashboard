import { memo } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiShare2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx'
import DownloadButton from '../DownloadButton/DownloadButton.jsx'
import LottiePreview from '../LottiePreview/LottiePreview.jsx'

function AssetCard({ asset, onPreview, index = 0 }) {
  const handleShare = async (e) => {
    e.stopPropagation()
    const url = `${window.location.origin}/?asset=${asset.id}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Could not copy link')
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -4 }}
      onClick={() => onPreview(asset)}
      className="group cursor-pointer rounded-2xl card-surface overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-accent"
      tabIndex={0}
      role="button"
      aria-label={`Preview ${asset.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter') onPreview(asset) }}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: `${asset.color}0D` }}
      >
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
          {asset.kind === 'lottie' ? (
            <LottiePreview data={asset.lottieData} />
          ) : (
            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: asset.svg }} />
          )}
        </div>
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm"
          style={{ backgroundColor: asset.color }}
        >
          {asset.categoryLabel}
        </span>
        <FavoriteButton asset={asset} assetId={asset.id} title={asset.title} className="absolute top-3 right-3" />

        {/* Hover overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onPreview(asset) }}
            aria-label={`Quick preview ${asset.title}`}
            className="p-2.5 rounded-full bg-white/90 text-ink hover:bg-white transition-colors"
          >
            <FiEye size={16} />
          </button>
          <button
            onClick={handleShare}
            aria-label={`Copy link to ${asset.title}`}
            className="p-2.5 rounded-full bg-white/90 text-ink hover:bg-white transition-colors"
          >
            <FiShare2 size={16} />
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-medium text-sm truncate">{asset.title}</h3>
          <p className="text-xs text-muted dark:text-muted-dark mt-0.5">
            {asset.type} · {asset.resolution}
          </p>
        </div>
        <DownloadButton asset={asset} />
      </div>
    </motion.article>
  )
}

export default memo(AssetCard)
