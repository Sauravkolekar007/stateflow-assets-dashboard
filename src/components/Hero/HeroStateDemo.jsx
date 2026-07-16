import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '../../constants/categories.js'
import { generateAssetSvg } from '../../utils/generateAssetSvg.js'

const CYCLE = CATEGORIES.filter((c) => c.id !== 'all')
const VARIANT_BY_CATEGORY = {
  loading: 'spinner',
  waiting: 'hourglass',
  processing: 'progress',
  success: 'confetti',
  error: 'alert',
  'empty-state': 'ghost',
  'network-error': 'wifi',
}

export default function HeroStateDemo() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % CYCLE.length)
    }, 2200)
    return () => clearInterval(timer)
  }, [])

  const current = CYCLE[index]
  const svg = generateAssetSvg({
    category: current.id,
    color: current.color,
    variant: VARIANT_BY_CATEGORY[current.id],
    seed: index,
    title: current.label,
  })

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative rounded-3xl card-surface p-2 overflow-hidden">
        <div className="rounded-2xl overflow-hidden aspect-[4/3] relative" style={{ backgroundColor: `${current.color}0D` }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between px-3 py-3">
          <span className="text-xs font-mono text-muted dark:text-muted-dark">
            app.state ={' '}
            <span className="font-semibold" style={{ color: current.color }}>
              {current.id.replace('-', '_')}
            </span>
          </span>
          <div className="flex items-center gap-1">
            {CYCLE.map((c, i) => (
              <span
                key={c.id}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: i === index ? current.color : 'currentColor',
                  opacity: i === index ? 1 : 0.15,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted dark:text-muted-dark mt-3">
        Every state your app can be in — one asset library.
      </p>
    </div>
  )
}
