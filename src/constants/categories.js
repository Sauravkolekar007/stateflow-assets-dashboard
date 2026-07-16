// Single source of truth for the 7 mandatory app-state categories.
// Order here drives the order of the sidebar, tabs, and stats section.
export const CATEGORIES = [
  { id: 'all', label: 'All Assets', color: '#6C5CE7' },
  { id: 'loading', label: 'Loading', color: '#6C5CE7' },
  { id: 'waiting', label: 'Waiting', color: '#F5A623' },
  { id: 'processing', label: 'Processing', color: '#22D3EE' },
  { id: 'success', label: 'Success', color: '#2ECC71' },
  { id: 'error', label: 'Error', color: '#F55D5D' },
  { id: 'empty-state', label: 'Empty State', color: '#9B9BAB' },
  { id: 'network-error', label: 'Network Error', color: '#FF7A59' },
]

export const ASSET_TYPES = ['SVG', 'Illustration', 'Animated SVG', 'Icon Set', 'Meme', 'Lottie']

export function getCategoryMeta(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0]
}
