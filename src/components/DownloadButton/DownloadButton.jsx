import { useState } from 'react'
import { FiDownload, FiCheck } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { downloadAsset } from '../../utils/download.js'
import { useRecent } from '../../context/RecentContext.jsx'

export default function DownloadButton({ asset, variant = 'icon', className = '' }) {
  const [status, setStatus] = useState('idle') // idle | downloading | done
  const { addDownloaded } = useRecent()

  const handleDownload = async (e) => {
    e.stopPropagation()
    if (status !== 'idle') return
    setStatus('downloading')
    // Simulate a brief, realistic download delay so the UI state is visible
    await new Promise((r) => setTimeout(r, 700))
    downloadAsset(asset)
    addDownloaded(asset.id)
    setStatus('done')
    toast.success(`${asset.title} downloaded`)
    setTimeout(() => setStatus('idle'), 1600)
  }

  if (variant === 'full') {
    return (
      <button
        onClick={handleDownload}
        disabled={status === 'downloading'}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-white bg-accent hover:bg-accent-dark disabled:opacity-70 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === 'idle' && (
            <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FiDownload size={16} /> Download Asset
            </motion.span>
          )}
          {status === 'downloading' && (
            <motion.span key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spinSlow" style={{ animationDuration: '0.7s' }} />
              Downloading…
            </motion.span>
          )}
          {status === 'done' && (
            <motion.span key="done" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FiCheck size={16} /> Downloaded
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    )
  }

  return (
    <button
      onClick={handleDownload}
      disabled={status === 'downloading'}
      aria-label={`Download ${asset.title}`}
      className={`p-2 rounded-full bg-black/5 dark:bg-white/10 text-muted dark:text-muted-dark hover:text-accent disabled:opacity-60 transition-colors ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === 'idle' && (
          <motion.span key="idle" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} className="block">
            <FiDownload size={16} />
          </motion.span>
        )}
        {status === 'downloading' && (
          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="block w-4 h-4 rounded-full border-2 border-accent/30 border-t-accent animate-spinSlow" style={{ animationDuration: '0.7s' }} />
        )}
        {status === 'done' && (
          <motion.span key="done" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} className="block text-state-success">
            <FiCheck size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
