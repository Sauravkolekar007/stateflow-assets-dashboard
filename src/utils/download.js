/** Trigger a real browser download of an SVG asset as a .svg file. */
export function downloadSvg(svgString, filename) {
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.svg') ? filename : `${filename}.svg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/** Trigger a real browser download of a Lottie animation as a .json file. */
export function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.json') ? filename : `${filename}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/** Download whichever asset format this catalog entry actually is. */
export function downloadAsset(asset) {
  if (asset.kind === 'lottie') {
    downloadJson(asset.lottieData, `${slugify(asset.title)}.json`)
  } else {
    downloadSvg(asset.svg, `${slugify(asset.title)}.svg`)
  }
}

export function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
