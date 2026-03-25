'use client'

import { useEffect, useState } from 'react'
import { type ZRPeriod, type MultiLotZRState, type LotZRState, type LotType, type ProsperityLevel } from '@/lib/zodiacal-releasing'
import { ZODIAC_SYMBOLS } from '@/lib/natal-chart'
import { PLANET_SYMBOLS, PLANET_COLORS } from '@/lib/planetary-hours'

interface ZRPanelProps {
  multiLotZR: MultiLotZRState | null
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

const PROSPERITY_STYLES: Record<ProsperityLevel, { bg: string; color: string; border: string; label: string }> = {
  prosperous: {
    bg: 'rgba(16,185,129,0.1)',
    color: 'var(--accent-green)',
    border: '1px solid rgba(16,185,129,0.3)',
    label: 'Prosperous',
  },
  favorable: {
    bg: 'rgba(245,158,11,0.1)',
    color: 'var(--accent-amber)',
    border: '1px solid rgba(245,158,11,0.3)',
    label: 'Favorable',
  },
  variable: {
    bg: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
    label: 'Variable',
  },
  challenging: {
    bg: 'rgba(239,68,68,0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239,68,68,0.3)',
    label: 'Challenging',
  },
}

function PeriodRow({ label, period, now }: { label: string; period: ZRPeriod; now: Date }) {
  const rulerColor = PLANET_COLORS[period.ruler]
  return (
    <div className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono w-5" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span className="text-sm">{ZODIAC_SYMBOLS[period.sign]}</span>
        <span className="text-xs" style={{ color: 'var(--text-primary)' }}>{period.sign}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: rulerColor }}>
          {PLANET_SYMBOLS[period.ruler]} {period.ruler}
        </span>
        <span className="text-[10px] font-mono w-16 text-right" style={{ color: 'var(--text-secondary)' }}>
          {formatCountdown(period.endDate, now)}
        </span>
      </div>
    </div>
  )
}

function LotCard({ lotState, now }: { lotState: LotZRState; now: Date }) {
  const [expanded, setExpanded] = useState(false)
  const prosperity = PROSPERITY_STYLES[lotState.prosperity]
  const rulerColor = PLANET_COLORS[lotState.zr.l4.ruler]

  return (
    <div
      className="rounded-lg p-3"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      {/* Lot Header — always visible */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-base">{lotState.domainIcon}</span>
          <div>
            <span className="text-xs font-bold capitalize" style={{ color: 'var(--text-primary)' }}>
              {lotState.lotType}
            </span>
            <span className="text-[10px] ml-1.5" style={{ color: 'var(--text-secondary)' }}>
              {lotState.domain}
            </span>
          </div>
        </div>
        <span
          className="text-[9px] font-semibold px-2 py-0.5 rounded uppercase"
          style={{ background: prosperity.bg, color: prosperity.color, border: prosperity.border }}
        >
          {prosperity.label}
        </span>
      </div>

      {/* L4 Row — always visible */}
      <div className="flex items-center justify-between py-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono w-5" style={{ color: 'var(--text-secondary)' }}>L4</span>
          <span className="text-sm">{ZODIAC_SYMBOLS[lotState.zr.l4.sign]}</span>
          <span className="text-xs" style={{ color: 'var(--text-primary)' }}>{lotState.zr.l4.sign}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: rulerColor }}>
            {PLANET_SYMBOLS[lotState.zr.l4.ruler]} {lotState.zr.l4.ruler}
          </span>
          <span className="text-[10px] font-mono w-16 text-right" style={{ color: 'var(--text-secondary)' }}>
            {formatCountdown(lotState.zr.l4.endDate, now)}
          </span>
        </div>
      </div>

      {/* Peak/Trough + Loosing badges */}
      <div className="flex items-center gap-2 mt-1">
        <span
          className="text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase"
          style={
            lotState.zr.peakTrough === 'peak'
              ? { background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)', border: '1px solid rgba(16,185,129,0.3)' }
              : lotState.zr.peakTrough === 'trough'
                ? { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }
                : { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
          }
        >
          {lotState.zr.peakTrough}
        </span>
        {lotState.zr.isLoosingOfBond && (
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase"
            style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.3)' }}
          >
            Loosing
          </span>
        )}
      </div>

      {/* Collapsible L1-L3 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-[10px] mt-2 w-full text-left"
        style={{ color: 'var(--accent-cyan)' }}
      >
        {expanded ? '▾ Hide L1–L3' : '▸ Show L1–L3'}
      </button>
      {expanded && (
        <div className="mt-1">
          <PeriodRow label="L1" period={lotState.zr.l1} now={now} />
          <PeriodRow label="L2" period={lotState.zr.l2} now={now} />
          <PeriodRow label="L3" period={lotState.zr.l3} now={now} />
        </div>
      )}
    </div>
  )
}

export default function ZRPanel({ multiLotZR, hasBirthData }: ZRPanelProps) {
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

  if (!multiLotZR) {
    return (
      <div className="terminal-card p-5">
        <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
          Zodiacal Releasing
        </p>
        <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>Calculating...</p>
      </div>
    )
  }

  const lots: LotType[] = ['fortune', 'spirit', 'eros', 'victory']
  const convergenceDots = lots.map((lot) => {
    const nature = multiLotZR[lot].l4Nature
    const isBenefic = nature === 'benefic' || nature === 'mildly-benefic'
    return { lot, isBenefic, nature }
  })

  return (
    <div className="terminal-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Zodiacal Releasing
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Convergence Score */}
          <div className="flex items-center gap-1">
            {convergenceDots.map((d, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                title={`${d.lot}: ${d.nature}`}
                style={{
                  background: d.isBenefic ? 'var(--accent-green)' : d.nature === 'neutral' ? 'var(--text-secondary)' : '#ef4444',
                  opacity: d.isBenefic ? 1 : 0.4,
                }}
              />
            ))}
          </div>
          {multiLotZR.isCosmicConvergence && (
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded uppercase alignment-active"
              style={{
                background: 'linear-gradient(135deg, rgba(var(--tier-transcendent-rgb),0.2), rgba(16,185,129,0.2))',
                color: 'var(--tier-transcendent)',
                border: '1px solid rgba(var(--tier-transcendent-rgb),0.4)',
              }}
            >
              Cosmic Convergence {multiLotZR.convergenceScore}/4
            </span>
          )}
          {!multiLotZR.isCosmicConvergence && (
            <span className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>
              {multiLotZR.convergenceScore}/4 benefic
            </span>
          )}
        </div>
      </div>

      {/* 4 Lot Cards in 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {lots.map((lot) => (
          <LotCard key={lot} lotState={multiLotZR[lot]} now={now} />
        ))}
      </div>
    </div>
  )
}
