import { useEffect, useRef, useState } from 'react'

/**
 * Renders a genuine Lottie (Bodymovin) animation using lottie-web.
 * Kept as its own component because it needs an imperative mount/unmount
 * cycle (lottie-web owns the DOM node it's given) rather than declarative
 * JSX like the SVG assets use.
 *
 * lottie-web is loaded with a dynamic import rather than a static one:
 * only 7 of the 56 assets in the catalog are Lottie files, so most visitors
 * never need its ~100KB (gzipped ~30KB) parser. Statically importing it
 * roughly doubled the main JS bundle in testing — this keeps it as its
 * own chunk that loads on demand instead.
 */
export default function LottiePreview({ data, className = '' }) {
  const containerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let anim
    let cancelled = false
    setReady(false)

    import('lottie-web').then(({ default: lottie }) => {
      if (cancelled || !containerRef.current || !data) return
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: data,
      })
      setReady(true)
    })

    return () => {
      cancelled = true
      anim?.destroy()
    }
  }, [data])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!ready && (
        <div className="absolute inset-0 skeleton rounded-2xl" aria-hidden="true" />
      )}
      <div ref={containerRef} className="w-full h-full" aria-hidden="true" />
    </div>
  )
}
