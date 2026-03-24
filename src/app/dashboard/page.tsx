import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AlignmentDashboard from '@/components/AlignmentDashboard'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch profile from database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // If no profile exists, try to create from user metadata
  if (!profile) {
    const meta = user.user_metadata
    if (meta?.date_of_birth && meta?.latitude) {
      await supabase.from('profiles').upsert({
        id: user.id,
        first_name: meta.first_name || 'User',
        date_of_birth: meta.date_of_birth,
        city: meta.city || 'Unknown',
        latitude: meta.latitude,
        longitude: meta.longitude,
      })
      // Redirect to reload with profile
      redirect('/dashboard')
    }

    // No profile data at all — redirect to complete onboarding
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="terminal-card p-8 text-center max-w-md">
          <p className="text-xl mb-4" style={{ color: 'var(--accent-amber)' }}>⚠ Profile Incomplete</p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Your profile is missing required data. Please update your settings.
          </p>
          <Link
            href="/settings"
            className="inline-block px-6 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'var(--accent-cyan)', color: 'var(--bg-primary)' }}
          >
            COMPLETE PROFILE
          </Link>
        </div>
      </div>
    )
  }

  return (
    <AlignmentDashboard
      profile={profile}
      navLinks={[
        { href: '/learn', label: 'Learn', color: 'var(--accent-cyan)' },
        { href: '/how-it-works', label: 'How It Works', color: 'var(--accent-purple)' },
        { href: '/calendar', label: 'Calendar', color: 'var(--accent-amber)' },
        { href: '/settings', label: '⚙ Settings', color: 'var(--text-secondary)' },
      ]}
    />
  )
}
