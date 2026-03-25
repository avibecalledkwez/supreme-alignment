'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const [city, setCity] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [firstName, setFirstName] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthCity, setBirthCity] = useState('')
  const [originalBirthTime, setOriginalBirthTime] = useState('')
  const [originalBirthCity, setOriginalBirthCity] = useState('')
  const [savingBirth, setSavingBirth] = useState(false)
  const [birthMessage, setBirthMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
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
        setBirthTime(profile.birth_time || '')
        setBirthCity(profile.birth_city || '')
        setOriginalBirthTime(profile.birth_time || '')
        setOriginalBirthCity(profile.birth_city || '')
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

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      const res = await fetch('/api/delete-account', { method: 'POST' })
      if (res.ok) {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
      } else {
        setError('Failed to delete account. Please try again.')
        setShowDeleteConfirm(false)
      }
    } catch {
      setError('Failed to delete account. Please try again.')
      setShowDeleteConfirm(false)
    }
    setDeleting(false)
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

        {/* Birth Data for Zodiacal Releasing */}
        {!originalBirthTime && !originalBirthCity && (
          <div className="mb-4 p-3 rounded" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="text-xs" style={{ color: 'var(--accent-amber)' }}>
              Add your birth time &amp; birth city below to unlock Zodiacal Releasing on your dashboard.
            </p>
          </div>
        )}
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
            Birth Time &amp; City (for Zodiacal Releasing)
          </label>
          <div className="space-y-3">
            <div>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full"
                style={{ padding: '8px 10px' }}
              />
              <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>
                Birth time from your birth certificate (24h format)
              </p>
            </div>
            <div>
              <input
                type="text"
                value={birthCity}
                onChange={(e) => setBirthCity(e.target.value)}
                className="w-full"
                placeholder="City where you were born"
              />
            </div>
            <button
              onClick={async () => {
                if (!birthTime || !birthCity.trim()) {
                  setError('Both birth time and birth city are required.')
                  return
                }
                setSavingBirth(true)
                setBirthMessage('')
                setError('')

                try {
                  const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(birthCity.trim())}`)
                  const geoData = await geoRes.json()
                  if (geoData.error) {
                    setError('Could not find that birth city.')
                    setSavingBirth(false)
                    return
                  }

                  const { data: { user } } = await supabase.auth.getUser()
                  if (!user) return

                  const { error: updateError } = await supabase
                    .from('profiles')
                    .update({
                      birth_time: birthTime,
                      birth_city: geoData.formatted || birthCity.trim(),
                      birth_latitude: geoData.latitude,
                      birth_longitude: geoData.longitude,
                    })
                    .eq('id', user.id)

                  if (updateError) {
                    setError(updateError.message)
                  } else {
                    setOriginalBirthTime(birthTime)
                    setOriginalBirthCity(birthCity.trim())
                    setBirthMessage('Birth data saved. Zodiacal Releasing is now active on your dashboard.')
                  }
                } catch {
                  setError('Failed to save birth data.')
                }
                setSavingBirth(false)
              }}
              disabled={savingBirth || (birthTime === originalBirthTime && birthCity.trim() === originalBirthCity)}
              className="w-full py-2 rounded-lg text-sm font-semibold uppercase"
              style={{
                background: 'var(--accent-purple)',
                color: 'var(--bg-primary)',
                opacity: savingBirth || (birthTime === originalBirthTime && birthCity.trim() === originalBirthCity) ? 0.5 : 1,
              }}
            >
              {savingBirth ? 'SAVING...' : 'SAVE BIRTH DATA'}
            </button>
            {birthMessage && (
              <p className="text-xs" style={{ color: 'var(--accent-green)' }}>{birthMessage}</p>
            )}
          </div>
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

        {/* Danger Zone - Delete Account */}
        <div className="mt-8 p-4 rounded" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <p className="text-xs uppercase tracking-wider mb-1 font-bold" style={{ color: '#ef4444' }}>Danger Zone</p>
          <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 rounded-lg text-sm font-semibold uppercase tracking-wider"
              style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              DELETE ACCOUNT
            </button>
          ) : (
            <div>
              <p className="text-sm mb-3 font-semibold" style={{ color: '#ef4444' }}>
                Are you sure? This will permanently delete your account.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider"
                  style={{ background: '#ef4444', color: '#fff', opacity: deleting ? 0.6 : 1 }}
                >
                  {deleting ? 'DELETING...' : 'YES, DELETE'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
