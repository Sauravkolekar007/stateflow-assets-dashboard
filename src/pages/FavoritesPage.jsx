import { useState } from 'react'
import { motion } from 'framer-motion'
import AssetGrid from '../components/AssetGrid/AssetGrid.jsx'
import PreviewModal from '../components/PreviewModal/PreviewModal.jsx'
import EmptyState from '../components/EmptyState/EmptyState.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useRecent } from '../context/RecentContext.jsx'
import { getAssetById } from '../data/assets.js'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { viewed, downloaded } = useRecent()
  const [previewAsset, setPreviewAsset] = useState(null)

  const favoriteAssets = favorites.map(getAssetById).filter(Boolean)
  const viewedAssets = viewed.map(getAssetById).filter(Boolean)
  const downloadedAssets = downloaded.map(getAssetById).filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">
          Your Favorites
        </h1>
        <p className="text-muted dark:text-muted-dark mb-10">
          Assets you&rsquo;ve bookmarked, plus what you&rsquo;ve recently viewed and downloaded.
        </p>
      </motion.div>

      <section className="mb-14">
        <h2 className="font-display font-semibold text-lg mb-4">
          Bookmarked ({favoriteAssets.length})
        </h2>
        {favoriteAssets.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            subtitle="Tap the heart icon on any asset to save it here for quick access."
          />
        ) : (
          <AssetGrid assets={favoriteAssets} onPreview={setPreviewAsset} loading={false} />
        )}
      </section>

      {viewedAssets.length > 0 && (
        <section className="mb-14">
          <h2 className="font-display font-semibold text-lg mb-4">Recently Viewed</h2>
          <AssetGrid assets={viewedAssets} onPreview={setPreviewAsset} loading={false} />
        </section>
      )}

      {downloadedAssets.length > 0 && (
        <section className="mb-14">
          <h2 className="font-display font-semibold text-lg mb-4">Recently Downloaded</h2>
          <AssetGrid assets={downloadedAssets} onPreview={setPreviewAsset} loading={false} />
        </section>
      )}

      <PreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />
    </div>
  )
}
