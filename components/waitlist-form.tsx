'use client'

import { useState } from 'react'
import { Stamp } from './doc/stamp'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function WaitlistForm({
  tone = 'paper',
  className = '',
}: {
  tone?: 'paper' | 'ink'
  className?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const ink = tone === 'ink'
  const textColor = ink ? 'var(--dk-text)' : 'var(--ink)'
  const mutedColor = ink ? 'var(--dk-muted)' : 'var(--ink-muted)'
  const lineColor = ink ? 'var(--dk-text)' : 'var(--ink)'

  async function handleSubmit() {
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'You are on the list.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex min-h-[64px] items-center gap-4 ${className}`}>
        <Stamp label="RECEIVED" animated scale={0.9} rotate={-4} />
        <span className="type-mono-label" style={{ color: mutedColor, fontSize: 12 }}>
          {message}
        </span>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
        className="flex w-full flex-col gap-4 sm:flex-row sm:items-end"
      >
        <div className="min-w-0 flex-1">
          <label
            htmlFor={`waitlist-email-${tone}`}
            className="type-mono-label block"
            style={{ color: mutedColor, fontSize: 10 }}
          >
            Work email
          </label>
          <input
            id={`waitlist-email-${tone}`}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="operator@brand.com"
            disabled={status === 'loading'}
            className="amplify-email h-[44px] w-full bg-transparent text-[16px] outline-none transition-[border-color] disabled:opacity-50"
            data-tone={ink ? 'dark' : 'light'}
            style={{
              color: textColor,
              borderBottom: `1px solid ${lineColor}`,
              borderRadius: 0,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderBottom = '2px solid var(--orange)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderBottom = `1px solid ${lineColor}`
            }}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-press type-mono-label flex h-[50px] shrink-0 items-center justify-center gap-2 rounded-doc px-6 disabled:opacity-55"
          style={{
            background: 'var(--orange)',
            color: 'var(--paper)',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {status === 'loading' ? 'REQUESTING…' : 'REQUEST EARLY ACCESS'}
          {status !== 'loading' && <span aria-hidden>→</span>}
        </button>
      </form>
      {status === 'error' && (
        <p className="type-mono-label mt-2" style={{ color: 'var(--stamp)', fontSize: 11 }}>
          ✗ {message}
        </p>
      )}
    </div>
  )
}
