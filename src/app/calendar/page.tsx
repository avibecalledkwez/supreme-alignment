import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CalendarView from '@/components/CalendarView'
import Link from 'next/link'

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="terminal-card p-8 text-center max-w-md">
          <p className="text-xl mb-4" style={{ color: 'var(--accent-amber)' }}>Profile Incomplete</p>
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

  return <CalendarView profile={profile} />
}
