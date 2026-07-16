// Produces minimal, spec-valid Lottie (Bodymovin) JSON animations.
// These are real Lottie files — renderable with lottie-web and downloadable
// as .json — not a relabeled SVG. Kept intentionally simple (one shape
// layer, a handful of keyframes) since the goal is a genuinely different,
// genuinely-animated asset format in the catalog, not a full animation tool.

function hexToRgbFloat(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  return [Number(r.toFixed(3)), Number(g.toFixed(3)), Number(b.toFixed(3)), 1]
}

const DURATION = 60 // frames
const FPS = 30

function baseShapeLayer({ shapes, ks }) {
  return {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: 'shape',
    sr: 1,
    ks,
    ao: 0,
    shapes,
    ip: 0,
    op: DURATION,
    st: 0,
    bm: 0,
  }
}

function circleShape(color, radius = 60) {
  return {
    ty: 'gr',
    it: [
      { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [radius, radius] } },
      { ty: 'fl', c: { a: 0, k: hexToRgbFloat(color) }, o: { a: 0, k: 100 } },
      { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
    ],
  }
}

function ringShape(color) {
  return {
    ty: 'gr',
    it: [
      { ty: 'el', p: { a: 0, k: [0, -46] }, s: { a: 0, k: [26, 26] } },
      { ty: 'fl', c: { a: 0, k: hexToRgbFloat(color) }, o: { a: 0, k: 100 } },
      { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
    ],
  }
}

/** A shape that orbits around the center — reads as a loading/sync motion. */
function buildSpinLottie(color) {
  const layer = baseShapeLayer({
    shapes: [ringShape(color)],
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 1, k: [{ t: 0, s: [0] }, { t: DURATION, s: [360] }] },
      p: { a: 0, k: [200, 150, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
  })
  return { layer }
}

/** A shape that grows and shrinks — reads as a success/pulse/notify motion. */
function buildPulseLottie(color) {
  const layer = baseShapeLayer({
    shapes: [circleShape(color, 90)],
    ks: {
      o: { a: 1, k: [{ t: 0, s: [90] }, { t: DURATION / 2, s: [45] }, { t: DURATION, s: [90] }] },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [200, 150, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: [
          { t: 0, s: [70, 70, 100] },
          { t: DURATION / 2, s: [110, 110, 100] },
          { t: DURATION, s: [70, 70, 100] },
        ],
      },
    },
  })
  return { layer }
}

/** A shape that bounces vertically — reads as a waiting/typing motion. */
function buildBounceLottie(color) {
  const layer = baseShapeLayer({
    shapes: [circleShape(color, 50)],
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: {
        a: 1,
        k: [
          { t: 0, s: [200, 150, 0] },
          { t: DURATION / 2, s: [200, 110, 0] },
          { t: DURATION, s: [200, 150, 0] },
        ],
      },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
  })
  return { layer }
}

const BUILDERS = { spin: buildSpinLottie, pulse: buildPulseLottie, bounce: buildBounceLottie }

/**
 * Build a complete, valid Lottie JSON document.
 * @param {{color:string, kind:'spin'|'pulse'|'bounce', name?:string}} opts
 */
export function generateLottieJson({ color, kind = 'pulse', name = 'StateFlow Asset' }) {
  const build = BUILDERS[kind] || BUILDERS.pulse
  const { layer } = build(color)

  return {
    v: '5.9.6',
    fr: FPS,
    ip: 0,
    op: DURATION,
    w: 400,
    h: 300,
    nm: name,
    ddd: 0,
    assets: [],
    layers: [layer],
  }
}
