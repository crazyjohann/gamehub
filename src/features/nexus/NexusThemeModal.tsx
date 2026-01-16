import { useEffect, useMemo, useState } from 'react'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const BG_THEMES = Array.from({ length: 12 }, (_, i) => `bg-theme-${i + 1}`)

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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const savedBg = localStorage.getItem('bgTheme') || 'bg-theme-1'
    const savedFont = localStorage.getItem('fontTheme') || 'font-theme-1'

    setIsLight(savedTheme === 'light')
    setBgTheme(savedBg)
    setFontTheme(savedFont)
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
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
    default:
      return '#0d1117'
  }
}
