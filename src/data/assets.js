import { generateAssetSvg, generateMemeSvg } from '../utils/generateAssetSvg.js'
import { generateLottieJson } from '../utils/generateLottieJson.js'
import { CATEGORIES } from '../constants/categories.js'

// Blueprint of assets per category: [title, variant, type, tags[]]
const BLUEPRINT = {
  loading: [
    ['Orbit Spinner', 'spinner', 'Animated SVG', ['spinner', 'circular', 'minimal']],
    ['Sand Timer', 'hourglass', 'Illustration', ['hourglass', 'wait', 'time']],
    ['Progress Pulse', 'progress', 'SVG', ['progress bar', 'linear', 'ui']],
    ['Triple Dot Bounce', 'dots', 'Animated SVG', ['dots', 'typing', 'chat']],
    ['Buffer Ring', 'spinner', 'Animated SVG', ['buffer', 'ring', 'stream']],
    ['Fetch In Progress', 'progress', 'SVG', ['fetch', 'api', 'skeleton']],
  ],
  waiting: [
    ['Patience Hourglass', 'hourglass', 'Illustration', ['patience', 'queue', 'hold']],
    ['Queue Dots', 'dots', 'Animated SVG', ['queue', 'position', 'line']],
    ['Standby Ring', 'spinner', 'SVG', ['standby', 'idle', 'pending']],
    ['Slow Clock', 'hourglass', 'Illustration', ['clock', 'delay', 'time']],
    ['Waitlist Badge', 'dots', 'Icon Set', ['waitlist', 'badge', 'minimal']],
    ['On Hold Loop', 'spinner', 'Animated SVG', ['hold', 'loop', 'call']],
  ],
  processing: [
    ['Data Crunch', 'progress', 'SVG', ['crunch', 'compute', 'pipeline']],
    ['Sync Cycle', 'spinner', 'Animated SVG', ['sync', 'cycle', 'refresh']],
    ['Render Pass', 'progress', 'Illustration', ['render', 'pass', 'build']],
    ['Pipeline Bar', 'progress', 'SVG', ['pipeline', 'ci', 'bar']],
    ['Compile Ring', 'spinner', 'Animated SVG', ['compile', 'ring', 'build']],
    ['Batch Job', 'dots', 'Animated SVG', ['batch', 'job', 'queue']],
  ],
  success: [
    ['Task Complete', 'check', 'SVG', ['complete', 'check', 'done']],
    ['Confetti Pop', 'confetti', 'Illustration', ['confetti', 'celebrate', 'party']],
    ['Verified Badge', 'check', 'Icon Set', ['verified', 'badge', 'trust']],
    ['Milestone Hit', 'confetti', 'Animated SVG', ['milestone', 'goal', 'win']],
    ['Green Check Circle', 'check', 'SVG', ['circle', 'approve', 'ok']],
    ['Celebration Burst', 'confetti', 'Animated SVG', ['burst', 'celebration', 'fun']],
  ],
  error: [
    ['Critical Alert', 'alert', 'Illustration', ['alert', 'critical', 'warning']],
    ['Broken Request', 'cross', 'SVG', ['broken', 'request', 'fail']],
    ['Danger Triangle', 'alert', 'Icon Set', ['danger', 'triangle', 'caution']],
    ['Rejected Cross', 'cross', 'SVG', ['reject', 'cross', 'denied']],
    ['System Fault', 'alert', 'Illustration', ['fault', 'system', 'bug']],
    ['Failed Upload', 'cross', 'Animated SVG', ['upload', 'fail', 'file']],
  ],
  'empty-state': [
    ['Nothing Here', 'ghost', 'Illustration', ['ghost', 'nothing', 'blank']],
    ['Empty Inbox', 'inbox', 'SVG', ['inbox', 'empty', 'mail']],
    ['No Results Found', 'search', 'Illustration', ['search', 'no results', 'zero']],
    ['Void Space', 'ghost', 'Icon Set', ['void', 'space', 'minimal']],
    ['Clear List', 'inbox', 'SVG', ['list', 'clear', 'clean']],
    ['Blank Canvas', 'dots', 'Illustration', ['canvas', 'blank', 'start']],
  ],
  'network-error': [
    ['Connection Lost', 'wifi', 'Illustration', ['wifi', 'offline', 'lost']],
    ['Unplugged', 'plug', 'SVG', ['plug', 'unplugged', 'cable']],
    ['Cloud Offline', 'cloudOff', 'Illustration', ['cloud', 'offline', 'sync']],
    ['No Signal', 'wifi', 'Icon Set', ['signal', 'no bars', 'network']],
    ['Server Unreachable', 'plug', 'Animated SVG', ['server', 'unreachable', 'timeout']],
    ['Disconnected Cloud', 'cloudOff', 'SVG', ['disconnected', 'cloud', 'error']],
  ],
}

// One "meme" per category: an oversized caption + small illustration.
// Captions are original dev-humor lines written for this project — not
// reproductions of existing internet memes, to avoid any copyright issues
// with real meme templates/images.
const MEME_BLUEPRINT = {
  loading: { title: 'Still Loading, Apparently', variant: 'spinner', caption: 'Still loading. Asking for a friend.', tags: ['meme', 'funny', 'dev humor'] },
  waiting: { title: 'Waiting On Backend', variant: 'hourglass', caption: 'Me, waiting on the backend team.', tags: ['meme', 'funny', 'backend'] },
  processing: { title: 'CPU Sweating', variant: 'progress', caption: 'My CPU fans right now.', tags: ['meme', 'funny', 'cpu'] },
  success: { title: 'Shipped It', variant: 'confetti', caption: 'Shipped it. Nobody panic.', tags: ['meme', 'funny', 'deploy'] },
  error: { title: 'Works On My Machine', variant: 'alert', caption: 'It worked on my machine.', tags: ['meme', 'funny', 'bug'] },
  'empty-state': { title: 'Literally Nothing', variant: 'ghost', caption: 'Nothing to see here. Literally.', tags: ['meme', 'funny', 'empty'] },
  'network-error': { title: 'Wifi Left The Chat', variant: 'wifi', caption: 'The wifi has left the chat.', tags: ['meme', 'funny', 'offline'] },
}

// One real Lottie (Bodymovin JSON) motion asset per category.
const LOTTIE_BLUEPRINT = {
  loading: { title: 'Lottie Orbit Loader', kind: 'spin', tags: ['lottie', 'json', 'motion'] },
  waiting: { title: 'Lottie Soft Bounce', kind: 'bounce', tags: ['lottie', 'json', 'motion'] },
  processing: { title: 'Lottie Pulse Core', kind: 'pulse', tags: ['lottie', 'json', 'motion'] },
  success: { title: 'Lottie Success Pulse', kind: 'pulse', tags: ['lottie', 'json', 'motion'] },
  error: { title: 'Lottie Alert Pulse', kind: 'pulse', tags: ['lottie', 'json', 'motion'] },
  'empty-state': { title: 'Lottie Idle Float', kind: 'bounce', tags: ['lottie', 'json', 'motion'] },
  'network-error': { title: 'Lottie Reconnect Spin', kind: 'spin', tags: ['lottie', 'json', 'motion'] },
}

const RESOLUTIONS = ['400×300', '512×512', '800×600', '1024×768']

function buildCatalog() {
  const items = []
  let idCounter = 1

  for (const cat of CATEGORIES) {
    if (cat.id === 'all') continue

    // Standard SVG / Animated SVG / Illustration / Icon Set entries
    const entries = BLUEPRINT[cat.id] || []
    entries.forEach(([title, variant, type, tags], i) => {
      const id = `asset-${idCounter++}`
      const animated = type === 'Animated SVG'
      const svg = generateAssetSvg({
        category: cat.id,
        color: cat.color,
        variant,
        seed: i,
        title,
        animated,
      })
      items.push({
        id,
        title,
        category: cat.id,
        categoryLabel: cat.label,
        type,
        kind: 'svg',
        tags,
        color: cat.color,
        resolution: RESOLUTIONS[i % RESOLUTIONS.length],
        fileSize: `${(18 + i * 7) % 60 + 12} KB`,
        svg,
      })
    })

    // One dev-humor "Meme" entry
    const meme = MEME_BLUEPRINT[cat.id]
    if (meme) {
      const id = `asset-${idCounter++}`
      const svg = generateMemeSvg({
        category: cat.id,
        color: cat.color,
        variant: meme.variant,
        seed: 9,
        title: meme.title,
        caption: meme.caption,
      })
      items.push({
        id,
        title: meme.title,
        category: cat.id,
        categoryLabel: cat.label,
        type: 'Meme',
        kind: 'svg',
        tags: meme.tags,
        color: cat.color,
        resolution: '400×300',
        fileSize: '21 KB',
        svg,
      })
    }

    // One real Lottie (Bodymovin JSON) entry
    const lottie = LOTTIE_BLUEPRINT[cat.id]
    if (lottie) {
      const id = `asset-${idCounter++}`
      const lottieData = generateLottieJson({
        color: cat.color,
        kind: lottie.kind,
        name: lottie.title,
      })
      items.push({
        id,
        title: lottie.title,
        category: cat.id,
        categoryLabel: cat.label,
        type: 'Lottie',
        kind: 'lottie',
        tags: lottie.tags,
        color: cat.color,
        resolution: '400×300 (vector)',
        fileSize: '4 KB',
        lottieData,
      })
    }
  }
  return items
}

export const ASSETS = buildCatalog()

export function getAssetById(id) {
  return ASSETS.find((a) => a.id === id)
}
