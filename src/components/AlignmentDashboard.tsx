'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  calculateCalendarDayHours,
  findCurrentPlanetaryHour,
  getSunTimes,
  PLANET_COLORS,
  PLANET_SYMBOLS,
  type PlanetaryHour,
} from '@/lib/planetary-hours'
import { calculateNumerology, calculateAllPersonalHours, personalYear, personalMonth as calcPersonalMonth } from '@/lib/numerology'
import { findAlignments, type Alignment, type AlignmentTier } from '@/lib/alignment-engine'
import { calculateNatalChart } from '@/lib/natal-chart'
import { calculateMultiLotZR, getHourLotMatches, checkZRAlignment, classifyPlanetNature, getProsperityLevel, type MultiLotZRState, type LotType } from '@/lib/zodiacal-releasing'
import { type ZRContext } from '@/lib/alignment-engine'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import ZRPanel from './ZRPanel'

interface NavLink {
  href: string
  label: string
  color: string
}

interface UserProfile {
  first_name: string
  date_of_birth: string
  city: string
  latitude: number
  longitude: number
  birth_time?: string | null
  birth_city?: string | null
  birth_latitude?: number | null
  birth_longitude?: number | null
}

interface TimelineEntry {
  planetaryHour: PlanetaryHour
  personalHour: number
  alignments: Alignment[]
  clockHourLabel: string
  bestTier: AlignmentTier | null
  zrMatch: boolean
  zrLotMatches: { lot: LotType; domain: string; icon: string }[]
  zrScore: number // 0-4 how many lots' L4 ruler matches this hour's planet
}

// Alignment details for expanded view
const ALIGNMENT_DETAILS: Record<string, { description: string; examples: string[] }> = {
  financial: {
    description:
      'This window occurs when expansive Jupiter or magnetic Venus governs the planetary hour while your personal numerological cycle hits a power frequency (3 or 8). Environmental abundance energy aligns with your internal manifestation cycle.',
    examples: [
      'Execute stock trades or rebalance your portfolio',
      'Sign contracts, leases, or business agreements',
      'Launch a new product, service, or revenue stream',
      'Send invoices or negotiate rates and salaries',
      'Apply for funding, loans, or financial partnerships',
    ],
  },
  love: {
    description:
      'This window occurs when Venus (love) or the Moon (emotion) governs the planetary hour while your personal cycle resonates at 2 (partnership) or 6 (harmony). Interpersonal magnetism and emotional intelligence peak.',
    examples: [
      'Schedule a first date or plan a romantic evening',
      'Have a difficult but necessary conversation with a partner',
      'Reach out to reconnect with old friends or family',
      'Attend networking events or social gatherings',
      'Resolve conflicts — your diplomacy is heightened',
    ],
  },
  health: {
    description:
      'This window occurs when the Sun (vitality) or Mars (physical energy) governs the planetary hour while your personal cycle hits 1 (new beginnings) or 4 (structure). Your body\'s receptivity to physical challenge and healing is amplified.',
    examples: [
      'Start a new workout routine or try a new sport',
      'Do your most intense physical training of the day',
      'Schedule medical checkups or health screenings',
      'Begin a new diet, supplement, or wellness protocol',
      'Practice breathwork, cold exposure, or recovery work',
    ],
  },
  creativity: {
    description:
      'This window occurs when Mercury (intellect) or the Sun (self-expression) governs the planetary hour while your personal cycle resonates at 3 (expression) or 5 (freedom). Creative bandwidth and originality peak here.',
    examples: [
      'Brainstorm new ideas, strategies, or concepts',
      'Write, design, compose music, or create content',
      'Record videos, podcasts, or social media posts',
      'Engage in hobbies that bring you joy and flow',
      'Pitch creative ideas to collaborators or clients',
    ],
  },
  spiritual: {
    description:
      'This window occurs when Saturn (karmic discipline, deep structure) or the Moon (intuition, subconscious, inner knowing) governs the planetary hour while your personal cycle resonates at 7 (spiritual wisdom, introspection) or 9 (transcendence, completion, higher purpose). Your connection to the unseen is amplified.',
    examples: [
      'Meditate, pray, or practice breathwork and stillness',
      'Journal for self-reflection, shadow work, or dream analysis',
      'Pull tarot/oracle cards or consult divination tools',
      'Study sacred texts, philosophy, or metaphysical subjects',
      'Practice energy work, reiki, or sound healing',
    ],
  },
}

const TIER_COLORS: Record<AlignmentTier, string> = {
  'standard': '',
  'supreme': 'var(--tier-supreme)',
  'super-supreme': 'var(--tier-super)',
  'transcendent': 'var(--tier-transcendent)',
  'super-transcendent': 'var(--tier-super-transcendent)',
}

export default function AlignmentDashboard({ profile, navLinks = [] }: { profile: UserProfile; navLinks?: NavLink[] }) {
  const searchParams = useSearchParams()
  const [now, setNow] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [isViewingToday, setIsViewingToday] = useState(true)
  const [currentPH, setCurrentPH] = useState<PlanetaryHour | null>(null)
  const [numerology, setNumerology] = useState({ personalYear: 0, personalMonth: 0, personalDay: 0, personalHour: 0 })
  const [activeAlignments, setActiveAlignments] = useState<Alignment[]>([])
  const [timeline, setTimeline] = useState<TimelineEntry[]>([])
  const [nextAlignment, setNextAlignment] = useState<{ entry: TimelineEntry; timeUntil: number } | null>(null)
  const [sunTimes, setSunTimes] = useState<{ sunrise: Date; sunset: Date } | null>(null)
  const [expandedAlignment, setExpandedAlignment] = useState<string | null>(null)
  const [countdown, setCountdown] = useState('')
  const [multiLotZR, setMultiLotZR] = useState<MultiLotZRState | null>(null)

  const dataRef = useRef<{
    nextAlignment: typeof nextAlignment
    activeAlignments: Alignment[]
    currentPH: PlanetaryHour | null
  }>({ nextAlignment: null, activeAlignments: [], currentPH: null })

  const birthParts = profile.date_of_birth.split('-')
  const birthMonth = parseInt(birthParts[1], 10)
  const birthDay = parseInt(birthParts[2], 10)
  const lat = typeof profile.latitude === 'string' ? parseFloat(profile.latitude as string) : profile.latitude
  const lon = typeof profile.longitude === 'string' ? parseFloat(profile.longitude as string) : profile.longitude

  // Initialize selected date — read from URL ?date= param if present (from calendar page)
  useEffect(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const todayStr = `${yyyy}-${mm}-${dd}`

    const urlDate = searchParams.get('date')
    if (urlDate && /^\d{4}-\d{2}-\d{2}$/.test(urlDate)) {
      setSelectedDate(urlDate)
      setIsViewingToday(urlDate === todayStr)
    } else {
      setSelectedDate(todayStr)
    }
  }, [searchParams])

  const compute = useCallback(() => {
    const currentTime = new Date()
    setNow(currentTime)

    // Determine which date to compute for
    const viewDate = isViewingToday ? currentTime : new Date(selectedDate + 'T12:00:00')

    // Planetary hours for the viewed calendar day (midnight to midnight)
    const hours = calculateCalendarDayHours(viewDate, lat, lon)

    // Current planetary hour (always based on NOW, for the live indicator)
    const current = findCurrentPlanetaryHour(currentTime, lat, lon)
    setCurrentPH(current)
    dataRef.current.currentPH = current

    // Sun times for viewed date
    const st = getSunTimes(viewDate, lat, lon)
    setSunTimes(st)

    // Numerology for current time
    const numProfile = calculateNumerology(birthMonth, birthDay, currentTime)
    setNumerology(numProfile)

    // Numerology for the viewed date
    const viewYear = viewDate.getFullYear()
    const viewMonth = viewDate.getMonth() + 1
    const viewDay = viewDate.getDate()
    const pYear = personalYear(birthMonth, birthDay, viewYear)
    const pMonth = calcPersonalMonth(pYear, viewMonth)

    // Calculate Zodiacal Releasing (all 4 Lots) if birth data available
    let currentMultiLot: MultiLotZRState | null = null
    if (profile.birth_time && profile.birth_latitude != null && profile.birth_longitude != null) {
      const [bHour, bMinute] = profile.birth_time.split(':').map(Number)
      const natal = calculateNatalChart({
        birthYear: parseInt(birthParts[0], 10),
        birthMonth,
        birthDay,
        birthHour: bHour,
        birthMinute: bMinute,
        birthLat: profile.birth_latitude,
        birthLng: profile.birth_longitude,
      })
      const birthDate = new Date(
        parseInt(birthParts[0], 10), birthMonth - 1, birthDay,
        bHour, bMinute
      )
      currentMultiLot = calculateMultiLotZR(
        {
          fortune: natal.lotOfFortuneSignIndex,
          spirit: natal.lotOfSpiritSignIndex,
          eros: natal.lotOfErosSignIndex,
          victory: natal.lotOfVictorySignIndex,
        },
        birthDate,
        currentTime
      )
      setMultiLotZR(currentMultiLot)
    } else {
      setMultiLotZR(null)
    }

    // Helper to build ZRContext for a given planetary hour planet
    const buildZRContext = (hourPlanet: typeof current extends null ? never : NonNullable<typeof current>['planet']): ZRContext | null => {
      if (!currentMultiLot) return null
      const lotTypes: LotType[] = ['fortune', 'spirit', 'eros', 'victory']
      const anyLotAligned = lotTypes.some(l => checkZRAlignment(currentMultiLot![l].zr.l4.ruler, hourPlanet))

      // For each theme, check if the relevant lot(s) have benefic/mildly-benefic L4
      const themeRelevantBenefic: Record<string, boolean> = {}
      const THEME_LOT_MAP: Record<string, string[]> = {
        financial: ['victory', 'spirit'],
        love: ['eros', 'fortune'],
        health: ['fortune', 'victory'],
        creativity: ['spirit', 'eros'],
        spiritual: ['spirit', 'fortune'],
      }
      for (const [theme, lots] of Object.entries(THEME_LOT_MAP)) {
        themeRelevantBenefic[theme] = lots.some(l => {
          const nature = currentMultiLot![l as LotType].l4Nature
          return nature === 'benefic' || nature === 'mildly-benefic'
        })
      }

      return {
        anyLotAligned,
        themeRelevantBenefic: themeRelevantBenefic as Record<'financial' | 'love' | 'health' | 'creativity' | 'spiritual', boolean>,
        isCosmicConvergence: currentMultiLot.isCosmicConvergence,
        convergenceScore: currentMultiLot.convergenceScore,
      }
    }

    // Active alignments for current hour (live)
    if (current && isViewingToday) {
      const zrCtx = buildZRContext(current.planet)
      const aligns = findAlignments(current.planet, numProfile.personalHour, numProfile.personalDay, numProfile.personalMonth, zrCtx)
      setActiveAlignments(aligns)
      dataRef.current.activeAlignments = aligns
    } else {
      setActiveAlignments([])
      dataRef.current.activeAlignments = []
    }

    // Build timeline for viewed date
    const personalHoursAll = calculateAllPersonalHours(birthMonth, birthDay, viewDate)
    const nowMs = currentTime.getTime()
    const entries: TimelineEntry[] = hours.map((ph) => {
      const mins = ph.start.getMinutes()
      const startClockHour = ph.start.getHours()
      const period = startClockHour >= 12 ? 'PM' : 'AM'
      const displayHour = startClockHour === 0 ? 12 : startClockHour > 12 ? startClockHour - 12 : startClockHour
      const label = `${displayHour}:${mins.toString().padStart(2, '0')} ${period}`

      // Check if this planetary hour is currently active
      const isCurrentlyActive = isViewingToday && nowMs >= ph.start.getTime() && nowMs < ph.end.getTime()

      // For the active planetary hour, use the CURRENT clock hour (matches the banner)
      // For all other hours, use the planetary hour's start time
      const clockHourForCalc = isCurrentlyActive ? currentTime.getHours() : startClockHour
      const pHour = personalHoursAll[clockHourForCalc] ?? 0

      // For the viewed date, use the correct personal day
      const { personalDay: pDayForDate } = calculateNumerology(birthMonth, birthDay, new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), clockHourForCalc))
      const hourZrCtx = buildZRContext(ph.planet)
      const hourLotMatches = currentMultiLot ? getHourLotMatches(currentMultiLot, ph.planet) : []
      const hourZrMatch = hourLotMatches.length > 0
      const alignsCorrect = findAlignments(ph.planet, pHour, pDayForDate, pMonth, hourZrCtx)

      const bestTier = alignsCorrect.length > 0
        ? (alignsCorrect.some(a => a.tier === 'super-transcendent') ? 'super-transcendent' as const
          : alignsCorrect.some(a => a.tier === 'transcendent') ? 'transcendent' as const
          : alignsCorrect.some(a => a.tier === 'super-supreme') ? 'super-supreme' as const
          : alignsCorrect.some(a => a.tier === 'supreme') ? 'supreme' as const
          : 'standard' as const)
        : null

      return {
        planetaryHour: ph,
        personalHour: pHour,
        alignments: alignsCorrect,
        clockHourLabel: label,
        bestTier,
        zrMatch: hourZrMatch,
        zrLotMatches: hourLotMatches,
        zrScore: hourLotMatches.length,
      }
    })
    setTimeline(entries)

    // Find next alignment (only relevant when viewing today)
    if (isViewingToday) {
      const futureWithAlignments = entries.filter(
        (e) => e.alignments.length > 0 && e.planetaryHour.end.getTime() > nowMs
      )

      if (futureWithAlignments.length > 0) {
        const currentlyActive = futureWithAlignments.find(
          (e) => nowMs >= e.planetaryHour.start.getTime() && nowMs < e.planetaryHour.end.getTime()
        )
        const upcoming = futureWithAlignments.find(
          (e) => e.planetaryHour.start.getTime() > nowMs
        )

        if (currentlyActive && activeAlignments.length > 0) {
          setNextAlignment({ entry: currentlyActive, timeUntil: 0 })
          dataRef.current.nextAlignment = { entry: currentlyActive, timeUntil: 0 }
        } else if (upcoming) {
          const timeUntil = upcoming.planetaryHour.start.getTime() - nowMs
          setNextAlignment({ entry: upcoming, timeUntil })
          dataRef.current.nextAlignment = { entry: upcoming, timeUntil }
        } else {
          setNextAlignment(null)
          dataRef.current.nextAlignment = null
        }
      } else {
        setNextAlignment(null)
        dataRef.current.nextAlignment = null
      }
    } else {
      setNextAlignment(null)
      dataRef.current.nextAlignment = null
    }

  }, [lat, lon, birthMonth, birthDay, selectedDate, isViewingToday, activeAlignments.length, profile.birth_time, profile.birth_latitude, profile.birth_longitude, birthParts])

  useEffect(() => {
    if (!selectedDate) return
    compute()
    const interval = setInterval(compute, 30000)
    return () => clearInterval(interval)
  }, [compute, selectedDate])

  // Countdown timer
  useEffect(() => {
    const tick = () => {
      const ref = dataRef.current
      if (ref.activeAlignments.length > 0 && ref.currentPH) {
        const diff = Math.max(0, ref.currentPH.end.getTime() - Date.now())
        const h = Math.floor(diff / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        const s = Math.floor((diff % 60000) / 1000)
        setCountdown(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`)
      } else if (ref.nextAlignment && ref.nextAlignment.timeUntil > 0) {
        const diff = Math.max(0, ref.nextAlignment.entry.planetaryHour.start.getTime() - Date.now())
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
  }, [])

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr)
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    setIsViewingToday(dateStr === todayStr)
    setExpandedAlignment(null)
  }

  const goToToday = () => {
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    handleDateChange(todayStr)
  }

  const viewDate = isViewingToday ? now : new Date(selectedDate + 'T12:00:00')

  // Count tiers for the day
  const superTranscendentCount = timeline.filter(e => e.bestTier === 'super-transcendent').length
  const transcendentCount = timeline.filter(e => e.bestTier === 'transcendent').length
  const supremeCount = timeline.filter(e => e.bestTier === 'supreme').length
  const superSupremeCount = timeline.filter(e => e.bestTier === 'super-supreme').length
  const standardCount = timeline.filter(e => e.alignments.length > 0 && e.bestTier === 'standard').length

  // Helper to check if a timeline entry is the current hour
  const isCurrentHour = (entry: TimelineEntry) => {
    if (!isViewingToday || !currentPH) return false
    const nowMs = now.getTime()
    return nowMs >= entry.planetaryHour.start.getTime() && nowMs < entry.planetaryHour.end.getTime()
  }

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap" style={{ position: 'relative', zIndex: 60 }}>
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--accent-cyan)' }}>
            SUPREME ALIGNMENT
          </h1>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {dayNames[viewDate.getDay()]} • {viewDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {profile.city}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {navLinks.length > 0 && (
            <div className="flex gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: link.color,
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          <ThemeToggle />
          <div className="text-right">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Welcome back,</p>
            <p className="text-lg font-bold">{profile.first_name}</p>
          </div>
        </div>
      </div>

      {/* Date Picker */}
      <div className="terminal-card p-4 mb-6" style={{ position: 'relative', zIndex: 55 }}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              View Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={`${new Date().getFullYear()}-01-01`}
              max={`${new Date().getFullYear()}-12-31`}
              className="text-sm"
              style={{ padding: '6px 10px' }}
            />
          </div>
          {!isViewingToday && (
            <button
              onClick={goToToday}
              className="px-3 py-1.5 rounded text-xs font-semibold uppercase"
              style={{ background: 'var(--accent-cyan)', color: 'var(--bg-primary)' }}
            >
              Back to Today
            </button>
          )}
          {!isViewingToday && (
            <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.3)' }}>
              Viewing {viewDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}

          {/* Day summary badges */}
          <div className="flex items-center gap-2 ml-auto">
            {superTranscendentCount > 0 && (
              <span className="text-[10px] px-2 py-1 rounded font-bold" style={{ background: 'rgba(var(--tier-super-transcendent-rgb),0.15)', color: 'var(--tier-super-transcendent)', border: '1px solid rgba(var(--tier-super-transcendent-rgb),0.3)' }}>
                💎 {superTranscendentCount} Super Transcendent
              </span>
            )}
            {transcendentCount > 0 && (
              <span className="text-[10px] px-2 py-1 rounded font-bold" style={{ background: 'rgba(var(--tier-transcendent-rgb),0.15)', color: 'var(--tier-transcendent)', border: '1px solid rgba(var(--tier-transcendent-rgb),0.3)' }}>
                🌌 {transcendentCount} Transcendent
              </span>
            )}
            {superSupremeCount > 0 && (
              <span className="text-[10px] px-2 py-1 rounded font-bold" style={{ background: 'rgba(var(--tier-super-rgb),0.15)', color: 'var(--tier-super)', border: '1px solid rgba(var(--tier-super-rgb),0.3)' }}>
                👑 {superSupremeCount} Super Supreme
              </span>
            )}
            {supremeCount > 0 && (
              <span className="text-[10px] px-2 py-1 rounded font-bold" style={{ background: 'rgba(var(--tier-supreme-rgb),0.15)', color: 'var(--tier-supreme)', border: '1px solid rgba(var(--tier-supreme-rgb),0.3)' }}>
                ⚜️ {supremeCount} Supreme
              </span>
            )}
            {standardCount > 0 && (
              <span className="text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(6,182,212,0.2)' }}>
                {standardCount} Standard
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Active Alignment Banner (only when viewing today) */}
      {isViewingToday && activeAlignments.length > 0 && (
        <div className="alignment-active mb-6 rounded-lg p-4" style={{
          background: activeAlignments.some(a => a.tier === 'super-transcendent')
            ? 'linear-gradient(135deg, rgba(var(--tier-super-transcendent-rgb),0.15), rgba(var(--tier-super-transcendent-rgb),0.03))'
            : activeAlignments.some(a => a.tier === 'transcendent')
              ? 'linear-gradient(135deg, rgba(var(--tier-transcendent-rgb),0.15), rgba(var(--tier-transcendent-rgb),0.03))'
              : activeAlignments.some(a => a.tier === 'super-supreme')
                ? 'linear-gradient(135deg, rgba(var(--tier-super-rgb),0.15), rgba(var(--tier-super-rgb),0.03))'
                : activeAlignments.some(a => a.tier === 'supreme')
                  ? 'linear-gradient(135deg, rgba(var(--tier-supreme-rgb),0.15), rgba(var(--tier-supreme-rgb),0.03))'
                  : `linear-gradient(135deg, ${activeAlignments[0].color}15, ${activeAlignments[0].color}05)`,
          border: activeAlignments.some(a => a.tier === 'super-transcendent')
            ? '1px solid rgba(var(--tier-super-transcendent-rgb),0.4)'
            : activeAlignments.some(a => a.tier === 'transcendent')
              ? '1px solid rgba(var(--tier-transcendent-rgb),0.4)'
              : activeAlignments.some(a => a.tier === 'super-supreme')
                ? '1px solid rgba(var(--tier-super-rgb),0.4)'
                : activeAlignments.some(a => a.tier === 'supreme')
                  ? '1px solid rgba(var(--tier-supreme-rgb),0.4)'
                  : `1px solid ${activeAlignments[0].color}40`,
        }}>
          {activeAlignments.map((a, i) => (
            <div key={i} className={i > 0 ? 'mt-3' : ''}>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider" style={{
                    color: a.tier === 'super-transcendent' ? 'var(--tier-super-transcendent)' : a.tier === 'transcendent' ? 'var(--tier-transcendent)' : a.tier === 'super-supreme' ? 'var(--tier-super)' : a.tier === 'supreme' ? 'var(--tier-supreme)' : a.color
                  }}>
                    {a.label} — ACTIVE NOW
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Window closes in {countdown}
                  </p>
                </div>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>{a.suggestion}</p>
            </div>
          ))}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Current Planetary Hour */}
        <div className="terminal-card p-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            Current Planetary Hour
          </p>
          {currentPH ? (
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
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading...</p>
          )}
        </div>

        {/* Personal Numerology */}
        <div className="terminal-card p-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            Personal Numbers {!isViewingToday && '(Today)'}
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
          {sunTimes ? (
            <div className="space-y-3">
              <div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sunrise</p>
                <p className="text-lg font-bold" style={{ color: 'var(--accent-amber)' }}>☀ {formatTime(sunTimes.sunrise)}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sunset</p>
                <p className="text-lg font-bold" style={{ color: 'var(--accent-pink)' }}>☾ {formatTime(sunTimes.sunset)}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Coords</p>
                <p className="text-xs font-mono">{lat.toFixed(4)}, {lon.toFixed(4)}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading...</p>
          )}
        </div>

        {/* Next Alignment Countdown */}
        <div className="terminal-card p-5">
          <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
            {!isViewingToday ? 'Day Summary' : activeAlignments.length > 0 ? 'Window Closes In' : 'Next Alignment'}
          </p>
          {!isViewingToday ? (
            <div className="space-y-2">
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                {timeline.filter(e => e.alignments.length > 0).length} alignment windows
              </p>
              {superTranscendentCount > 0 && <p className="text-xs" style={{ color: 'var(--tier-super-transcendent)' }}>💎 {superTranscendentCount} Super Transcendent</p>}
              {transcendentCount > 0 && <p className="text-xs" style={{ color: 'var(--tier-transcendent)' }}>🌌 {transcendentCount} Transcendent</p>}
              {superSupremeCount > 0 && <p className="text-xs" style={{ color: 'var(--tier-super)' }}>👑 {superSupremeCount} Super Supreme</p>}
              {supremeCount > 0 && <p className="text-xs" style={{ color: 'var(--tier-supreme)' }}>⚜️ {supremeCount} Supreme</p>}
              {standardCount > 0 && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{standardCount} Standard</p>}
            </div>
          ) : (
            <>
              <p className="text-3xl font-bold tracking-wider mb-2" style={{
                color: activeAlignments.length > 0 ? 'var(--accent-green)' : nextAlignment ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {countdown}
              </p>
              {activeAlignments.length > 0 ? (
                <p className="text-xs" style={{ color: 'var(--accent-green)' }}>
                  {activeAlignments.map(a => a.icon).join(' ')} ACTIVE
                </p>
              ) : nextAlignment ? (
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {nextAlignment.entry.alignments.map(a => a.icon).join(' ')}{' '}
                  {nextAlignment.entry.alignments[0]?.label}
                </p>
              ) : (
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  No more alignments today
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Tier Legend */}
      <div className="terminal-card p-4 mb-6">
        <div className="flex items-center gap-6 flex-wrap">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Tier System:</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--accent-cyan)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Standard — Planet + Hour aligned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--tier-supreme)' }} />
            <span className="text-xs" style={{ color: 'var(--tier-supreme)' }}>⚜️ Supreme — + Day aligned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--tier-super)' }} />
            <span className="text-xs" style={{ color: 'var(--tier-super)' }}>👑 Super Supreme — + Month aligned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--tier-transcendent)' }} />
            <span className="text-xs" style={{ color: 'var(--tier-transcendent)' }}>🌌 Transcendent — Lot benefic + Hour aligned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ background: 'var(--tier-super-transcendent)' }} />
            <span className="text-xs" style={{ color: 'var(--tier-super-transcendent)' }}>💎 Super Transcendent — + Lot benefic + Month aligned</span>
          </div>
        </div>
      </div>

      {/* Zodiacal Releasing Panel */}
      <div className="mb-6">
        <ZRPanel
          multiLotZR={multiLotZR}
          hasBirthData={!!(profile.birth_time && profile.birth_latitude != null)}
        />
      </div>

      {/* 24-Hour Timeline */}
      <div className="terminal-card p-5 mb-6" style={{ overflow: 'visible' }}>
        <p className="text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
          24-Hour Alignment Timeline
        </p>

        <div className="flex gap-[2px] items-end mb-2 relative" style={{ height: '120px', marginTop: '120px' }}>
          {timeline.map((entry, idx) => {
            const isCurrent = isCurrentHour(entry)
            const hasAlignment = entry.alignments.length > 0
            const barHeight = hasAlignment ? ((entry.bestTier === 'super-transcendent' || entry.bestTier === 'transcendent') ? '100%' : entry.bestTier === 'super-supreme' ? '95%' : entry.bestTier === 'supreme' ? '85%' : '70%') : '35%'
            const planet = entry.planetaryHour.planet
            const tierRgb = entry.bestTier === 'super-transcendent' ? 'var(--tier-super-transcendent-rgb)' : entry.bestTier === 'transcendent' ? 'var(--tier-transcendent-rgb)' : entry.bestTier === 'super-supreme' ? 'var(--tier-super-rgb)' : entry.bestTier === 'supreme' ? 'var(--tier-supreme-rgb)' : ''

            return (
              <div
                key={idx}
                className="timeline-hour flex-1 rounded-t-sm relative group cursor-pointer"
                style={{
                  height: barHeight,
                  background: hasAlignment
                    ? tierRgb
                      ? `linear-gradient(to top, ${PLANET_COLORS[planet]}40, rgba(${tierRgb}, 0.56))`
                      : `linear-gradient(to top, ${PLANET_COLORS[planet]}40, ${entry.alignments[0].color}80)`
                    : `${PLANET_COLORS[planet]}25`,
                  border: isCurrent ? '2px solid #fff' : 'none',
                  boxShadow: isCurrent ? '0 0 12px rgba(255,255,255,0.4)' : hasAlignment && tierRgb ? `0 0 8px rgba(${tierRgb}, 0.19)` : 'none',
                }}
              >
                {/* Current time marker */}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0" style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #fff' }} />
                  </div>
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
                  <div className="p-3 min-w-[220px] text-xs rounded-lg" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    <p className="font-bold" style={{ color: PLANET_COLORS[planet] }}>
                      {PLANET_SYMBOLS[planet]} {planet} Hour
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {formatTime(entry.planetaryHour.start)} — {formatTime(entry.planetaryHour.end)}
                    </p>
                    <p className="mt-1">Personal Hour: <span style={{ color: 'var(--accent-cyan)' }}>{entry.personalHour}</span></p>
                    {isCurrent && <p className="mt-1 font-bold" style={{ color: '#fff' }}>◉ YOU ARE HERE</p>}
                    {entry.zrScore > 0 && (
                      <div className="mt-1">
                        <p style={{ color: 'var(--tier-transcendent)' }}>ZR Lots matched: {entry.zrScore}/4</p>
                        {entry.zrLotMatches.map((m, mi) => (
                          <p key={mi} style={{ color: 'var(--accent-green)' }}>{m.icon} {m.domain}</p>
                        ))}
                      </div>
                    )}
                    {hasAlignment && (
                      <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border-color)' }}>
                        {entry.alignments.map((a, i) => (
                          <p key={i} style={{ color: a.tier === 'super-transcendent' ? 'var(--tier-super-transcendent)' : a.tier === 'transcendent' ? 'var(--tier-transcendent)' : a.tier === 'super-supreme' ? 'var(--tier-super)' : a.tier === 'supreme' ? 'var(--tier-supreme)' : a.color }}>
                            {a.icon} {a.label}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ZR match indicator */}
                {entry.zrMatch && !hasAlignment && (
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--tier-transcendent)', opacity: 0.6 }}
                  />
                )}
                {/* Tier indicator dot */}
                {hasAlignment && (
                  <div
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                    style={{ background: entry.bestTier === 'super-transcendent' ? 'var(--tier-super-transcendent)' : entry.bestTier === 'transcendent' ? 'var(--tier-transcendent)' : entry.bestTier === 'super-supreme' ? 'var(--tier-super)' : entry.bestTier === 'supreme' ? 'var(--tier-supreme)' : entry.alignments[0].color }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Time labels */}
        <div className="flex gap-[2px]">
          {timeline.map((entry, idx) => {
            const isCurrent = isCurrentHour(entry)
            return (
              <div key={idx} className="flex-1 text-center">
                <p className="text-[8px] md:text-[10px]" style={{
                  color: isCurrent ? '#fff' : 'var(--text-secondary)',
                  fontWeight: isCurrent ? 'bold' : 'normal',
                }}>
                  {entry.clockHourLabel.replace(' AM', 'a').replace(' PM', 'p')}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hour-by-Hour Table */}
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
                {multiLotZR && <th className="text-center py-2 px-2" style={{ color: 'var(--tier-transcendent)' }}>ZR</th>}
                <th className="text-left py-2 px-2">ALIGNMENTS</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((entry, idx) => {
                const isCurrent = isCurrentHour(entry)
                const planet = entry.planetaryHour.planet
                const isExpanded = expandedAlignment === `table-${idx}`

                return (
                  <tr
                    key={idx}
                    className={entry.alignments.length > 0 ? 'cursor-pointer' : ''}
                    onClick={() => {
                      if (entry.alignments.length > 0) {
                        setExpandedAlignment(isExpanded ? null : `table-${idx}`)
                      }
                    }}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      background: isCurrent
                        ? 'rgba(255, 255, 255, 0.06)'
                        : entry.bestTier === 'super-transcendent'
                          ? 'rgba(var(--tier-super-transcendent-rgb), 0.06)'
                          : entry.bestTier === 'transcendent'
                            ? 'rgba(var(--tier-transcendent-rgb), 0.06)'
                            : entry.bestTier === 'super-supreme'
                              ? 'rgba(var(--tier-super-rgb), 0.04)'
                              : entry.bestTier === 'supreme'
                                ? 'rgba(var(--tier-supreme-rgb), 0.04)'
                                : 'transparent',
                    }}
                  >
                    <td className="py-2 px-2 font-mono" style={{
                      color: isCurrent ? '#fff' : 'var(--text-secondary)',
                      fontWeight: isCurrent ? 'bold' : 'normal',
                    }}>
                      {isCurrent && '▸ '}{entry.clockHourLabel}
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
                    {multiLotZR && (
                      <td className="py-2 px-2 text-center relative">
                        {entry.zrScore > 0 ? (
                          <span className="group/zr inline-block relative cursor-help">
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold" style={{
                              background: entry.zrScore >= 3
                                ? 'rgba(var(--tier-transcendent-rgb),0.2)'
                                : entry.zrScore >= 1
                                  ? 'rgba(var(--tier-transcendent-rgb),0.12)'
                                  : 'transparent',
                              color: entry.zrScore >= 3 ? 'var(--tier-transcendent)' : 'var(--accent-cyan)',
                              border: entry.zrScore >= 3
                                ? '1px solid rgba(var(--tier-transcendent-rgb),0.4)'
                                : '1px solid rgba(6,182,212,0.3)',
                            }}>
                              {entry.zrScore}/4
                            </span>
                            {/* Hover tooltip */}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/zr:block z-50 pointer-events-none" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
                              <span className="block p-2 min-w-[160px] text-[10px] rounded-lg text-left" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <span className="block font-bold mb-1" style={{ color: 'var(--tier-transcendent)' }}>
                                  ZR Lot Matches ({entry.zrScore}/4)
                                </span>
                                {entry.zrLotMatches.map((m, mi) => (
                                  <span key={mi} className="block" style={{ color: 'var(--accent-green)' }}>
                                    {m.icon} {m.domain}
                                  </span>
                                ))}
                                {entry.zrScore < 4 && (
                                  <span className="block mt-1" style={{ color: 'var(--text-secondary)' }}>
                                    {['fortune', 'spirit', 'eros', 'victory']
                                      .filter(l => !entry.zrLotMatches.some(m => m.lot === l))
                                      .map(l => l === 'fortune' ? '🏦' : l === 'spirit' ? '🧠' : l === 'eros' ? '💜' : '🏆')
                                      .join(' ')}{' '}
                                    not aligned
                                  </span>
                                )}
                              </span>
                            </span>
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>—</span>
                        )}
                      </td>
                    )}
                    <td className="py-2 px-2">
                      {entry.alignments.length > 0 ? (
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {entry.alignments.map((a, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
                                style={{
                                  background: a.tier === 'super-transcendent'
                                    ? 'rgba(var(--tier-super-transcendent-rgb),0.2)'
                                    : a.tier === 'transcendent'
                                      ? 'rgba(var(--tier-transcendent-rgb),0.2)'
                                      : a.tier === 'super-supreme'
                                        ? 'rgba(var(--tier-super-rgb),0.2)'
                                        : a.tier === 'supreme'
                                          ? 'rgba(var(--tier-supreme-rgb),0.2)'
                                          : `${a.color}20`,
                                  color: a.tier === 'super-transcendent'
                                    ? 'var(--tier-super-transcendent)'
                                    : a.tier === 'transcendent'
                                      ? 'var(--tier-transcendent)'
                                      : a.tier === 'super-supreme'
                                        ? 'var(--tier-super)'
                                        : a.tier === 'supreme'
                                          ? 'var(--tier-supreme)'
                                          : a.color,
                                  border: `1px solid ${a.tier === 'super-transcendent' ? 'rgba(var(--tier-super-transcendent-rgb),0.4)' : a.tier === 'transcendent' ? 'rgba(var(--tier-transcendent-rgb),0.4)' : a.tier === 'super-supreme' ? 'rgba(var(--tier-super-rgb),0.4)' : a.tier === 'supreme' ? 'rgba(var(--tier-supreme-rgb),0.4)' : a.color + '40'}`,
                                }}
                              >
                                {a.icon} {a.label} {isExpanded ? '▾' : '▸'}
                              </span>
                            ))}
                          </div>
                          {isExpanded && (
                            <div className="mt-3 space-y-3">
                              {entry.alignments.map((a, i) => {
                                const detail = ALIGNMENT_DETAILS[a.theme]
                                if (!detail) return null
                                return (
                                  <div key={i} className="p-3 rounded-lg" style={{
                                    background: a.tier === 'super-transcendent' ? 'rgba(var(--tier-super-transcendent-rgb),0.06)' : a.tier === 'transcendent' ? 'rgba(var(--tier-transcendent-rgb),0.06)' : a.tier === 'super-supreme' ? 'rgba(var(--tier-super-rgb),0.06)' : a.tier === 'supreme' ? 'rgba(var(--tier-supreme-rgb),0.06)' : `${a.color}08`,
                                    border: `1px solid ${a.tier === 'super-transcendent' ? 'rgba(var(--tier-super-transcendent-rgb),0.2)' : a.tier === 'transcendent' ? 'rgba(var(--tier-transcendent-rgb),0.2)' : a.tier === 'super-supreme' ? 'rgba(var(--tier-super-rgb),0.2)' : a.tier === 'supreme' ? 'rgba(var(--tier-supreme-rgb),0.2)' : a.color + '25'}`,
                                  }}>
                                    <p className="text-xs font-bold mb-1" style={{
                                      color: a.tier === 'super-transcendent' ? 'var(--tier-super-transcendent)' : a.tier === 'transcendent' ? 'var(--tier-transcendent)' : a.tier === 'super-supreme' ? 'var(--tier-super)' : a.tier === 'supreme' ? 'var(--tier-supreme)' : a.color
                                    }}>
                                      {a.icon} {a.label}
                                    </p>
                                    <p className="text-[11px] mb-2 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                                      {a.suggestion}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
                                      Suggested Actions:
                                    </p>
                                    <ul className="space-y-1">
                                      {detail.examples.map((ex, j) => (
                                        <li key={j} className="text-[11px] flex items-start gap-1.5" style={{ color: 'var(--text-primary)' }}>
                                          <span style={{ color: a.tier === 'super-transcendent' ? 'var(--tier-super-transcendent)' : a.tier === 'transcendent' ? 'var(--tier-transcendent)' : a.tier === 'super-supreme' ? 'var(--tier-super)' : a.tier === 'supreme' ? 'var(--tier-supreme)' : a.color }}>›</span> {ex}
                                        </li>
                                      ))}
                                    </ul>
                                    <p className="text-[11px] mt-2 italic" style={{ color: 'var(--text-secondary)' }}>
                                      Window: {formatTime(entry.planetaryHour.start)} — {formatTime(entry.planetaryHour.end)}
                                    </p>
                                  </div>
                                )
                              })}
                            </div>
                          )}
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
          Alignment Reference
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { icon: '💰', label: 'Financial & Power', desc: 'Jupiter/Venus + PH 3 or 8', color: '#10B981', theme: 'financial' },
            { icon: '💜', label: 'Love & Connection', desc: 'Venus/Moon + PH 2 or 6', color: '#EC4899', theme: 'love' },
            { icon: '⚡', label: 'Health & Wellness', desc: 'Sun/Mars + PH 1 or 4', color: '#F59E0B', theme: 'health' },
            { icon: '✨', label: 'Creativity & Fun', desc: 'Mercury/Sun + PH 3 or 5', color: '#8B5CF6', theme: 'creativity' },
            { icon: '🔮', label: 'Spiritual & Intuition', desc: 'Saturn/Moon + PH 7 or 9', color: '#6366F1', theme: 'spiritual' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded cursor-pointer transition-all"
              style={{ background: expandedAlignment === `legend-${item.theme}` ? `${item.color}15` : `${item.color}08` }}
              onClick={() => setExpandedAlignment(expandedAlignment === `legend-${item.theme}` ? null : `legend-${item.theme}`)}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: item.color }}>{item.label}</p>
                <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                {expandedAlignment === `legend-${item.theme}` && ALIGNMENT_DETAILS[item.theme] && (
                  <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${item.color}25` }}>
                    <p className="text-[11px] mb-2 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {ALIGNMENT_DETAILS[item.theme].description}
                    </p>
                    <ul className="space-y-0.5">
                      {ALIGNMENT_DETAILS[item.theme].examples.map((ex, j) => (
                        <li key={j} className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                          <span style={{ color: item.color }}>›</span> {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
