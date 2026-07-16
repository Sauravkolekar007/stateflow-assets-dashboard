// Generates fully self-contained, dependency-free SVG illustrations.
// Every asset in the catalog is a real downloadable file produced by this
// function — no external image hosts are required, so previews and
// downloads work completely offline.

const VARIANT_BUILDERS = {
  spinner: (c, s) => `
    <circle cx="200" cy="150" r="46" fill="none" stroke="${c.soft}" stroke-width="10"/>
    <path class="${s}-spin" d="M200 104 a46 46 0 0 1 46 46" fill="none" stroke="${c.main}" stroke-width="10" stroke-linecap="round"/>
  `,
  hourglass: (c) => `
    <path d="M170 90h60l-4 8c-4 30-20 40-26 42 6 2 22 12 26 42l4 8h-60l4-8c4-30 20-40 26-42-6-2-22-12-26-42z" fill="${c.soft}" stroke="${c.main}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="164" y="84" width="72" height="10" rx="4" fill="${c.main}"/>
    <rect x="164" y="186" width="72" height="10" rx="4" fill="${c.main}"/>
  `,
  progress: (c, s, seed = 0) => {
    const fillWidth = 70 + ((seed * 31) % 100)
    return `
    <rect x="110" y="140" width="180" height="20" rx="10" fill="${c.soft}"/>
    <rect class="${s}-fill" x="110" y="140" width="${fillWidth}" height="20" rx="10" fill="${c.main}"/>
    <circle cx="${110 + fillWidth}" cy="150" r="14" fill="${c.dark}"/>
  `
  },
  check: (c) => `
    <circle cx="200" cy="150" r="54" fill="${c.soft}"/>
    <path d="M172 152l20 20 40-46" fill="none" stroke="${c.main}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  confetti: (c, s) => `
    <circle cx="200" cy="150" r="50" fill="${c.soft}"/>
    <path d="M178 152l16 16 34-38" fill="none" stroke="${c.main}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <rect class="${s}-c1" x="120" y="90" width="10" height="10" rx="2" fill="${c.main}" transform="rotate(20 125 95)"/>
    <rect class="${s}-c2" x="270" y="100" width="10" height="10" rx="2" fill="${c.dark}" transform="rotate(-15 275 105)"/>
    <circle class="${s}-c3" cx="130" cy="200" r="6" fill="${c.dark}"/>
    <circle class="${s}-c1" cx="278" cy="196" r="6" fill="${c.main}"/>
  `,
  cross: (c) => `
    <circle cx="200" cy="150" r="54" fill="${c.soft}"/>
    <path d="M180 130l40 40M220 130l-40 40" stroke="${c.main}" stroke-width="10" stroke-linecap="round"/>
  `,
  alert: (c) => `
    <path d="M200 92l70 122h-140z" fill="${c.soft}" stroke="${c.main}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="195" y="130" width="10" height="46" rx="4" fill="${c.main}"/>
    <circle cx="200" cy="196" r="6" fill="${c.main}"/>
  `,
  cloudOff: (c) => `
    <path d="M140 176a34 34 0 0 1 8-67 44 44 0 0 1 84 12 30 30 0 0 1-4 60h-72a26 26 0 0 1-16-5z" fill="${c.soft}" stroke="${c.main}" stroke-width="6"/>
    <path d="M140 116l120 68" stroke="${c.main}" stroke-width="8" stroke-linecap="round"/>
  `,
  plug: (c, s) => `
    <rect x="150" y="120" width="20" height="40" rx="6" fill="${c.main}"/>
    <rect x="230" y="120" width="20" height="40" rx="6" fill="${c.main}"/>
    <path d="M160 160v14a40 40 0 0 0 80 0v-14" fill="none" stroke="${c.main}" stroke-width="10" stroke-linecap="round"/>
    <line class="${s}-spark" x1="200" y1="214" x2="200" y2="238" stroke="${c.dark}" stroke-width="8" stroke-linecap="round"/>
  `,
  inbox: (c) => `
    <path d="M120 140h50l14 26h32l14-26h50v70a10 10 0 0 1-10 10H130a10 10 0 0 1-10-10z" fill="${c.soft}" stroke="${c.main}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M120 140l24-46h112l24 46" fill="none" stroke="${c.main}" stroke-width="6" stroke-linejoin="round"/>
  `,
  search: (c) => `
    <circle cx="188" cy="140" r="38" fill="${c.soft}" stroke="${c.main}" stroke-width="8"/>
    <line x1="214" y1="166" x2="252" y2="204" stroke="${c.main}" stroke-width="10" stroke-linecap="round"/>
  `,
  ghost: (c) => `
    <path d="M160 200v-46a40 40 0 0 1 80 0v46l-14-12-13 12-13-12-13 12-14-12z" fill="${c.soft}" stroke="${c.main}" stroke-width="6" stroke-linejoin="round"/>
    <circle cx="186" cy="150" r="5" fill="${c.main}"/>
    <circle cx="214" cy="150" r="5" fill="${c.main}"/>
  `,
  dots: (c, s) => `
    <circle class="${s}-d1" cx="160" cy="150" r="12" fill="${c.main}" style="opacity:.5"/>
    <circle class="${s}-d2" cx="200" cy="150" r="12" fill="${c.main}" style="opacity:.75"/>
    <circle class="${s}-d3" cx="240" cy="150" r="12" fill="${c.main}"/>
  `,
  wifi: (c, s) => `
    <path class="${s}-wave" d="M140 168a86 86 0 0 1 120 0" fill="none" stroke="${c.soft}" stroke-width="10" stroke-linecap="round"/>
    <path d="M160 190a56 56 0 0 1 80 0" fill="none" stroke="${c.main}" stroke-width="10" stroke-linecap="round"/>
    <line x1="140" y1="120" x2="260" y2="200" stroke="${c.dark}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="200" cy="210" r="7" fill="${c.main}"/>
  `,
}

const BADGE_TAG = {
  loading: 'LOADING', waiting: 'WAITING', processing: 'PROCESSING',
  success: 'SUCCESS', error: 'ERROR', 'empty-state': 'EMPTY', 'network-error': 'OFFLINE',
}

// Per-variant CSS keyframes, scoped to a unique class per asset so many
// inlined SVGs on one page never collide (each gets its own animation name).
// This is what actually makes "Animated SVG" assets move — earlier drafts
// used this label on static markup, which was misleading.
function buildAnimationStyle(variant, scope) {
  const rules = {
    spinner: `
      .${scope}-spin { transform-origin: 200px 150px; animation: ${scope}-rot 1s linear infinite; }
      @keyframes ${scope}-rot { to { transform: rotate(360deg); } }`,
    dots: `
      .${scope}-d1 { animation: ${scope}-bounce 1s ease-in-out infinite; }
      .${scope}-d2 { animation: ${scope}-bounce 1s ease-in-out 0.15s infinite; }
      .${scope}-d3 { animation: ${scope}-bounce 1s ease-in-out 0.3s infinite; }
      @keyframes ${scope}-bounce { 0%, 80%, 100% { transform: translateY(0); opacity: 0.5; } 40% { transform: translateY(-10px); opacity: 1; } }`,
    progress: `
      .${scope}-fill { animation: ${scope}-grow 1.8s ease-in-out infinite; transform-origin: left; }
      @keyframes ${scope}-grow { 0% { transform: scaleX(0.2); } 50% { transform: scaleX(1); } 100% { transform: scaleX(0.2); } }`,
    confetti: `
      .${scope}-c1, .${scope}-c2, .${scope}-c3 { animation: ${scope}-float 1.6s ease-in-out infinite; }
      .${scope}-c2 { animation-delay: 0.2s; } .${scope}-c3 { animation-delay: 0.4s; }
      @keyframes ${scope}-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(12deg); } }`,
    plug: `
      .${scope}-spark { animation: ${scope}-blink 1.2s steps(1) infinite; }
      @keyframes ${scope}-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.15; } }`,
    wifi: `
      .${scope}-wave { animation: ${scope}-pulse 1.4s ease-in-out infinite; }
      @keyframes ${scope}-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`,
  }
  return rules[variant] ? `<style>${rules[variant]}</style>` : ''
}

/**
 * Build a "meme" style asset: an oversized caption in a bold display font
 * over a small supporting illustration. Captions are original dev-humor
 * lines written for this project — not reproductions of existing memes,
 * to stay clear of copyrighted meme templates/images.
 */
export function generateMemeSvg({ category, color, variant, seed = 0, caption, title = '' }) {
  const c = { main: color, soft: hexToRgba(color, 0.18), dark: color }
  const builder = VARIANT_BUILDERS[variant] || VARIANT_BUILDERS.dots
  const bgId = `meme-bg-${category}-${seed}`

  const words = caption.split(' ')
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > 22) {
      lines.push(line.trim())
      line = w
    } else {
      line = (line + ' ' + w).trim()
    }
  }
  if (line) lines.push(line)

  const textLines = lines
    .map((l, i) => `<tspan x="200" dy="${i === 0 ? 0 : 24}">${l}</tspan>`)
    .join('')

  const svg = `
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="${bgId}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${hexToRgba(color, 0.14)}"/>
      <stop offset="100%" stop-color="${hexToRgba(color, 0.03)}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="24" fill="url(#${bgId})"/>
  <rect x="0.5" y="0.5" width="399" height="299" rx="24" fill="none" stroke="${hexToRgba(color, 0.16)}" stroke-width="1"/>
  <g transform="translate(90,27.5) scale(0.55)">
    ${builder(c, `meme-${category}-${seed}`, seed)}
  </g>
  <text x="200" y="228" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="19" fill="${c.dark}">${textLines}</text>
  <text x="24" y="272" font-family="monospace" font-size="12" fill="${hexToRgba(color, 0.6)}" letter-spacing="1.5">${BADGE_TAG[category] || 'ASSET'} · MEME</text>
</svg>`.trim()

  return svg
}

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

/**
 * Build a complete SVG illustration string for one asset.
 * @param {{category:string,color:string,variant:string,seed:number,title:string,animated?:boolean}} opts
 */
export function generateAssetSvg({ category, color, variant, seed = 0, title = '', animated = false }) {
  const c = {
    main: color,
    soft: hexToRgba(color, 0.18),
    dark: color,
  }
  const builder = VARIANT_BUILDERS[variant] || VARIANT_BUILDERS.dots
  const bgId = `bg-${category}-${seed}`
  const scope = `sf-${category}-${seed}`
  const angle = 45 + (seed * 17) % 90
  const style = animated ? buildAnimationStyle(variant, scope) : ''

  const svg = `
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
  ${style}
  <defs>
    <linearGradient id="${bgId}" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${hexToRgba(color, 0.10)}"/>
      <stop offset="100%" stop-color="${hexToRgba(color, 0.02)}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="24" fill="url(#${bgId})"/>
  <rect x="0.5" y="0.5" width="399" height="299" rx="24" fill="none" stroke="${hexToRgba(color, 0.16)}" stroke-width="1"/>
  ${builder(c, scope, seed)}
  <text x="24" y="272" font-family="monospace" font-size="12" fill="${hexToRgba(color, 0.6)}" letter-spacing="1.5">${BADGE_TAG[category] || 'ASSET'}${animated ? ' · LIVE' : ''}</text>
</svg>`.trim()

  return svg
}

export function svgToDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
