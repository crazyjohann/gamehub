import { useEffect, useMemo, useState } from 'react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TextureMode = 'scanlines' | 'noise' | 'off'

type Preset = {
  id: 'cyber-neon' | 'midnight-glass' | 'light-studio'
  name: string
  description: string
  defaults: {
    isLight: boolean
    bgTheme: string
    fontTheme: string
    glow: number
    blur: number
    texture: TextureMode
  }
  tokens: {
    neonBlue: string
    neonPurple: string
    neonPink: string
    holoA: string
    holoB: string
    holoC: string
    glassBgAlpha: number
    glassBorderAlpha: number
    glassHighlightAlpha: number
    textureOpacity: number
  }
}

const PRESETS: Preset[] = [
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'High-saturation holo glow + sharp scanlines.',
    defaults: {
      isLight: false,
      bgTheme: 'bg-theme-2',
      fontTheme: 'font-theme-1',
      glow: 1.15,
      blur: 12,
      texture: 'scanlines',
    },
    tokens: {
      neonBlue: '184 100% 50%',
      neonPurple: '285 99% 54%',
      neonPink: '340 100% 50%',
      holoA: '184 100% 50%',
      holoB: '285 99% 54%',
      holoC: '340 100% 50%',
      glassBgAlpha: 0.035,
      glassBorderAlpha: 0.10,
      glassHighlightAlpha: 0.18,
      textureOpacity: 0.56,
    },
  },
  {
    id: 'midnight-glass',
    name: 'Midnight Glass',
    description: 'Cool, expensive glow with heavier glass blur.',
    defaults: {
      isLight: false,
      bgTheme: 'bg-theme-1',
      fontTheme: 'font-theme-3',
      glow: 0.95,
      blur: 16,
      texture: 'noise',
    },
    tokens: {
      neonBlue: '196 100% 52%',
      neonPurple: '262 92% 66%',
      neonPink: '330 100% 62%',
      holoA: '196 100% 52%',
      holoB: '262 92% 66%',
      holoC: '330 100% 62%',
      glassBgAlpha: 0.045,
      glassBorderAlpha: 0.12,
      glassHighlightAlpha: 0.22,
      textureOpacity: 0.48,
    },
  },
  {
    id: 'light-studio',
    name: 'Light Studio',
    description: 'Clean daylight UI with restrained electric blue accents.',
    defaults: {
      isLight: true,
      bgTheme: 'bg-theme-6',
      fontTheme: 'font-theme-1',
      glow: 0.85,
      blur: 10,
      texture: 'off',
    },
    tokens: {
      neonBlue: '214 90% 52%',
      neonPurple: '232 80% 62%',
      neonPink: '348 90% 58%',
      holoA: '214 90% 52%',
      holoB: '232 80% 62%',
      holoC: '348 90% 58%',
      glassBgAlpha: 0.22,
      glassBorderAlpha: 0.18,
      glassHighlightAlpha: 0.26,
      textureOpacity: 0,
    },
  },
]

const BG_THEMES = Array.from({ length: 16 }, (_, i) => `bg-theme-${i + 1}`)

const BG_THEME_PRESETS = [
  { id: 'bg-theme-1', name: 'Deep Space', preview: 'linear-gradient(135deg, #1a0b2e 0%, #0f0c29 50%, #24243e 100%)' },
  { id: 'bg-theme-2', name: 'Electric Purple', preview: 'linear-gradient(-45deg, #3a0ca3 0%, #7209b7 50%, #b5179e 100%)' },
  { id: 'bg-theme-3', name: 'Crimson Fury', preview: 'linear-gradient(90deg, #b71c1c 0%, #d32f2f 50%, #7f0000 100%)' },
  { id: 'bg-theme-4', name: 'Ocean Depths', preview: 'linear-gradient(180deg, #004d40 0%, #00838f 55%, #003d33 100%)' },
  { id: 'bg-theme-5', name: 'Royal Blue', preview: 'linear-gradient(0deg, #1e3a8a 0%, #3b82f6 55%, #1e3a8a 100%)' },
  { id: 'bg-theme-6', name: 'Midnight Shadow', preview: 'linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #000000 100%)' },
  { id: 'bg-theme-7', name: 'Mystic Violet', preview: 'linear-gradient(225deg, #4a148c 0%, #8e24aa 55%, #311b92 100%)' },
  { id: 'bg-theme-8', name: 'Hot Pink', preview: 'radial-gradient(circle at center, #b91d73 0%, #e91e63 60%, #880e4f 100%)' },
  { id: 'bg-theme-9', name: 'Steel Storm', preview: 'linear-gradient(90deg, #3a6186 0%, #5a7db1 50%, #3a6186 100%)' },
  { id: 'bg-theme-10', name: 'Chocolate Earth', preview: 'linear-gradient(45deg, #4e342e 0%, #6d4c41 55%, #4e342e 100%)' },
  { id: 'bg-theme-11', name: 'Azure Sky', preview: 'linear-gradient(180deg, #01579b 0%, #039be5 60%, #01579b 100%)' },
  { id: 'bg-theme-12', name: 'Emerald Matrix', preview: 'linear-gradient(-135deg, #267871 0%, #00acc1 60%, #1a5652 100%)' },
  { id: 'bg-theme-13', name: 'Sunset Circuit', preview: 'linear-gradient(135deg, #3d1a2f 0%, #d66a2a 45%, #ff2e78 100%)' },
  { id: 'bg-theme-14', name: 'Cyber Lime', preview: 'linear-gradient(135deg, #071a12 0%, #00b36b 45%, #c3ff00 100%)' },
  { id: 'bg-theme-15', name: 'Nebula Amber', preview: 'linear-gradient(-45deg, #1b1038 0%, #ffb703 45%, #ff6b00 100%)' },
  { id: 'bg-theme-16', name: 'Glacier Prism', preview: 'linear-gradient(135deg, #0b1220 0%, #2dd4bf 50%, #a5f3fc 100%)' },
]

const FONT_THEMES = [
  {
    id: 'font-theme-1',
    heading: 'Rajdhani',
    body: 'Poppins',
  },
  {
    id: 'font-theme-2',
    heading: 'Oswald',
    body: 'Roboto',
  },
  {
    id: 'font-theme-3',
    heading: 'Bebas Neue',
    body: 'Montserrat',
  },
]

export function NexusThemeModal({ open, onOpenChange }: Props) {
  const [isLight, setIsLight] = useState(false)
  const [bgTheme, setBgTheme] = useState('bg-theme-1')
  const [fontTheme, setFontTheme] = useState('font-theme-1')
  const [presetId, setPresetId] = useState<Preset['id'] | null>(null)
  const [glow, setGlow] = useState(1)
  const [blur, setBlur] = useState(10)
  const [texture, setTexture] = useState<TextureMode>('scanlines')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const savedBg = localStorage.getItem('bgTheme') || 'bg-theme-1'
    const savedFont = localStorage.getItem('fontTheme') || 'font-theme-1'

    const savedPreset = (localStorage.getItem('nxPreset') || '') as Preset['id']
    const savedGlow = Number(localStorage.getItem('nxGlow') || '1')
    const savedBlur = Number(localStorage.getItem('nxBlur') || '10')
    const savedTexture = (localStorage.getItem('nxTexture') || 'scanlines') as TextureMode

    setIsLight(savedTheme === 'light')
    setBgTheme(savedBg)
    setFontTheme(savedFont)

    setPresetId(PRESETS.some((p) => p.id === savedPreset) ? savedPreset : null)
    setGlow(Number.isFinite(savedGlow) ? savedGlow : 1)
    setBlur(Number.isFinite(savedBlur) ? savedBlur : 10)
    setTexture(savedTexture)

    // Ensure texture class is applied even before user touches the controls
    applyTexture(savedTexture)
    applyGlow(Number.isFinite(savedGlow) ? savedGlow : 1)
    applyBlur(Number.isFinite(savedBlur) ? savedBlur : 10)
  }, [open])

  useEffect(() => {
    document.body.classList.toggle('light-theme', isLight)
    localStorage.setItem('theme', isLight ? 'light' : 'dark')

    // Force repaint for deep CSS overrides (helps Safari)
    document.body.style.display = 'none'
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    document.body.offsetHeight
    document.body.style.display = ''
  }, [isLight])

  useEffect(() => {
    for (const c of BG_THEMES) document.body.classList.remove(c)
    document.body.classList.add(bgTheme)
    localStorage.setItem('bgTheme', bgTheme)
  }, [bgTheme])

  useEffect(() => {
    document.body.classList.remove('font-theme-1', 'font-theme-2', 'font-theme-3')
    document.body.classList.add(fontTheme)
    localStorage.setItem('fontTheme', fontTheme)
  }, [fontTheme])

  useEffect(() => {
    applyGlow(glow)
    localStorage.setItem('nxGlow', String(glow))
  }, [glow])

  useEffect(() => {
    applyBlur(blur)
    localStorage.setItem('nxBlur', String(blur))
  }, [blur])

  useEffect(() => {
    applyTexture(texture)
    localStorage.setItem('nxTexture', texture)
  }, [texture])

  const swatches = useMemo(
    () =>
      BG_THEME_PRESETS.map((t) => ({
        id: t.id,
        name: t.name,
        preview: t.preview,
      })),
    [],
  )

  if (!open) return null

  function applyPreset(preset: Preset) {
    setPresetId(preset.id)
    localStorage.setItem('nxPreset', preset.id)

    // 1) Mode + layout
    setIsLight(preset.defaults.isLight)
    setBgTheme(preset.defaults.bgTheme)
    setFontTheme(preset.defaults.fontTheme)

    // 2) Effects
    setGlow(preset.defaults.glow)
    setBlur(preset.defaults.blur)
    setTexture(preset.defaults.texture)

    // 3) Tokens
    setRootVar('--neon-blue', preset.tokens.neonBlue)
    setRootVar('--neon-purple', preset.tokens.neonPurple)
    setRootVar('--neon-pink', preset.tokens.neonPink)

    setRootVar('--nx-holo-a', preset.tokens.holoA)
    setRootVar('--nx-holo-b', preset.tokens.holoB)
    setRootVar('--nx-holo-c', preset.tokens.holoC)

    setRootVar('--glass-bg', `255 255 255 / ${preset.tokens.glassBgAlpha}`)
    setRootVar('--glass-border-rgb', `255 255 255 / ${preset.tokens.glassBorderAlpha}`)
    setRootVar('--glass-highlight-rgb', `255 255 255 / ${preset.tokens.glassHighlightAlpha}`)

    setRootVar('--nx-texture-opacity', String(preset.tokens.textureOpacity))

    // Persist token parts (so changing presets isn't required to rehydrate)
    localStorage.setItem('nxNeonBlue', preset.tokens.neonBlue)
    localStorage.setItem('nxNeonPurple', preset.tokens.neonPurple)
    localStorage.setItem('nxNeonPink', preset.tokens.neonPink)
    localStorage.setItem('nxHoloA', preset.tokens.holoA)
    localStorage.setItem('nxHoloB', preset.tokens.holoB)
    localStorage.setItem('nxHoloC', preset.tokens.holoC)
    localStorage.setItem('nxGlassBgAlpha', String(preset.tokens.glassBgAlpha))
    localStorage.setItem('nxGlassBorderAlpha', String(preset.tokens.glassBorderAlpha))
    localStorage.setItem('nxGlassHighlightAlpha', String(preset.tokens.glassHighlightAlpha))
    localStorage.setItem('nxTextureOpacity', String(preset.tokens.textureOpacity))
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(var(--nx-glass-blur))' }}
      role="dialog"
      aria-modal="true"
      aria-label="Customize Theme"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false)
      }}
    >
      <div
        id="theme-modal-content"
        className="glass-card w-[90%] max-w-2xl overflow-hidden rounded-2xl transition duration-300"
        style={{ border: '1px solid rgba(0,243,255,0.3)' }}
      >
        <div
          className="theme-modal-header flex items-center justify-between border-b px-4 py-4"
          style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}
        >
          <h3 className="text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Customize Theme
          </h3>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="theme-modal-close text-xl transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
          <section>
            <div className="mb-3 text-lg tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              PRESETS
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {PRESETS.map((p) => {
                const active = presetId === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className={`rounded-xl border px-4 py-3 text-left transition duration-200 hover:scale-[1.01] ${
                      active ? 'glass-panel' : 'glass-panel'
                    }`}
                    style={{
                      borderColor: active ? 'hsla(var(--neon-blue) / 0.75)' : 'rgba(255,255,255,0.10)',
                      boxShadow: active ? '0 0 22px hsla(var(--neon-blue) / 0.18)' : undefined,
                    }}
                    aria-pressed={active}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        {p.name}
                      </div>
                      {active && <span className="text-xs nx-text-muted">Active</span>}
                    </div>
                    <div className="mt-1 text-xs nx-text-muted">{p.description}</div>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <div className="mb-3 text-lg tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              EFFECTS
            </div>

            <div className="glass-panel space-y-5 rounded-xl p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                    Accent Intensity
                  </div>
                  <div className="text-xs nx-text-muted">{glow.toFixed(2)}×</div>
                </div>
                <input
                  type="range"
                  min={0.4}
                  max={1.4}
                  step={0.01}
                  value={glow}
                  onChange={(e) => setGlow(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--neon-blue))]"
                  aria-label="Accent intensity"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                    Glass Blur
                  </div>
                  <div className="text-xs nx-text-muted">{blur}px</div>
                </div>
                <input
                  type="range"
                  min={6}
                  max={20}
                  step={1}
                  value={blur}
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--neon-blue))]"
                  aria-label="Glass blur"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                    Background Texture
                  </div>
                  <div className="text-xs nx-text-muted">Noise or scanlines overlay</div>
                </div>
                <select
                  value={texture}
                  onChange={(e) => setTexture(e.target.value as TextureMode)}
                  className="nx-genre-select rounded-full bg-transparent px-3 py-1.5 text-sm"
                  aria-label="Background texture"
                >
                  <option value="scanlines">Scanlines</option>
                  <option value="noise">Noise</option>
                  <option value="off">Off</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 text-lg tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              MODE
            </div>
            <div className="glass-panel flex items-center justify-between rounded-xl px-4 py-4">
              <div className="flex items-center gap-2 theme-modal-mode-label">
                <i className="fa-solid fa-moon" />
                <span>Dark Mode</span>
              </div>

              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isLight}
                  onChange={(e) => setIsLight(e.target.checked)}
                  aria-label="Toggle light mode"
                />
                <span className="toggle-slider" />
              </label>

              <div className="flex items-center gap-2 theme-modal-mode-label">
                <i className="fa-solid fa-sun" />
                <span>Light Mode</span>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 text-lg tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              FONTS
            </div>
            <div className="flex flex-wrap gap-4">
              {FONT_THEMES.map((t) => {
                const active = fontTheme === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`font-btn ${active ? 'active' : ''}`}
                    onClick={() => setFontTheme(t.id)}
                  >
                    <span className="text-lg" style={{ fontFamily: t.heading }}>
                      {t.heading}
                    </span>{' '}
                    <span style={{ opacity: 0.8 }}>/</span>{' '}
                    <span className="text-sm" style={{ fontFamily: t.body }}>
                      {t.body}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section>
            <div className="mb-3 text-lg tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
              BACKGROUND THEMES
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {swatches.map((s) => {
                const active = bgTheme === s.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`theme-swatch animate-gradient ${active ? 'active' : ''}`}
                    onClick={() => setBgTheme(s.id)}
                    style={{ background: s.preview }}
                    aria-label={s.name}
                  >
                    <span className="theme-name">{s.name}</span>
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function setRootVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}

function applyGlow(glow: number) {
  document.documentElement.style.setProperty('--nx-glow', String(clamp(glow, 0.4, 1.4)))
}

function applyBlur(px: number) {
  document.documentElement.style.setProperty('--nx-glass-blur', `${Math.round(clamp(px, 6, 20))}px`)
}

function applyTexture(mode: TextureMode) {
  document.body.classList.remove('nx-texture-scanlines', 'nx-texture-noise', 'nx-texture-off')
  document.body.classList.add(
    mode === 'noise' ? 'nx-texture-noise' : mode === 'off' ? 'nx-texture-off' : 'nx-texture-scanlines',
  )

  if (mode === 'off') {
    document.documentElement.style.setProperty('--nx-texture-opacity', '0')
    return
  }

  const saved = Number(localStorage.getItem('nxTextureOpacity') || '0.52')
  const opacity = Number.isFinite(saved) ? saved : 0.52
  document.documentElement.style.setProperty('--nx-texture-opacity', String(opacity))
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function getBgHex(id: string) {
  switch (id) {
    case 'bg-theme-1':
      return '#0d1117'
    case 'bg-theme-2':
      return '#3a0ca3'
    case 'bg-theme-3':
      return '#b71c1c'
    case 'bg-theme-4':
      return '#004d40'
    case 'bg-theme-5':
      return '#1e3a8a'
    case 'bg-theme-6':
      return '#1b1b1b'
    case 'bg-theme-7':
      return '#4a148c'
    case 'bg-theme-8':
      return '#b91d73'
    case 'bg-theme-9':
      return '#3a6186'
    case 'bg-theme-10':
      return '#4e342e'
    case 'bg-theme-11':
      return '#01579b'
    case 'bg-theme-12':
      return '#267871'
    case 'bg-theme-13':
      return '#3d1a2f'
    case 'bg-theme-14':
      return '#00b36b'
    case 'bg-theme-15':
      return '#ffb703'
    case 'bg-theme-16':
      return '#2dd4bf'
    default:
      return '#0d1117'
  }
}
