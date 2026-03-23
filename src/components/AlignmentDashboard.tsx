'use client'

import { useState, useEffect, useCallback } from 'react'
import { calculatePlanetaryHours, getCurrentPlanetaryHour, getSunTimes, PLANET_COLORS, PLANET_SYMBOLS, type PlanetaryHour, type Planet } from '@/lib/planetary-hours'
import { calculateNumerology, calculateAllPersonalHours } from '@/lib/numerology'
import { findAlignments, type Alignment } from '@/lib/alignment-engine'

interface UserProfile {
  first_name: string
  date_of_birth: string
  city: string
  latitude: number
  longitude: number
}

interface TimelineEntry {
  planetaryHour: PlanetaryHour
  personalHour: number
  alignments: Alignment[]
  clockHourLabel: string
}

export default function AlignmentDashboard({ profile }: { profile: UserProfile }) {
  const [now, setNow] = useState(new Date())
  const [planetaryHours, setPlanetaryHours] = useState<PlanetaryHour[]>([])
  const [currentPH, setCurrentPH] = useState<PlanetaryHour | null>(null)
  const [numerology, setNumerology] = useState({ personalYear: 0, personalMonth: 0, personalDay: 0, personalHour: 0 })
  const [activeAlignments, setActiveAlignments] = useState<Alignment[]>([])
  const [timeline, setTimeline] = useState<TimelineEntry[]>([])
  const [nextAlignment, setNextAlignment] = useState<{ entry: TimelineEntry; timeUntil: number } | null>(null)
  const [sunTimes, setSunTimes] = useState<{ sunrise: Date; sunset: Date } | null>(null)

  const birthParts = profile.date_of_birth.split('-')
  const birthMonth = parseInt(birthParts[1])
  const birthDay = parseInt(birthParts[2])

  const compute = useCallback(() => {
    const currentTime = new Date()
    setNow(currentTime)

    // Planetary hours
    const hours = calculatePlanetaryHours(currentTime, profile.latitude, profile.longitude)
    setPlanetaryHours(hours)

    const current = getCurrentPlanetaryHour(hours)
    setCurrentPH(current)

    // Sun times
    const st = getSunTimes(currentTime, profile.latitude, profile.longitude)
    setSunTimes(st)

    // Numerology
    const numProfile = calculateNumerology(birthMonth, birthDay, currentTime)
    setNumerology(numProfile)

    // Active alignments
    if (current) {
      const aligns = findAlignments(current.planet, numProfile.personalHour)
      setActiveAlignments(aligns)
    } else {
      setActiveAlignments([])
    }

    // Build timeline
    const personalHoursAll = calculateAllPersonalHours(birthMonth, birthDay, currentTime)
    const entries: TimelineEntry[] = hours.map((ph, idx) => {
      // Map planetary hour to approximate clock hour
      const clockHour = ph.start.getHours()
      const mins = ph.start.getMinutes()
      const label = `${clockHour.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
      const pHour = personalHoursAll[clockHour] ?? 0
      const aligns = findAlignments(ph.planet, pHour)
      return {
        planetaryHour: ph,
        personalHour: pHour,
        alignments: aligns,
        clockHourLabel: label,
      }
    })
    setTimeline(entries)

    // Find next alignment
    const futureAlignments = entries.filter(
      (e) => e.alignments.length > 0 && e.planetaryHour.end > currentTime
    )
    if (futureAlignments.length > 0) {
      // Find the next one that hasn't started yet, or the current one
      const next = futureAlignments.find(e => e.planetaryHour.start > currentTime) || futureAlignments[0]
      const timeUntil = Math.max(0, next.planetaryHour.start.getTime() - currentTime.getTime())
      setNextAlignment({ entry: next, timeUntil })
    } else {
      setNextAlignment(null)
    }
  }, [profile.latitude, profile.longitude, birthMonth, birthDay])

  useEffect(() => {
    compute()
    const interval = setInterval(compute, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [compute])

  // Countdown timer (updates every second)
  const [countdown, setCountdown] = useState('')
  useEffect(() => {
    const tick = () => {
      if (nextAlignment && nextAlignment.timeUntil > 0) {
        const diff = Math.max(0, nextAlignment.entry.planetaryHour.start.getTime() - Date.now())
        const h = Math.floor(diff / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        const s = Math.floor((diff % 60000) / 1000)
        setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
      } else if (activeAlignments.length > 0 && currentPH) {
        const diff = Math.max(0, currentPH.end.getTime() - Date.now())
        const h = Math.floor(diff / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        const s = Math.floor((diff % 60000) / 1000)
        setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
      } else {
        setCountdown('--:--:--')
      }
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [nextAlignment, activeAlignments, currentPH])

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--accent-cyan)' }}>
            SUPREME ALIGNMENT
          </h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {dayNames[now.getDay()]} • {now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {profile.city}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Welcome back,</p>
          <p className="text-lg font-bold">{profile.first_name}</p>
        </div>
      </div>

      {/* Status Banner */}
      {activeAlignments.length > 0 && (
        <div className="alignment-active mb-6 rounded-lg p-4" style={{
          background: `linear-gradient(135deg, ${activeAlignments[0].color}15, ${activeAlignments[0].color}05)`,
          border: `1px solid ${activeAlignments[0].color}40`,
        }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{activeAlignments[0].icon}</span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider" style={{ color: activeAlignments[0].color }}>
                {activeAlignments[0].label} — ACTIVE NOW
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Window closes in {countdown}
              </p>
            </div>
          </div>
          {activeAlignments.map((a, i) => (
            <p key={i} className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
              {a.suggestion}
            </p>
          ))}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Current Planetary Hour */}
        <div className="terminal-card p-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            Planetary Hour
          </p>
          {currentPH && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl" style={{ color: PLANET_COLORS[currentPH.planet] }}>
                  {PLANET_SYMBOLS[currentPH.planet]}
                </span>
                <div>
                  <p className="text-xl font-bold" style={{ color: PLANET_COLORS[currentPH.planet] }}>
                    {currentPH.planet}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {currentPH.isDay ? '☀ Day' : '☾ Night'} Hour #{currentPH.isDay ? currentPH.hourIndex + 1 : currentPH.hourIndex - 11}
                  </p>
                </div>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {formatTime(currentPH.start)} — {formatTime(currentPH.end)}
              </p>
            </>
          )}
        </div>

        {/* Personal Numerology */}
        <div className="terminal-card p-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            Personal Numbers
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Year</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-purple)' }}>{numerology.personalYear}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Month</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-purple)' }}>{numerology.personalMonth}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Day</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>{numerology.personalDay}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Hour</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-cyan)' }}>{numerology.personalHour}</p>
            </div>
          </div>
        </div>

        {/* Sun Data */}
        <div className="terminal-card p-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            Solar Data
          </p>
          {sunTimes && (
            <div className="space-y-3">
              <div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sunrise</p>
                <p className="text-lg font-bold" style={{ color: 'var(--accent-amber)' }}>
                  ☀ {formatTime(sunTimes.sunrise)}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sunset</p>
                <p className="text-lg font-bold" style={{ color: 'var(--accent-pink)' }}>
                  ☾ {formatTime(sunTimes.sunset)}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Coords</p>
                <p className="text-xs font-mono">{profile.latitude.toFixed(4)}°N, {profile.longitude.toFixed(4)}°W</p>
              </div>
            </div>
          )}
        </div>

        {/* Next Alignment Countdown */}
        <div className="terminal-card p-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            {activeAlignments.length > 0 ? 'Current Window Closes' : 'Next Alignment'}
          </p>
          <p className="text-3xl font-bold tracking-wider mb-2" style={{
            color: activeAlignments.length > 0 ? 'var(--accent-green)' : 'var(--accent-cyan)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {countdown}
          </p>
          {activeAlignments.length > 0 ? (
            <p className="text-xs" style={{ color: 'var(--accent-green)' }}>
              {activeAlignments.map(a => a.icon).join(' ')} ALIGNMENT ACTIVE
            </p>
          ) : nextAlignment ? (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {nextAlignment.entry.alignments.map(a => a.icon).join(' ')}{' '}
              {nextAlignment.entry.alignments.map(a => a.label).join(', ')}
            </p>
          ) : (
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              No more alignments today
            </p>
          )}
        </div>
      </div>

      {/* 24-Hour Timeline */}
      <div className="terminal-card p-5 mb-6">
        <p className="text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
          24-Hour Alignment Timeline
        </p>

        {/* Timeline bars */}
        <div className="flex gap-[2px] items-end mb-2" style={{ height: '120px' }}>
          {timeline.map((entry, idx) => {
            const isActive = currentPH && entry.planetaryHour.hourIndex === currentPH.hourIndex
            const hasAlignment = entry.alignments.length > 0
            const barHeight = hasAlignment ? '100%' : '40%'
            const planet = entry.planetaryHour.planet

            return (
              <div
                key={idx}
                className="timeline-hour flex-1 rounded-t-sm relative group"
                style={{
                  height: barHeight,
                  background: hasAlignment
                    ? `linear-gradient(to top, ${PLANET_COLORS[planet]}40, ${entry.alignments[0].color}80)`
                    : `${PLANET_COLORS[planet]}30`,
                  border: isActive ? `2px solid ${PLANET_COLORS[planet]}` : 'none',
                  boxShadow: isActive ? `0 0 10px ${PLANET_COLORS[planet]}40` : 'none',
                }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div className="terminal-card p-3 min-w-[200px] text-xs">
                    <p className="font-bold" style={{ color: PLANET_COLORS[planet] }}>
                      {PLANET_SYMBOLS[planet]} {planet} Hour
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {formatTime(entry.planetaryHour.start)} — {formatTime(entry.planetaryHour.end)}
                    </p>
                    <p className="mt-1">Personal Hour: <span style={{ color: 'var(--accent-cyan)' }}>{entry.personalHour}</span></p>
                    {hasAlignment && (
                      <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
                        {entry.alignments.map((a, i) => (
                          <p key={i} style={{ color: a.color }}>
                            {a.icon} {a.label}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Alignment dot */}
                {hasAlignment && (
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{ background: entry.alignments[0].color }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Time labels */}
        <div className="flex gap-[2px]">
          {timeline.map((entry, idx) => (
            <div key={idx} className="flex-1 text-center">
              <p className="text-[8px] md:text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                {entry.clockHourLabel}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Hour Table */}
      <div className="terminal-card p-5">
        <p className="text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
          Hour-by-Hour Breakdown
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="text-left py-2 px-2">TIME</th>
                <th className="text-left py-2 px-2">PLANET</th>
                <th className="text-center py-2 px-2">P.HOUR</th>
                <th className="text-left py-2 px-2">TYPE</th>
                <th className="text-left py-2 px-2">ALIGNMENTS</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((entry, idx) => {
                const isActive = currentPH && entry.planetaryHour.hourIndex === currentPH.hourIndex
                const planet = entry.planetaryHour.planet

                return (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      background: isActive ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
                    }}
                  >
                    <td className="py-2 px-2 font-mono" style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                      {isActive && '▸ '}{entry.clockHourLabel}
                    </td>
                    <td className="py-2 px-2">
                      <span style={{ color: PLANET_COLORS[planet] }}>
                        {PLANET_SYMBOLS[planet]} {planet}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center font-bold" style={{ color: 'var(--accent-purple)' }}>
                      {entry.personalHour}
                    </td>
                    <td className="py-2 px-2" style={{ color: 'var(--text-secondary)' }}>
                      {entry.planetaryHour.isDay ? '☀ Day' : '☾ Night'}
                    </td>
                    <td className="py-2 px-2">
                      {entry.alignments.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {entry.alignments.map((a, i) => (
                            <span
                              key={i}
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
                              style={{
                                background: `${a.color}20`,
                                color: a.color,
                                border: `1px solid ${a.color}40`,
                              }}
                            >
                              {a.icon} {a.label}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)' }}>—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alignment Legend */}
      <div className="terminal-card p-5 mt-6">
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
          Alignment Legend
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: '💰', label: 'Financial & Power', desc: 'Jupiter/Venus + PH 3 or 8', color: '#10B981' },
            { icon: '💜', label: 'Love & Connection', desc: 'Venus/Moon + PH 2 or 6', color: '#EC4899' },
            { icon: '⚡', label: 'Health & Wellness', desc: 'Sun/Mars + PH 1 or 4', color: '#F59E0B' },
            { icon: '✨', label: 'Creativity & Fun', desc: 'Mercury/Sun + PH 3 or 5', color: '#8B5CF6' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded" style={{ background: `${item.color}10` }}>
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-xs font-bold" style={{ color: item.color }}>{item.label}</p>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
