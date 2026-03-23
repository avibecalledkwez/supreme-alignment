'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const [city, setCity] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setFirstName(profile.first_name)
        setCurrentCity(profile.city)
        setCity(profile.city)
      }
    }
    loadProfile()
  }, [supabase, router])

  const handleUpdateCity = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(city)}`)
      const geoData = await geoRes.json()
      if (geoData.error) {
        setError('Could not find that location.')
        setLoading(false)
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          city: geoData.formatted,
          latitude: geoData.latitude,
          longitude: geoData.longitude,
        })
        .eq('id', user.id)

      if (updateError) {
        setError(updateError.message)
      } else {
        setCurrentCity(geoData.formatted)
        setCity(geoData.formatted)
        setMessage('Location updated successfully.')
      }
    } catch {
      setError('Update failed.')
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="terminal-card w-full max-w-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold" style={{ color: 'var(--accent-cyan)' }}>SETTINGS</h1>
          <Link
            href="/dashboard"
            className="px-3 py-1.5 rounded text-xs font-semibold uppercase"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
          >
            ← Dashboard
          </Link>
        </div>

        {/* Profile info */}
        <div className="mb-6 p-4 rounded" style={{ background: 'var(--bg-tertiary)' }}>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>Profile</p>
          <p className="text-lg font-bold">{firstName}</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Current location: {currentCity}
          </p>
        </div>

        {/* Update City */}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
            Update Location (for travel)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1"
              placeholder="New York, NY or 10001"
            />
            <button
              onClick={handleUpdateCity}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-semibold uppercase"
              style={{ background: 'var(--accent-cyan)', color: 'var(--bg-primary)', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? '...' : 'UPDATE'}
            </button>
          </div>
          {message && (
            <p className="text-xs mt-2" style={{ color: 'var(--accent-green)' }}>{message}</p>
          )}
          {error && (
            <p className="text-xs mt-2" style={{ color: '#ef4444' }}>{error}</p>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-lg text-sm font-semibold uppercase tracking-wider"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          LOG OUT
        </button>
      </div>
    </div>
  )
}
