import { useEffect, useRef, useState } from 'react'
import type { NexusGame } from './games'

type Props = {
  game: NexusGame | null
  onClose: () => void
}

export function NexusGameModal({ game, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [animateIn, setAnimateIn] = useState(false)
  const isClosingRef = useRef(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const nextOpen = Boolean(game)
    setIsOpen(nextOpen)
    setIsPlaying(false)

    if (nextOpen) {
      setAnimateIn(false)
      window.setTimeout(() => setAnimateIn(true), 10)
    }
  }, [game])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onFsChange = () => {
      const doc = document as unknown as {
        fullscreenElement?: Element | null
        webkitFullscreenElement?: Element | null
      }

      const isFs = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement)

      // If the user exits fullscreen via ESC while playing, close the modal immediately.
      if (isPlaying && !isClosingRef.current && !isFs) {
        handleClose()
      }
    }

    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange as EventListener)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange as EventListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isPlaying])

  useEffect(() => {
    if (!isPlaying) return
    const container = containerRef.current
    if (!container) return

    window.setTimeout(() => {
      const anyElem = container as unknown as {
        requestFullscreen?: () => Promise<void>
        webkitRequestFullscreen?: () => Promise<void>
      }

      if (anyElem.requestFullscreen) anyElem.requestFullscreen().catch(() => {})
      else if (anyElem.webkitRequestFullscreen) anyElem.webkitRequestFullscreen().catch(() => {})
    }, 150)
  }, [isPlaying])

  if (!isOpen || !game) return null

  const tip = `"${game.proTip}"`

  function exitFullscreenIfNeeded() {
    const doc = document as unknown as {
      fullscreenElement?: Element | null
      webkitFullscreenElement?: Element | null
      exitFullscreen?: () => Promise<void>
      webkitExitFullscreen?: () => Promise<void>
    }

    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      if (doc.exitFullscreen) doc.exitFullscreen().catch(() => {})
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen().catch(() => {})
    }
  }

  function handleClose() {
    if (isClosingRef.current) return
    isClosingRef.current = true
    exitFullscreenIfNeeded()
    setAnimateIn(false)
    window.setTimeout(() => {
      setIsOpen(false)
      setIsPlaying(false)
      isClosingRef.current = false
      onClose()
    }, 300)
  }

  function toggleFullscreen() {
    const elem = containerRef.current as unknown as {
      requestFullscreen?: () => Promise<void>
      webkitRequestFullscreen?: () => Promise<void>
    } | null

    const doc = document as unknown as {
      fullscreenElement?: Element | null
      webkitFullscreenElement?: Element | null
      exitFullscreen?: () => Promise<void>
      webkitExitFullscreen?: () => Promise<void>
    }

    if (!elem) return

    const isFs = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement)
    if (!isFs) {
      if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {})
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen().catch(() => {})
      return
    }

    if (doc.exitFullscreen) doc.exitFullscreen().catch(() => {})
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen().catch(() => {})
  }

  return (
    <div
      id="game-modal"
      className={`fixed inset-0 z-[100] ${isOpen ? 'flex' : 'hidden'} items-center justify-center p-4`}
    >
      <button
        id="modal-backdrop"
        type="button"
        className="modal-backdrop absolute inset-0"
        onClick={handleClose}
        aria-label="Close"
      />

      <div
        id="modal-content"
        className={`glass-card nx-modal-shell relative z-10 flex w-full max-w-5xl flex-col overflow-hidden border transition duration-300 ${
          animateIn ? 'nx-modal-in scale-100 opacity-100' : 'nx-modal-out scale-95 opacity-0'
        } ${isPlaying ? 'h-screen w-screen max-w-none rounded-none border-0' : 'h-[90vh] rounded-2xl'}`}
        style={{ borderColor: 'rgba(0,243,255,0.3)' }}
      >
        {!isPlaying && (
          <div
            className="modal-header flex items-center justify-between border-b p-4"
            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}
          >
            <div
              id="modal-title"
              className="text-xl font-bold md:text-2xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {game.title}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="modal-header-button rounded-full p-2 transition duration-200 hover:scale-[1.05]"
                aria-label="Fullscreen"
              >
                <i className="fa-solid fa-expand" />
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="modal-header-button rounded-full p-2 transition duration-200 hover:scale-[1.05]"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
          </div>
        )}

        <div className={`flex flex-1 overflow-hidden ${isPlaying ? '' : 'flex-col md:flex-row'}`}>
          <div
            ref={containerRef}
            id="iframe-container"
            className="relative flex flex-1 items-center justify-center"
            style={{ background: '#000000' }}
          >
            {!isPlaying ? (
              <div id="game-placeholder" className="p-4 text-center">
                {game.image ? (
                  <div
                    className="relative mx-auto mb-4 h-32 w-full max-w-sm overflow-hidden rounded-2xl"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <img
                      src={game.image}
                      alt={`${game.title} game thumbnail`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.65))' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full"
                        style={{ background: 'rgba(0,243,255,0.22)' }}
                      >
                        <i className="fa-solid fa-play text-2xl" style={{ color: 'hsl(var(--neon-blue))' }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ background: 'rgba(0,243,255,0.2)' }}
                  >
                    <i className="fa-solid fa-play text-3xl" style={{ color: 'hsl(var(--neon-blue))' }} />
                  </div>
                )}

                <p className="mb-6 text-sm modal-placeholder-text">Ready to launch {game.title}?</p>
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="play-now-button rounded-full px-8 py-3 font-bold transition duration-200 hover:scale-[1.05]"
                >
                  PLAY NOW
                </button>
              </div>
            ) : (
              <>
                <div
                  className="nx-esc-hint absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full px-3 py-1.5 text-xs"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  Press ESC to close
                </div>
                <iframe
                  ref={iframeRef}
                  id="active-game-frame"
                  title={game.title}
                  src={game.url}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  scrolling="no"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </>
            )}
          </div>

          {!isPlaying && (
            <aside
              className="modal-sidebar w-full shrink-0 overflow-y-auto border-l p-6 md:w-80"
              style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}
            >
              <div className="mb-6">
                <h4
                  className="mb-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: 'hsl(var(--neon-blue))', fontFamily: 'var(--font-heading)' }}
                >
                  Description
                </h4>
                <p id="modal-desc" className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                  {game.description}
                </p>
              </div>

              <div className="mb-6">
                <h4
                  className="mb-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: 'hsl(var(--neon-blue))', fontFamily: 'var(--font-heading)' }}
                >
                  Controls
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {game.controls.slice(0, 6).map((c) => (
                    <div key={`${c.keys}-${c.action}`} className="control-button glass-panel rounded-lg p-2 text-center">
                      <div className="text-lg font-bold">{c.keys}</div>
                      <div className="mt-0.5">{c.action}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <div
                  className="pro-tip-box glass-panel rounded-xl p-4"
                  style={{ background: 'linear-gradient(135deg, rgba(188,19,254,0.20), transparent)' }}
                >
                  <div className="mb-1 font-bold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Pro Tip
                  </div>
                  <div className="text-xs italic" style={{ color: 'rgba(255,255,255,0.70)' }}>
                    {tip}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
