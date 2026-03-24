'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  calculatePlanetaryHoursForDate,
} from '@/lib/planetary-hours'
import {
  calculateAllPersonalHours,
  personalYear,
  personalMonth as calcPersonalMonth,
  personalDay,
} from '@/lib/numerology'
import { findAlignments, type Alignment, type AlignmentTier, type AlignmentTheme } from '@/lib/alignment-engine'

interface UserProfile {
  first_name: string
  date_of_birth: string
  city: string
  latitude: number
  longitude: number
}

interface DayData {
  date: Date
  alignments: Alignment[]
  total: number
  standardCount: number
  supremeCount: number
  superSupremeCount: number
  bestTier: AlignmentTier | null
  themes: AlignmentTheme[]
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const THEME_ICONS: Record<AlignmentTheme, string> = {
  financial: '\u{1F4B0}',
  love: '\u{1F49C}',
  health: '\u26A1',
  creativity: '\u2728',
  spiritual: '\u{1F52E}',
}

function computeDayAlignments(
  dayDate: Date,
  lat: number,
  lon: number,
  birthMonth: number,
  birthDay: number,
): DayData {
  const hours = calculatePlanetaryHoursForDate(dayDate, lat, lon)
  const personalHoursAll = calculateAllPersonalHours(birthMonth, birthDay, dayDate)
  const pYear = personalYear(birthMonth, birthDay, dayDate.getFullYear())
  const pMonth = calcPersonalMonth(pYear, dayDate.getMonth() + 1)
  const pDay = personalDay(pMonth, dayDate.getDate())

  const dayAlignments: Alignment[] = []
  hours.forEach((ph) => {
    const clockHour = ph.start.getHours()
    const pHour = personalHoursAll[clockHour]
    const aligns = findAlignments(ph.planet, pHour, pDay, pMonth)
    dayAlignments.push(...aligns)
  })

  let standardCount = 0
  let supremeCount = 0
  let superSupremeCount = 0
  let bestTier: AlignmentTier | null = null
  const themeSet = new Set<AlignmentTheme>()

  dayAlignments.forEach((a) => {
    themeSet.add(a.theme)
    if (a.tier === 'super-supreme') {
      superSupremeCount++
      bestTier = 'super-supreme'
    } else if (a.tier === 'supreme') {
      supremeCount++
      if (bestTier !== 'super-supreme') bestTier = 'supreme'
    } else {
      standardCount++
      if (!bestTier) bestTier = 'standard'
    }
  })

  return {
    date: dayDate,
    alignments: dayAlignments,
    total: dayAlignments.length,
    standardCount,
    supremeCount,
    superSupremeCount,
    bestTier,
    themes: Array.from(themeSet),
  }
}

function getDayCellColor(day: DayData): string {
  if (day.superSupremeCount > 0) return 'rgba(249, 115, 22, 0.35)'
  if (day.supremeCount > 0) return 'rgba(245, 158, 11, 0.3)'
  if (day.total >= 4) return 'rgba(6, 182, 212, 0.3)'
  if (day.total >= 1) return 'rgba(6, 182, 212, 0.15)'
  return 'transparent'
}

function getDayCellBorder(day: DayData): string {
  if (day.superSupremeCount > 0) return '1px solid rgba(249, 115, 22, 0.6)'
  if (day.supremeCount > 0) return '1px solid rgba(245, 158, 11, 0.5)'
  if (day.total >= 4) return '1px solid rgba(6, 182, 212, 0.4)'
  if (day.total >= 1) return '1px solid rgba(6, 182, 212, 0.2)'
  return '1px solid var(--border-color)'
}

function tierBadge(tier: AlignmentTier): { color: string; label: string } {
  switch (tier) {
    case 'super-supreme':
      return { color: '#f97316', label: 'SS' }
    case 'supreme':
      return { color: '#f59e0b', label: 'S' }
    default:
      return { color: '#06b6d4', label: 'A' }
  }
}

function formatDateParam(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function getMostCommonTheme(alignments: Alignment[]): AlignmentTheme | null {
  if (alignments.length === 0) return null
  const counts: Partial<Record<AlignmentTheme, number>> = {}
  alignments.forEach((a) => {
    counts[a.theme] = (counts[a.theme] || 0) + 1
  })
  let maxTheme: AlignmentTheme | null = null
  let maxCount = 0
  for (const [theme, count] of Object.entries(counts)) {
    if (count! > maxCount) {
      maxCount = count!
      maxTheme = theme as AlignmentTheme
    }
  }
  return maxTheme
}

export default function CalendarView({ profile }: { profile: UserProfile }) {
  const today = new Date()
  const currentYear = today.getFullYear()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(currentYear)

  const birthParts = profile.date_of_birth.split('-')
  const birthMonth = parseInt(birthParts[1])
  const birthDayNum = parseInt(birthParts[2])
  const lat = profile.latitude
  const lon = profile.longitude

  // Calculate all day data for the visible month
  const monthDays = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const days: DayData[] = []
    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(viewYear, viewMonth, d)
      days.push(computeDayAlignments(dayDate, lat, lon, birthMonth, birthDayNum))
    }
    return days
  }, [viewYear, viewMonth, lat, lon, birthMonth, birthDayNum])

  // Current week data
  const currentWeekDays = useMemo(() => {
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    const week: DayData[] = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek)
      d.setDate(startOfWeek.getDate() + i)
      // Reuse from monthDays if same month, otherwise compute
      if (d.getMonth() === viewMonth && d.getFullYear() === viewYear) {
        const existing = monthDays[d.getDate() - 1]
        if (existing) {
          week.push(existing)
          continue
        }
      }
      week.push(computeDayAlignments(d, lat, lon, birthMonth, birthDayNum))
    }
    return week
  }, [today, monthDays, viewMonth, viewYear, lat, lon, birthMonth, birthDayNum])

  // Monthly stats
  const monthStats = useMemo(() => {
    let totalAlignments = 0
    let supremeTotal = 0
    let superSupremeTotal = 0
    let bestDayIndex = 0
    let bestDayCount = 0
    const allAlignments: Alignment[] = []

    monthDays.forEach((day, idx) => {
      totalAlignments += day.total
      supremeTotal += day.supremeCount
      superSupremeTotal += day.superSupremeCount
      allAlignments.push(...day.alignments)
      if (day.total > bestDayCount) {
        bestDayCount = day.total
        bestDayIndex = idx
      }
    })

    const mostCommon = getMostCommonTheme(allAlignments)
    const bestDay = monthDays[bestDayIndex]

    return {
      totalAlignments,
      supremeTotal,
      superSupremeTotal,
      mostCommonTheme: mostCommon,
      bestDay,
      bestDayCount,
    }
  }, [monthDays])

  // Calendar grid: pad start with empty cells for day-of-week offset
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()

  const canGoPrev = viewYear > currentYear || (viewYear === currentYear && viewMonth > 0)
  const canGoNext = viewYear < currentYear || (viewYear === currentYear && viewMonth < 11)

  function goPrev() {
    if (!canGoPrev) return
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  function goNext() {
    if (!canGoNext) return
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const isToday = (d: Date) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard"
            className="text-sm font-semibold hover:underline"
            style={{ color: 'var(--accent-cyan)' }}
          >
            &larr; Dashboard
          </Link>
          <h1 className="text-xl font-bold" style={{ color: 'var(--accent-amber)' }}>
            ALIGNMENT CALENDAR
          </h1>
          <div style={{ width: 100 }} />
        </div>

        {/* Month Navigation */}
        <div className="terminal-card p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={!canGoPrev}
              className="px-3 py-1 rounded text-sm font-bold"
              style={{
                background: canGoPrev ? 'var(--bg-tertiary)' : 'transparent',
                color: canGoPrev ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                cursor: canGoPrev ? 'pointer' : 'not-allowed',
                opacity: canGoPrev ? 1 : 0.4,
              }}
            >
              &larr; PREV
            </button>
            <span className="text-lg font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              onClick={goNext}
              disabled={!canGoNext}
              className="px-3 py-1 rounded text-sm font-bold"
              style={{
                background: canGoNext ? 'var(--bg-tertiary)' : 'transparent',
                color: canGoNext ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                cursor: canGoNext ? 'pointer' : 'not-allowed',
                opacity: canGoNext ? 1 : 0.4,
              }}
            >
              NEXT &rarr;
            </button>
          </div>
        </div>

        {/* Month Heatmap Grid */}
        <div className="terminal-card p-4 mb-6">
          <p
            className="text-xs uppercase tracking-wider mb-3 font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            MONTH HEATMAP
          </p>

          {/* Day of week headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAY_LABELS.map((label) => (
              <div
                key={label}
                className="text-center text-xs font-bold py-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {monthDays.map((day) => {
              const dayNum = day.date.getDate()
              const todayHighlight = isToday(day.date)
              return (
                <Link
                  key={dayNum}
                  href={`/dashboard?date=${formatDateParam(day.date)}`}
                  className="aspect-square rounded-md p-1 flex flex-col items-center justify-center relative transition-all hover:scale-105"
                  style={{
                    background: getDayCellColor(day),
                    border: todayHighlight
                      ? '2px solid var(--accent-cyan)'
                      : getDayCellBorder(day),
                    textDecoration: 'none',
                    minHeight: 0,
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: todayHighlight ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    }}
                  >
                    {dayNum}
                  </span>
                  {day.total > 0 && (
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {day.total}
                    </span>
                  )}
                  {/* Tier dots */}
                  {day.bestTier && (
                    <div className="flex gap-0.5 mt-0.5">
                      {day.superSupremeCount > 0 && (
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: '#f97316' }}
                          title="Super Supreme"
                        />
                      )}
                      {day.supremeCount > 0 && (
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: '#f59e0b' }}
                          title="Supreme"
                        />
                      )}
                      {day.standardCount > 0 && day.supremeCount === 0 && day.superSupremeCount === 0 && (
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full"
                          style={{ background: '#06b6d4' }}
                          title="Standard"
                        />
                      )}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {[
              { label: 'Standard', color: 'rgba(6, 182, 212, 0.3)', dot: '#06b6d4' },
              { label: 'Supreme', color: 'rgba(245, 158, 11, 0.3)', dot: '#f59e0b' },
              { label: 'Super Supreme', color: 'rgba(249, 115, 22, 0.35)', dot: '#f97316' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ background: item.color, border: `1px solid ${item.dot}` }}
                />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Week Summary Strip */}
        <div className="terminal-card p-4 mb-6">
          <p
            className="text-xs uppercase tracking-wider mb-3 font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            THIS WEEK
          </p>
          <div className="grid grid-cols-7 gap-2">
            {currentWeekDays.map((day) => {
              const dayName = DAY_LABELS[day.date.getDay()]
              const todayHighlight = isToday(day.date)
              const badge = day.bestTier ? tierBadge(day.bestTier) : null
              const topTheme = getMostCommonTheme(day.alignments)
              return (
                <Link
                  key={day.date.toISOString()}
                  href={`/dashboard?date=${formatDateParam(day.date)}`}
                  className="rounded-md p-2 flex flex-col items-center gap-1 transition-all hover:scale-105"
                  style={{
                    background: todayHighlight ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    border: todayHighlight
                      ? '1px solid var(--accent-cyan)'
                      : '1px solid var(--border-color)',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: todayHighlight ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
                  >
                    {dayName}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                    {day.date.getDate()}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: day.total > 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                  >
                    {day.total}
                  </span>
                  {badge && (
                    <span
                      className="text-[9px] font-bold px-1 rounded"
                      style={{
                        background: `${badge.color}22`,
                        color: badge.color,
                        border: `1px solid ${badge.color}44`,
                      }}
                    >
                      {badge.label}
                    </span>
                  )}
                  {topTheme && (
                    <span className="text-xs" title={topTheme}>
                      {THEME_ICONS[topTheme]}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="terminal-card p-4 mb-6">
          <p
            className="text-xs uppercase tracking-wider mb-4 font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            MONTHLY STATS &mdash; {MONTH_NAMES[viewMonth]} {viewYear}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Total alignments */}
            <div
              className="rounded-md p-3 text-center"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
                TOTAL WINDOWS
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-cyan)' }}>
                {monthStats.totalAlignments}
              </p>
            </div>

            {/* Supreme count */}
            <div
              className="rounded-md p-3 text-center"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
                SUPREME
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>
                {monthStats.supremeTotal}
              </p>
            </div>

            {/* Super Supreme count */}
            <div
              className="rounded-md p-3 text-center"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
                SUPER SUPREME
              </p>
              <p className="text-2xl font-bold" style={{ color: '#f97316' }}>
                {monthStats.superSupremeTotal}
              </p>
            </div>

            {/* Most common theme */}
            <div
              className="rounded-md p-3 text-center"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
                TOP THEME
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--accent-purple)' }}>
                {monthStats.mostCommonTheme ? (
                  <>
                    {THEME_ICONS[monthStats.mostCommonTheme]}{' '}
                    <span className="capitalize">{monthStats.mostCommonTheme}</span>
                  </>
                ) : (
                  <span style={{ color: 'var(--text-secondary)' }}>--</span>
                )}
              </p>
            </div>

            {/* Best day */}
            <div
              className="rounded-md p-3 text-center col-span-2 md:col-span-2"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>
                BEST DAY
              </p>
              {monthStats.bestDay && monthStats.bestDayCount > 0 ? (
                <p className="text-lg font-bold" style={{ color: 'var(--accent-green)' }}>
                  {MONTH_NAMES[viewMonth]} {monthStats.bestDay.date.getDate()} &mdash;{' '}
                  {monthStats.bestDayCount} alignment{monthStats.bestDayCount !== 1 ? 's' : ''}
                </p>
              ) : (
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>--</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
