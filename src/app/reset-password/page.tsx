'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="terminal-card w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">☉</div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--accent-cyan)' }}>
            SUPREME ALIGNMENT
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Set New Password
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="text-sm px-3 py-2 rounded" style={{ background: 'rgba(0,255,200,0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,255,200,0.2)' }}>
              Your password has been updated successfully.
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <Link href="/login" style={{ color: 'var(--accent-cyan)' }} className="underline">
                Back to login
              </Link>
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="text-sm px-3 py-2 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold text-sm uppercase tracking-wider"
                style={{
                  background: 'var(--accent-cyan)',
                  color: 'var(--bg-primary)',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
              </button>
            </form>

            <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Remember your password?{' '}
              <Link href="/login" style={{ color: 'var(--accent-cyan)' }} className="underline">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
