import { type Planet } from './planetary-hours'
import { type ZodiacSign, ZODIAC_SIGNS, ZODIAC_SYMBOLS } from './natal-chart'

export interface ZRPeriod {
  sign: ZodiacSign
  signIndex: number
  symbol: string
  ruler: Planet
  startDate: Date
  endDate: Date
  durationMs: number
}

export interface ZRState {
  l1: ZRPeriod
  l2: ZRPeriod
  l3: ZRPeriod
  l4: ZRPeriod
  peakTrough: 'peak' | 'trough' | 'neutral'
  isLoosingOfBond: boolean
  lotSign: ZodiacSign
  lotSignIndex: number
}

// Minor years for each sign (total = 129)
const MINOR_YEARS: Record<ZodiacSign, number> = {
  Aries: 15, Taurus: 8, Gemini: 20, Cancer: 25, Leo: 19,
  Virgo: 20, Libra: 8, Scorpio: 15, Sagittarius: 12, Capricorn: 27,
  Aquarius: 30, Pisces: 12,
}

const TOTAL_CYCLE_YEARS = 129

export const SIGN_RULERS: Record<ZodiacSign, Planet> = {
  Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon',
  Leo: 'Sun', Virgo: 'Mercury', Libra: 'Venus', Scorpio: 'Mars',
  Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter',
}

function getSubPeriods(startSignIndex: number, parentStartMs: number, parentDurationMs: number): ZRPeriod[] {
  const periods: ZRPeriod[] = []
  let offset = 0

  for (let i = 0; i < 12; i++) {
    const signIndex = (startSignIndex + i) % 12
    const sign = ZODIAC_SIGNS[signIndex]
    const fraction = MINOR_YEARS[sign] / TOTAL_CYCLE_YEARS
    const durationMs = parentDurationMs * fraction
    const startMs = parentStartMs + offset

    periods.push({
      sign,
      signIndex,
      symbol: ZODIAC_SYMBOLS[sign],
      ruler: SIGN_RULERS[sign],
      startDate: new Date(startMs),
      endDate: new Date(startMs + durationMs),
      durationMs,
    })

    offset += durationMs
  }

  return periods
}

function findPeriod(periods: ZRPeriod[], nowMs: number): ZRPeriod | null {
  return periods.find((p) => nowMs >= p.startDate.getTime() && nowMs < p.endDate.getTime()) ?? null
}

function getAspect(signA: number, signB: number): 'peak' | 'trough' | 'neutral' {
  const diff = ((signA - signB) % 12 + 12) % 12
  if ([0, 2, 4, 8, 10].includes(diff)) return 'peak'
  if ([3, 6, 9].includes(diff)) return 'trough'
  return 'neutral'
}

export function calculateZRState(lotSignIndex: number, birthDate: Date, now: Date): ZRState | null {
  const birthMs = birthDate.getTime()
  const nowMs = now.getTime()
  const cycleDurationMs = TOTAL_CYCLE_YEARS * 365.25 * 24 * 60 * 60 * 1000

  const l1Periods = getSubPeriods(lotSignIndex, birthMs, cycleDurationMs)
  const l1 = findPeriod(l1Periods, nowMs)
  if (!l1) return null

  const l2Periods = getSubPeriods(l1.signIndex, l1.startDate.getTime(), l1.durationMs)
  const l2 = findPeriod(l2Periods, nowMs)
  if (!l2) return null

  const l3Periods = getSubPeriods(l2.signIndex, l2.startDate.getTime(), l2.durationMs)
  const l3 = findPeriod(l3Periods, nowMs)
  if (!l3) return null

  const l4Periods = getSubPeriods(l3.signIndex, l3.startDate.getTime(), l3.durationMs)
  const l4 = findPeriod(l4Periods, nowMs)
  if (!l4) return null

  const peakTrough = getAspect(l2.signIndex, l1.signIndex)
  const isLoosingOfBond = ((l2.signIndex - lotSignIndex + 12) % 12) === 6

  return {
    l1, l2, l3, l4,
    peakTrough,
    isLoosingOfBond,
    lotSign: ZODIAC_SIGNS[lotSignIndex],
    lotSignIndex,
  }
}

export function checkZRAlignment(l4Ruler: Planet, currentPlanet: Planet): boolean {
  return l4Ruler === currentPlanet
}

// ---------------------------------------------------------------------------
// Multi-Lot ZR Support with Benefic/Malefic Classification
// ---------------------------------------------------------------------------

export type LotType = 'fortune' | 'spirit' | 'eros' | 'victory'

export type ProsperityLevel = 'prosperous' | 'favorable' | 'variable' | 'challenging'

export type PlanetNature = 'benefic' | 'mildly-benefic' | 'neutral' | 'malefic'

export interface LotZRState {
  lotType: LotType
  domain: string
  domainIcon: string
  zr: ZRState
  l4Nature: PlanetNature
  prosperity: ProsperityLevel
}

export interface MultiLotZRState {
  fortune: LotZRState
  spirit: LotZRState
  eros: LotZRState
  victory: LotZRState
  convergenceScore: number
  isCosmicConvergence: boolean
}

const LOT_META: Record<LotType, { domain: string; icon: string }> = {
  fortune: { domain: 'Material & Health', icon: '🏦' },
  spirit: { domain: 'Career & Purpose', icon: '🧠' },
  eros: { domain: 'Love & Desire', icon: '💜' },
  victory: { domain: 'Achievement', icon: '🏆' },
}

export function classifyPlanetNature(planet: Planet): PlanetNature {
  switch (planet) {
    case 'Venus':
    case 'Jupiter':
      return 'benefic'
    case 'Sun':
    case 'Moon':
      return 'mildly-benefic'
    case 'Mercury':
      return 'neutral'
    case 'Mars':
    case 'Saturn':
      return 'malefic'
    default:
      return 'neutral'
  }
}

export function getProsperityLevel(nature: PlanetNature): ProsperityLevel {
  switch (nature) {
    case 'benefic':
      return 'prosperous'
    case 'mildly-benefic':
      return 'favorable'
    case 'neutral':
      return 'variable'
    case 'malefic':
      return 'challenging'
  }
}

export function calculateMultiLotZR(
  lotSignIndices: { fortune: number; spirit: number; eros: number; victory: number },
  birthDate: Date,
  now: Date,
): MultiLotZRState | null {
  const lotTypes: LotType[] = ['fortune', 'spirit', 'eros', 'victory']
  const results = {} as Record<LotType, LotZRState>

  for (const lot of lotTypes) {
    const zr = calculateZRState(lotSignIndices[lot], birthDate, now)
    if (!zr) return null

    const l4Nature = classifyPlanetNature(zr.l4.ruler)
    const prosperity = getProsperityLevel(l4Nature)
    const meta = LOT_META[lot]

    results[lot] = {
      lotType: lot,
      domain: meta.domain,
      domainIcon: meta.icon,
      zr,
      l4Nature,
      prosperity,
    }
  }

  const convergenceScore = lotTypes.filter(
    (lot) => results[lot].l4Nature === 'benefic' || results[lot].l4Nature === 'mildly-benefic',
  ).length

  return {
    fortune: results.fortune,
    spirit: results.spirit,
    eros: results.eros,
    victory: results.victory,
    convergenceScore,
    isCosmicConvergence: convergenceScore >= 3,
  }
}

export function getHourLotMatches(
  multiLot: MultiLotZRState,
  hourPlanet: Planet,
): { lot: LotType; domain: string; icon: string }[] {
  const lotTypes: LotType[] = ['fortune', 'spirit', 'eros', 'victory']
  const matches: { lot: LotType; domain: string; icon: string }[] = []

  for (const lot of lotTypes) {
    const lotState = multiLot[lot]
    if (lotState.zr.l4.ruler === hourPlanet) {
      matches.push({
        lot,
        domain: lotState.domain,
        icon: lotState.domainIcon,
      })
    }
  }

  return matches
}
