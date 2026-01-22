import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { NexusPasswordModal } from './features/nexus/NexusPasswordModal'
import { NexusThemeModal } from './features/nexus/NexusThemeModal'
import { NexusGameModal } from './features/nexus/NexusGameModal'
import { buildGames, getAllGenres, getFeaturedGames, type NexusGame } from './features/nexus/games'

const SESSION_KEY = 'nexus_auth'

function normalizePassword(value: string) {
  const raw = (value || '').trim()
  const normalized = typeof raw.normalize === 'function' ? raw.normalize('NFKC') : raw
  return normalized.toLowerCase()
}

function getCardArtBackground(hue: number) {
  const h1 = ((Math.round(hue) % 360) + 360) % 360
  const h2 = (h1 + 40) % 360
  return `linear-gradient(${h1}deg, hsl(${h1} 70% 20%), hsl(${h2} 80% 10%))`
}

function App() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [themeModalOpen, setThemeModalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [genre, setGenre] = useState('all')
  const [activeGame, setActiveGame] = useState<NexusGame | null>(null)

  const games = useMemo(() => buildGames(), [])
  const genres = useMemo(() => getAllGenres(games), [games])
  const featured = useMemo(() => getFeaturedGames(games), [games])

  useEffect(() => {
    // 1) Auth restore (sessionStorage; if unavailable, require password each refresh)
    try {
      setIsAuthed(sessionStorage.getItem(SESSION_KEY) === 'true')
    } catch {
      setIsAuthed(false)
    }
  }, [])

  useEffect(() => {
    // 2) Theme restore (localStorage)
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const savedBg = localStorage.getItem('bgTheme') || 'bg-theme-1'
    const savedFont = localStorage.getItem('fontTheme') || 'font-theme-1'

    document.body.classList.toggle('light-theme', savedTheme === 'light')

    for (let i = 1; i <= 16; i += 1) document.body.classList.remove(`bg-theme-${i}`)
    document.body.classList.add(savedBg)

    document.body.classList.remove('font-theme-1', 'font-theme-2', 'font-theme-3')
    document.body.classList.add(savedFont)

    // 3) FX + token restore (accent/glow + glass blur + textures + palette)
    const glow = Number(localStorage.getItem('nxGlow') || '1')
    const blur = Number(localStorage.getItem('nxBlur') || '10')
    const texture = localStorage.getItem('nxTexture') || 'scanlines'

    document.documentElement.style.setProperty('--nx-glow', String(Number.isFinite(glow) ? glow : 1))
    document.documentElement.style.setProperty('--nx-glass-blur', `${Number.isFinite(blur) ? blur : 10}px`)

    document.body.classList.remove('nx-texture-scanlines', 'nx-texture-noise', 'nx-texture-off')
    document.body.classList.add(
      texture === 'noise' ? 'nx-texture-noise' : texture === 'off' ? 'nx-texture-off' : 'nx-texture-scanlines',
    )

    const neonBlue = localStorage.getItem('nxNeonBlue')
    const neonPurple = localStorage.getItem('nxNeonPurple')
    const neonPink = localStorage.getItem('nxNeonPink')
    const holoA = localStorage.getItem('nxHoloA')
    const holoB = localStorage.getItem('nxHoloB')
    const holoC = localStorage.getItem('nxHoloC')

    if (neonBlue) document.documentElement.style.setProperty('--neon-blue', neonBlue)
    if (neonPurple) document.documentElement.style.setProperty('--neon-purple', neonPurple)
    if (neonPink) document.documentElement.style.setProperty('--neon-pink', neonPink)
    if (holoA) document.documentElement.style.setProperty('--nx-holo-a', holoA)
    if (holoB) document.documentElement.style.setProperty('--nx-holo-b', holoB)
    if (holoC) document.documentElement.style.setProperty('--nx-holo-c', holoC)

    const glassBgAlpha = localStorage.getItem('nxGlassBgAlpha')
    const glassBorderAlpha = localStorage.getItem('nxGlassBorderAlpha')
    const glassHighlightAlpha = localStorage.getItem('nxGlassHighlightAlpha')
    if (glassBgAlpha) document.documentElement.style.setProperty('--glass-bg', `255 255 255 / ${glassBgAlpha}`)
    if (glassBorderAlpha)
      document.documentElement.style.setProperty('--glass-border-rgb', `255 255 255 / ${glassBorderAlpha}`)
    if (glassHighlightAlpha)
      document.documentElement.style.setProperty('--glass-highlight-rgb', `255 255 255 / ${glassHighlightAlpha}`)

    const textureOpacity = localStorage.getItem('nxTextureOpacity')
    if (textureOpacity) document.documentElement.style.setProperty('--nx-texture-opacity', textureOpacity)
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query), 150)
    return () => window.clearTimeout(t)
  }, [query])

  const filteredGames = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    return games.filter((g) => {
      const matchesSearch = g.title.toLowerCase().includes(q)
      const matchesCat = genre === 'all' || g.genre === genre
      return matchesSearch && matchesCat
    })
  }, [games, debouncedQuery, genre])

  function showApp() {
    setIsAuthed(true)
  }

  function handlePasswordSubmit(password: string) {
    const correct = normalizePassword('nexusgames67')
    const input = normalizePassword(password)
    if (input === correct) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true')
      } catch {
        // ignore (session storage unavailable)
      }
      showApp()
      return true
    }
    return false
  }

  function openGame(next: NexusGame) {
    setThemeModalOpen(false)
    setActiveGame(next)
  }

  function randomGame() {
    if (!games.length) return
    const randomIndex = Math.floor(Math.random() * games.length)
    openGame(games[randomIndex])
  }

  function handleCardMove(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * 100
    const py = ((e.clientY - r.top) / r.height) * 100

    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    const rotY = dx * 10
    const rotX = -dy * 8

    el.style.setProperty('--nx-mx', `${px}%`)
    el.style.setProperty('--nx-my', `${py}%`)
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px) scale(1.03)`
  }

  function handleCardLeave(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    el.style.transform = ''
  }

  return (
    <div className="nx-app-shell min-h-screen">
      <NexusPasswordModal
        open={!isAuthed}
        onQuickAccess={showApp}
        onSubmit={handlePasswordSubmit}
      />

      <div className="nx-grid-overlay" aria-hidden="true" />

      {isAuthed && !activeGame && (
        <button
          type="button"
          onClick={() => setThemeModalOpen(true)}
          className="fixed right-6 top-6 z-[250] rounded-full p-3 transition duration-200 hover:scale-[1.05]"
          aria-label="Customize theme"
        >
          <i className="fa-solid fa-palette nx-theme-btn-icon" />
        </button>
      )}

      <NexusThemeModal open={themeModalOpen} onOpenChange={setThemeModalOpen} />

      <main
        id="main-content-wrapper"
        className={isAuthed ? 'block' : 'hidden'}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20">
          <header className="mb-12 text-center">
            <div className="mb-4">
              <i className="fa-solid fa-gamepad nx-hero-icon header-icon text-6xl nx-icon-neon" />
            </div>
            <h1
              className="nx-holo-title main-title text-5xl font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Nexus Game Hub
            </h1>
            <p className="mt-2 nx-text-muted">
              Discover, play, and master the ultimate collection of games
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-archive nx-icon-neon" />
                <span className="nx-text-muted">
                  <span className="font-semibold" id="total-games">
                    {games.length}
                  </span>{' '}
                  Games
                </span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-bolt nx-icon-neon" />
                <span className="nx-text-muted">Instant Play</span>
              </div>
              <button
                type="button"
                onClick={randomGame}
                className="flex items-center gap-2 transition duration-200 hover:scale-[1.02]"
              >
                <i className="fa-solid fa-shuffle nx-icon-neon" />
                <span className="nx-text-muted nx-linkish">Surprise Me!</span>
              </button>
            </div>
          </header>

          <section
            className="glass-panel nx-search-shell mx-auto mb-12 flex w-full max-w-3xl items-center gap-2 rounded-full px-3 py-2 transition duration-200 hover:scale-[1.01]"
            aria-label="Search and filter"
          >
            <i className="fa-solid fa-magnifying-glass search-icon" />
            <input
              id="search-bar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for your next adventure..."
              className="nx-search-input w-full bg-transparent px-2 py-2 text-sm"
            />

            {query.trim().length > 0 && (
              <button
                type="button"
                className="rounded-full p-2 transition duration-200 hover:scale-[1.05]"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark search-icon" />
              </button>
            )}

            <div className="h-6 w-px nx-divider" />
            <div className="relative">
              <select
                id="genre-filter"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="nx-genre-select appearance-none rounded-full bg-transparent px-3 py-1.5 pr-10 text-sm"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g === 'all' ? 'All Games' : g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 search-icon" />
            </div>
          </section>

          {featured.length > 0 && (
            <section id="featured-section" className="mb-10">
              <h2 className="section-title">Featured Games</h2>
              <div
                id="featured-grid"
                className="featured-container glass-panel rounded-2xl"
              >
                {featured.map((g) => (
                  <button
                    key={g.slug}
                    type="button"
                    onClick={() => openGame(g)}
                    className="featured-card glass-card nx-tilt-border nx-tilt-card group relative flex shrink-0 flex-col rounded-2xl p-4 text-left transition duration-300"
                    onMouseMove={handleCardMove}
                    onMouseLeave={handleCardLeave}
                  >
                    <div
                      className="game-card-art relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl"
                      style={{
                        background: getCardArtBackground(g.hue),
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <i
                        className={`fa-solid ${g.icon} game-card-art-icon text-5xl transition duration-500 group-hover:scale-[1.25]`}
                      />
                      <div className="overlay absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="play-button rounded-full px-4 py-1 text-sm font-bold transition">
                          PLAY
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3
                        className="game-card-title line-clamp-1 text-lg font-bold transition"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {g.title}
                      </h3>
                      <p className="genre-badge mt-1 text-xs uppercase tracking-[0.25em]">
                        {g.genre}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section id="all-games-section">
            <h2 className="section-title">All Games</h2>

            {filteredGames.length === 0 ? (
              <div id="no-results" className="py-20 text-center">
                <i className="fa-solid fa-ghost text-6xl no-results-icon" />
                <h3
                  className="mt-4 text-xl no-results-title"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  No games found...
                </h3>
              </div>
            ) : (
              <div
                id="game-grid"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredGames.map((g) => (
                  <button
                    key={g.slug}
                    type="button"
                    onClick={() => openGame(g)}
                    className="glass-card nx-tilt-border nx-tilt-card group relative flex h-[280px] flex-col rounded-2xl p-4 text-left transition duration-300"
                    onMouseMove={handleCardMove}
                    onMouseLeave={handleCardLeave}
                  >
                    <div
                      className="game-card-art relative mb-4 flex h-40 items-center justify-center overflow-hidden rounded-xl"
                      style={{
                        background: getCardArtBackground(g.hue),
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <i
                        className={`fa-solid ${g.icon} game-card-art-icon text-5xl transition duration-500 group-hover:scale-[1.25]`}
                      />
                      <div className="overlay absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="play-button rounded-full px-4 py-1 text-sm font-bold transition">
                          PLAY
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3
                        className="game-card-title line-clamp-1 text-lg font-bold transition group-hover:[color:hsl(var(--neon-blue))]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {g.title}
                      </h3>
                      <p className="genre-badge mt-1 text-xs uppercase tracking-[0.25em]">
                        {g.genre}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <NexusGameModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
      />
    </div>
  )
}

export default App