import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiShare2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import FavoriteButton from '../FavoriteButton/FavoriteButton.jsx'
import DownloadButton from '../DownloadButton/DownloadButton.jsx'
import LottiePreview from '../LottiePreview/LottiePreview.jsx'
import { useRecent } from '../../context/RecentContext.jsx'

export default function PreviewModal({ asset, onClose }) {
  const closeBtnRef = useRef(null)
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)
  const { addViewed } = useRecent()

  useEffect(() => {
    if (!asset) return
    addViewed(asset.id)

    // Remember what had focus before the modal opened (usually the card
    // that was clicked) so we can return focus there on close — without
    // this, keyboard/screen-reader users lose their place in the grid.
    previouslyFocused.current = document.activeElement
    closeBtnRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Basic focus trap: keep Tab/Shift+Tab cycling within the dialog
      // instead of escaping into the page behind the backdrop.
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused.current?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset])

  const handleShare = async () => {
    const url = `${window.location.origin}/?asset=${asset.id}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Could not copy link')
    }
  }

  if (!asset) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl card-surface"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
            <h2 id="preview-title" className="font-display font-semibold text-base">
              Asset Preview
            </h2>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close preview"
              className="p-2 rounded-full hover:bg-surface2 dark:hover:bg-surface2-dark transition-colors"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="p-6">
            <div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-6"
              style={{ backgroundColor: `${asset.color}0D` }}
            >
              {asset.kind === 'lottie' ? (
                <LottiePreview data={asset.lottieData} />
              ) : (
                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: asset.svg }} />
              )}
              <span
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
                style={{ backgroundColor: asset.color }}
              >
                {asset.categoryLabel}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-display font-semibold text-xl">{asset.title}</h3>
                <p className="text-sm text-muted dark:text-muted-dark mt-1">
                  Tags: {asset.tags.join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <FavoriteButton assetId={asset.id} title={asset.title} />
                <button
                  onClick={handleShare}
                  aria-label="Copy share link"
                  className="p-2 rounded-full bg-black/5 dark:bg-white/10 text-muted dark:text-muted-dark hover:text-accent transition-colors"
                >
                  <FiShare2 size={16} />
                </button>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-3 mb-6 text-sm">
              <div className="rounded-xl bg-surface2 dark:bg-surface2-dark p-3">
                <dt className="text-xs text-muted dark:text-muted-dark mb-0.5">File Type</dt>
                <dd className="font-medium">{asset.type}</dd>
              </div>
              <div className="rounded-xl bg-surface2 dark:bg-surface2-dark p-3">
                <dt className="text-xs text-muted dark:text-muted-dark mb-0.5">Resolution</dt>
                <dd className="font-medium">{asset.resolution}</dd>
              </div>
              <div className="rounded-xl bg-surface2 dark:bg-surface2-dark p-3">
                <dt className="text-xs text-muted dark:text-muted-dark mb-0.5">File Size</dt>
                <dd className="font-medium">{asset.fileSize}</dd>
              </div>
            </dl>

            <DownloadButton asset={asset} variant="full" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
