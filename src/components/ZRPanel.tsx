'use client'

import { useEffect, useState } from 'react'
import { type ZRState, type ZRPeriod } from '@/lib/zodiacal-releasing'
import { ZODIAC_SYMBOLS } from '@/lib/natal-chart'
import { PLANET_SYMBOLS, PLANET_COLORS } from '@/lib/planetary-hours'

interface ZRPanelProps {
  zrState: ZRState | null
  zrAligned: boolean
  hasBirthData: boolean
}

function formatCountdown(endDate: Date, now: Date): string {
  const diff = endDate.getTime() - now.getTime()
  if (diff <= 0) return 'Transitioning...'

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 365) {
    const years = Math.floor(days / 365)
    const remainDays = days % 365
    return `${years}y ${remainDays}d`
  }
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

function PeriodRow({ label, period, now }: { label: string; period: ZRPeriod; now: Date }) {
  const rulerColor = PLANET_COLORS[period.ruler]
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono w-6" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span className="text-lg">{ZODIAC_SYMBOLS[period.sign]}</span>
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{period.sign}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm" style={{ color: rulerColor }}>
          {PLANET_SYMBOLS[period.ruler]} {period.ruler}
        </span>
        <span className="text-xs font-mono w-20 text-right" style={{ color: 'var(--text-secondary)' }}>
          {formatCountdown(period.endDate, now)}
        </span>
      </div>
    </div>
  )
}

export default function ZRPanel({ zrState, zrAligned, hasBirthData }: ZRPanelProps) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  if (!hasBirthData) {
    return (
      <div className="terminal-card p-5">
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
          Zodiacal Releasing
        </p>
        <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>
          Add your birth time &amp; birth city in{' '}
          <a href="/settings" style={{ color: 'var(--accent-cyan)' }} className="underline">Settings</a>{' '}
          to unlock Zodiacal Releasing.
        </p>
      </div>
    )
  }

  if (!zrState) {
    return (
      <div className="terminal-card p-5">
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
          Zodiacal Releasing
        </p>
        <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>Calculating...</p>
      </div>
    )
  }

  const badgeStyle = zrState.peakTrough === 'peak'
    ? { background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)', border: '1px solid rgba(16,185,129,0.3)' }
    : zrState.peakTrough === 'trough'
      ? { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }
      : { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }

  return (
    <div className="terminal-card p-5">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Zodiacal Releasing
          </p>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase" style={badgeStyle}>
            {zrState.peakTrough}
          </span>
          {zrState.isLoosingOfBond && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase" style={{
              background: 'rgba(245,158,11,0.1)', color: 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.3)'
            }}>
              Loosing of the Bond
            </span>
          )}
        </div>
        {zrAligned && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase alignment-active" style={{
            background: 'rgba(6,182,212,0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(6,182,212,0.3)'
          }}>
            ZR Aligned
          </span>
        )}
      </div>

      <p className="text-[10px] mb-2" style={{ color: 'var(--text-secondary)' }}>
        Lot of Fortune: {ZODIAC_SYMBOLS[zrState.lotSign]} {zrState.lotSign}
      </p>

      <PeriodRow label="L1" period={zrState.l1} now={now} />
      <PeriodRow label="L2" period={zrState.l2} now={now} />
      <PeriodRow label="L3" period={zrState.l3} now={now} />
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono w-6" style={{ color: 'var(--text-secondary)' }}>L4</span>
          <span className="text-lg">{ZODIAC_SYMBOLS[zrState.l4.sign]}</span>
          <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{zrState.l4.sign}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm" style={{ color: PLANET_COLORS[zrState.l4.ruler] }}>
            {PLANET_SYMBOLS[zrState.l4.ruler]} {zrState.l4.ruler}
          </span>
          <span className="text-xs font-mono w-20 text-right" style={{ color: 'var(--text-secondary)' }}>
            {formatCountdown(zrState.l4.endDate, now)}
          </span>
        </div>
      </div>
    </div>
  )
}
