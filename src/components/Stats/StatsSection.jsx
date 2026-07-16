import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    startRef.current = null
    let raf
    const step = (ts) => {
      if (startRef.current === null) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

function Stat({ label, value }) {
  const count = useCountUp(value)
  return (
    <div className="text-center px-4">
      <p className="font-display font-extrabold text-3xl sm:text-4xl tabular-nums bg-gradient-to-br from-accent to-cyan bg-clip-text text-transparent">
        {count}
      </p>
      <p className="text-xs sm:text-sm text-muted dark:text-muted-dark mt-1">{label}</p>
    </div>
  )
}

export default function StatsSection({ totalAssets, categoryCount, resultCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex items-center justify-center gap-4 sm:gap-10 flex-wrap card-surface rounded-2xl px-6 py-5"
    >
      <Stat label="Total Assets" value={totalAssets} />
      <div className="hidden sm:block w-px h-10 bg-border dark:bg-border-dark" />
      <Stat label="Categories" value={categoryCount} />
      <div className="hidden sm:block w-px h-10 bg-border dark:bg-border-dark" />
      <Stat label="Matching Now" value={resultCount} />
    </motion.div>
  )
}
