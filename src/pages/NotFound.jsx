import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { generateAssetSvg } from '../utils/generateAssetSvg.js'

const svg = generateAssetSvg({
  category: 'empty-state',
  color: '#9B9BAB',
  variant: 'ghost',
  seed: 3,
  title: '404',
})

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl overflow-hidden mb-8 aspect-[4/3]"
        style={{ backgroundColor: '#9B9BAB0D' }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <h1 className="font-display font-extrabold text-3xl mb-2">Page not found</h1>
      <p className="text-muted dark:text-muted-dark mb-8">
        This route doesn&rsquo;t exist — maybe it was moved, or the link was mistyped.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors"
      >
        <FiArrowLeft size={16} /> Back to dashboard
      </Link>
    </div>
  )
}
