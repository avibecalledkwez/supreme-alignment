import { type Planet } from './planetary-hours'

export type AlignmentTheme = 'financial' | 'love' | 'health' | 'creativity' | 'spiritual'
export type AlignmentTier = 'standard' | 'supreme' | 'super-supreme' | 'transcendent' | 'super-transcendent'

export interface ZRContext {
  /** Whether any lot's L4 ruler matches this hour's planet */
  anyLotAligned: boolean
  /** Per-theme: whether the RELEVANT lot(s) for this theme are benefic/mildly-benefic */
  themeRelevantBenefic: Record<AlignmentTheme, boolean>
  /** Cosmic convergence active (3+ lots benefic) */
  isCosmicConvergence: boolean
  /** Convergence score 0-4 */
  convergenceScore: number
}

export interface Alignment {
  theme: AlignmentTheme
  label: string
  suggestion: string
  color: string
  icon: string
  tier: AlignmentTier
  zrBoosted: boolean
  convergenceBoost: boolean
}

interface AlignmentRule {
  theme: AlignmentTheme
  label: string
  planets: Planet[]
  personalHours: number[]
  suggestion: string
  color: string
  icon: string
}

export const THEME_LOT_RELEVANCE: Record<AlignmentTheme, string[]> = {
  financial: ['victory'],
  love: ['eros'],
  health: ['fortune'],
  creativity: ['spirit'],
  spiritual: ['spirit'],
}

const ALIGNMENT_RULES: AlignmentRule[] = [
  {
    theme: 'financial',
    label: 'Financial & Power',
    planets: ['Jupiter', 'Venus'],
    personalHours: [3, 8],
    suggestion:
      'Supreme Alignment: Optimal window for executing trades, signing contracts, or launching revenue-generating projects.',
    color: '#10B981',
    icon: '💰',
  },
  {
    theme: 'love',
    label: 'Love & Connection',
    planets: ['Venus', 'Moon'],
    personalHours: [2, 6],
    suggestion:
      'Supreme Alignment: Optimal window for scheduling dates, resolving conflicts, or prioritizing social networking.',
    color: '#EC4899',
    icon: '💜',
  },
  {
    theme: 'health',
    label: 'Health & Wellness',
    planets: ['Sun', 'Mars'],
    personalHours: [1, 4],
    suggestion:
      'Supreme Alignment: Optimal window to begin new workout routines, prioritize physical exertion, or schedule medical checkups.',
    color: '#F59E0B',
    icon: '⚡',
  },
  {
    theme: 'creativity',
    label: 'Creativity & Fun',
    planets: ['Mercury', 'Sun'],
    personalHours: [3, 5],
    suggestion:
      'Supreme Alignment: Optimal window for brainstorming, content creation, or engaging in hobbies.',
    color: '#8B5CF6',
    icon: '✨',
  },
  {
    theme: 'spiritual',
    label: 'Spiritual & Intuition',
    planets: ['Saturn', 'Moon'],
    personalHours: [7, 9],
    suggestion:
      'Supreme Alignment: Optimal window for meditation, prayer, journaling, shadow work, or deepening your spiritual practice.',
    color: '#6366F1',
    icon: '🔮',
  },
]

const TIER_LABELS: Record<AlignmentTier, string> = {
  'standard': 'Alignment',
  'supreme': 'Supreme Alignment',
  'super-supreme': 'Super Supreme Alignment',
  'transcendent': 'Transcendent Alignment',
  'super-transcendent': 'Super Transcendent Alignment',
}

const TIER_SUGGESTIONS: Record<AlignmentTier, Record<AlignmentTheme, string>> = {
  'standard': {
    financial: 'Optimal window for executing trades, signing contracts, or launching revenue-generating projects.',
    love: 'Optimal window for scheduling dates, resolving conflicts, or prioritizing social networking.',
    health: 'Optimal window to begin new workout routines, prioritize physical exertion, or schedule medical checkups.',
    creativity: 'Optimal window for brainstorming, content creation, or engaging in hobbies.',
    spiritual: 'Optimal window for meditation, prayer, journaling, shadow work, or deepening your spiritual practice.',
  },
  'supreme': {
    financial: 'SUPREME: Your daily energy cycle AND planetary hour are locked in for wealth. Execute your highest-stakes financial moves NOW.',
    love: 'SUPREME: Your daily rhythm AND cosmic timing are perfectly synced for connection. Pursue meaningful relationships with full confidence.',
    health: 'SUPREME: Your body\'s daily vitality cycle AND planetary forces are aligned. Push your physical limits — recovery will be exceptional.',
    creativity: 'SUPREME: Your daily creative frequency AND planetary inspiration are in perfect harmony. Your most original ideas will surface now.',
    spiritual: 'SUPREME: Your daily spiritual attunement AND planetary hour are perfectly aligned. Deep meditative states and intuitive breakthroughs are accessible now.',
  },
  'super-supreme': {
    financial: 'SUPER SUPREME: Month, day, hour, AND planetary energies are ALL synchronized for maximum financial power. This is the rarest window — act decisively on your biggest opportunities.',
    love: 'SUPER SUPREME: Your monthly, daily, hourly, AND planetary cycles are ALL resonating love frequencies. This is an extraordinarily rare moment of deep connection potential.',
    health: 'SUPER SUPREME: Every layer of your numerological cycle AND the planetary hour are unified for vitality. This is a once-in-a-rare window — commit to transformative health actions.',
    creativity: 'SUPER SUPREME: Your entire numerological stack AND cosmic timing are in total creative resonance. Channel this rare convergence into your most ambitious creative vision.',
    spiritual: 'SUPER SUPREME: Month, day, hour, AND planetary energies are ALL unified in spiritual frequency. This is an extraordinarily rare portal — profound revelations, karmic clarity, and transcendent experiences are possible.',
  },
  'transcendent': {
    financial: 'TRANSCENDENT: Your Lot of Victory confirms this is a prosperous period for achievement, AND the planetary hour and your personal hour are aligned for wealth. Your birth chart endorses this financial window — act with conviction.',
    love: 'TRANSCENDENT: Your Lot of Eros is in a benefic period for desire and attraction, AND the planetary hour and personal hour are synchronized for love. Your birth chart says this is your moment — open your heart.',
    health: 'TRANSCENDENT: Your Lot of Fortune signals a prosperous period for your body and material well-being, AND the planetary hour and personal hour converge on vitality. Your birth chart confirms this health window.',
    creativity: 'TRANSCENDENT: Your Lot of Spirit is in a benefic period for purpose and agency, AND the planetary hour and personal hour channel creative energy. Your birth chart is fueling your creative fire right now.',
    spiritual: 'TRANSCENDENT: Your Lot of Spirit confirms a prosperous period for purpose and inner work, AND the planetary hour and personal hour are tuned to spiritual frequency. This is a fated portal for transcendence.',
  },
  'super-transcendent': {
    financial: 'SUPER TRANSCENDENT: The ultimate financial convergence — your Lot of Victory is benefic, the planetary hour channels wealth, AND both your personal hour and personal month are locked in. Every layer of timing, cosmic and natal, says this is the window. Execute your biggest move.',
    love: 'SUPER TRANSCENDENT: The rarest love alignment possible — your Lot of Eros is prosperous, the planetary hour is attuned to connection, AND your personal hour and month are both resonating love frequencies. This is the moment your birth chart wrote for your heart.',
    health: 'SUPER TRANSCENDENT: Total vitality convergence — your Lot of Fortune signals prosperous health, the planetary hour channels physical energy, AND your personal hour and month are both aligned. Transform your body in this window — your birth chart insists.',
    creativity: 'SUPER TRANSCENDENT: The absolute peak of creative power — your Lot of Spirit is benefic, the planetary hour inspires, AND your personal hour and month are both in creative resonance. This is the rarest window your birth chart encoded for your most important work.',
    spiritual: 'SUPER TRANSCENDENT: Every layer of cosmic and natal timing converges on spiritual awakening. Your Lot of Spirit is prosperous, the planetary hour is sacred, AND your personal hour and month are unified. This is the kind of moment mystics wait lifetimes for.',
  },
}

/**
 * Check all alignment rules and return matches with tier classification.
 *
 * Standard Alignment: Planet matches + Personal Hour matches (2 layers)
 * Supreme Alignment: Standard + Personal Day ALSO matches (3 layers)
 * Super Supreme Alignment: Supreme + Personal Month ALSO matches (4 layers)
 * Transcendent Alignment: Super Supreme + relevant ZR lot(s) are benefic OR cosmic convergence is active (5 layers)
 *
 * When ZR is aligned but tier is below Super Supreme, the alignment is marked
 * as zrBoosted (shown with a ZR badge) but not promoted to Transcendent.
 */
export function findAlignments(
  planet: Planet,
  personalHour: number,
  personalDay: number,
  personalMonth: number,
  zrContext: ZRContext | null = null
): Alignment[] {
  return ALIGNMENT_RULES.filter(
    (rule) => rule.planets.includes(planet) && rule.personalHours.includes(personalHour)
  ).map((rule) => {
    const dayMatches = rule.personalHours.includes(personalDay)
    const monthMatches = rule.personalHours.includes(personalMonth)

    // ZR benefic check: relevant lot for this theme has benefic/mildly-benefic L4,
    // OR cosmic convergence (3+ lots benefic) overrides per-theme requirement
    const lotBenefic = zrContext && (
      zrContext.themeRelevantBenefic[rule.theme] || zrContext.isCosmicConvergence
    )

    // Tier hierarchy (highest first):
    // Super Transcendent: Lot benefic + Planet + PH + Month
    // Transcendent:       Lot benefic + Planet + PH
    // Super Supreme:      Planet + PH + Day + Month
    // Supreme:            Planet + PH + Day
    // Standard:           Planet + PH
    let tier: AlignmentTier = 'standard'
    if (lotBenefic && monthMatches) {
      tier = 'super-transcendent'
    } else if (lotBenefic) {
      tier = 'transcendent'
    } else if (dayMatches && monthMatches) {
      tier = 'super-supreme'
    } else if (dayMatches) {
      tier = 'supreme'
    }

    const tierLabel = TIER_LABELS[tier]
    const label = tier === 'standard'
      ? rule.label
      : `${rule.label} — ${tierLabel}`

    const iconPrefix = tier === 'super-transcendent' ? '💎' : tier === 'transcendent' ? '🌌' : tier === 'super-supreme' ? '👑' : tier === 'supreme' ? '⚜️' : ''

    return {
      theme: rule.theme,
      label,
      suggestion: TIER_SUGGESTIONS[tier][rule.theme],
      color: rule.color,
      icon: `${iconPrefix}${rule.icon}`,
      tier,
      zrBoosted: !!(zrContext?.anyLotAligned),
      convergenceBoost: !!(zrContext?.isCosmicConvergence),
    }
  })
}

/**
 * Get all alignment rules for reference.
 */
export function getAlignmentRules() {
  return ALIGNMENT_RULES
}
