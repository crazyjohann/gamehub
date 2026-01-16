import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  open: boolean
  onSubmit: (password: string) => boolean
  onQuickAccess: () => void
}

export function NexusPasswordModal({ open, onSubmit, onQuickAccess }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const placeholder = useMemo(() => '••••••••', [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  if (!open) return null

  function fail() {
    setError('Incorrect Password')
    setShake(true)
    setPassword('')

    window.setTimeout(() => setError(''), 1000)
    window.setTimeout(() => setShake(false), 500)
  }

  function handleEnter() {
    const ok = onSubmit(password)
    if (!ok) fail()
  }

  return (
    <div
      id="password-modal"
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Password required"
    >
      <div
        className="glass-card w-full max-w-md rounded-2xl p-8"
        style={{ border: '1px solid rgba(0,243,255,0.3)' }}
      >
        <div className="text-center">
          <div className="mb-5">
            <i className="fa-solid fa-gamepad text-6xl" style={{ color: 'hsl(var(--neon-blue))' }} />
          </div>
          <button
            type="button"
            onClick={onQuickAccess}
            className="text-3xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.95)' }}
          >
            Nexus Game Hub
          </button>
          <p className="mt-2" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Please enter the password to continue
          </p>
        </div>

        <div className="mt-6">
          <input
            ref={inputRef}
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') handleEnter()
            }}
            placeholder={placeholder}
            className={`nx-focus-neon w-full rounded-xl px-4 py-3 text-center ${shake ? 'shake' : ''}`}
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.92)',
            }}
          />

          <div className="mt-2 h-6 text-center text-sm" style={{ color: 'hsl(var(--neon-pink))' }}>
            {error}
          </div>

          <button
            type="button"
            onClick={handleEnter}
            className="mt-2 w-full rounded-xl py-3 text-lg font-bold transition duration-200 hover:scale-[1.05]"
            style={{
              background: '#00f3ff',
              color: '#0f0c29',
              boxShadow: '0 0 20px rgba(0,243,255,0.4)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.background = '#ffffff'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.background = '#00f3ff'
            }}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  )
}
