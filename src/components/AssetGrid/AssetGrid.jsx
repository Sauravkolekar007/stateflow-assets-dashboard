import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import AssetCard from '../AssetCard/AssetCard.jsx'
import SkeletonCard from '../SkeletonCard/SkeletonCard.jsx'
import EmptyState from '../EmptyState/EmptyState.jsx'

const PAGE_SIZE = 12

export default function AssetGrid({ assets, onPreview, loading }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef(null)

  // Reset pagination whenever the underlying filtered list changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [assets])

  const loadMore = useCallback(() => {
    setVisibleCount((v) => Math.min(v + PAGE_SIZE, assets.length))
  }, [assets.length])

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { rootMargin: '400px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [loadMore])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (assets.length === 0) {
    return <EmptyState />
  }

  const visible = assets.slice(0, visibleCount)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {visible.map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} onPreview={onPreview} index={i % PAGE_SIZE} />
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < assets.length && (
        <>
          <div ref={sentinelRef} className="h-1" />
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-5 py-2.5 rounded-xl text-sm font-medium card-surface hover:border-accent/50 transition-colors"
            >
              Load more assets ({assets.length - visibleCount} remaining)
            </button>
          </div>
        </>
      )}
    </div>
  )
}
