import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import CategoryTabs from '../components/CategoryTabs/CategoryTabs.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import AssetGrid from '../components/AssetGrid/AssetGrid.jsx'
import StatsSection from '../components/Stats/StatsSection.jsx'
import PreviewModal from '../components/PreviewModal/PreviewModal.jsx'
import HeroStateDemo from '../components/Hero/HeroStateDemo.jsx'
import { ASSETS, getAssetById } from '../data/assets.js'
import { CATEGORIES } from '../constants/categories.js'
import { useDebounce } from '../hooks/useDebounce.js'

export default function Dashboard() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('cat') || 'all')
  const [loading, setLoading] = useState(true)
  const [previewAsset, setPreviewAsset] = useState(null)
  const debouncedQuery = useDebounce(query, 250)

  // Simulate a brief initial load so skeletons have a purpose (also lets
  // real fonts/theme settle before content paints).
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  // Keep URL query params in sync with UI state (shareable/bookmarkable search)
  useEffect(() => {
    const next = {}
    if (debouncedQuery) next.q = debouncedQuery
    if (category !== 'all') next.cat = category
    setParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, category])

  // Sync from URL when navigated externally (e.g. Navbar quick search)
  useEffect(() => {
    const q = params.get('q') || ''
    if (q !== query) setQuery(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  // Open preview if a direct asset link was shared
  useEffect(() => {
    const assetId = params.get('asset')
    if (assetId) {
      const found = getAssetById(assetId)
      if (found) setPreviewAsset(found)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    return ASSETS.filter((asset) => {
      const matchesCategory = category === 'all' || asset.category === category
      if (!matchesCategory) return false
      if (!q) return true
      return (
        asset.title.toLowerCase().includes(q) ||
        asset.categoryLabel.toLowerCase().includes(q) ||
        asset.type.toLowerCase().includes(q) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    })
  }, [debouncedQuery, category])

  const counts = useMemo(() => {
    const c = { all: ASSETS.length }
    for (const cat of CATEGORIES) {
      if (cat.id === 'all') continue
      c[cat.id] = ASSETS.filter((a) => a.category === cat.id).length
    }
    return c
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 gap-10 items-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
            7 app states · {ASSETS.length} free assets
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-4">
            Assets for every
            <br />
            state your app hits.
          </h1>
          <p className="text-muted dark:text-muted-dark text-base sm:text-lg max-w-md mb-6">
            Search, preview, favorite, and download illustrations and animations
            for loading, error, empty, and success states — built for developers
            who ship fast.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#dashboard-grid"
              className="px-5 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors"
            >
              Browse the library
            </a>
            <a
              href="#dashboard-grid"
              onClick={() => setCategory('all')}
              className="px-5 py-3 rounded-xl card-surface text-sm font-semibold hover:border-accent/50 transition-colors"
            >
              View all categories
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HeroStateDemo />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mb-10">
        <StatsSection
          totalAssets={ASSETS.length}
          categoryCount={CATEGORIES.length - 1}
          resultCount={filtered.length}
        />
      </section>

      {/* Toolbar */}
      <section id="dashboard-grid" className="scroll-mt-24 mb-6">
        <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />
        <div className="mt-4">
          <CategoryTabs active={category} onSelect={setCategory} counts={counts} />
        </div>
      </section>

      {/* Content */}
      <section className="flex gap-8 items-start">
        <Sidebar active={category} onSelect={setCategory} counts={counts} />
        <div className="flex-1 min-w-0">
          <AssetGrid assets={filtered} onPreview={setPreviewAsset} loading={loading} />
        </div>
      </section>

      <PreviewModal asset={previewAsset} onClose={() => setPreviewAsset(null)} />
    </div>
  )
}
