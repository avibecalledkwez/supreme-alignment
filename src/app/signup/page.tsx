'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate DOB format
    const dobDate = new Date(dob)
    if (isNaN(dobDate.getTime())) {
      setError('Invalid date of birth.')
      setLoading(false)
      return
    }

    // Geocode the city
    let latitude = 0
    let longitude = 0
    let formattedCity = city

    try {
      const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(city)}`)
      const geoData = await geoRes.json()
      if (geoData.error) {
        setError(geoData.error || 'Could not find that location. Try "Charlotte, NC" or "New York, NY".')
        setLoading(false)
        return
      }
      latitude = geoData.latitude
      longitude = geoData.longitude
      formattedCity = geoData.formatted
    } catch {
      setError('Location lookup failed. Please try again.')
      setLoading(false)
      return
    }

    // Sign up
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          date_of_birth: dob,
          city: formattedCity,
          latitude,
          longitude,
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Insert profile
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        first_name: firstName,
        date_of_birth: dob,
        city: formattedCity,
        latitude,
        longitude,
      })
    }

    // Check if email confirmation is required
    if (data.session) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="terminal-card w-full max-w-md p-8 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--accent-green)' }}>
            ACCOUNT CREATED
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Check your email for a confirmation link, then log in.
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 px-6 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'var(--accent-cyan)', color: 'var(--bg-primary)' }}
          >
            GO TO LOGIN
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="terminal-card w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">☉</div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--accent-cyan)' }}>
            SUPREME ALIGNMENT
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Create your profile to begin
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full"
              placeholder="Name"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
              Current City / Zip Code
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full"
              placeholder="Los Angeles, CA or 90001"
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
            {loading ? 'INITIALIZING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent-cyan)' }} className="underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
