import { type Planet } from './planetary-hours'

export type AlignmentTheme = 'financial' | 'love' | 'health' | 'creativity' | 'spiritual'
export type AlignmentTier = 'standard' | 'supreme' | 'super-supreme' | 'transcendent'

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
  financial: ['victory', 'spirit'],
  love: ['eros', 'fortune'],
  health: ['fortune', 'victory'],
  creativity: ['spirit', 'eros'],
  spiritual: ['spirit', 'fortune'],
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
    financial: 'TRANSCENDENT: All five layers converge — numerology (hour, day, month), planetary hour, AND your natal chart\'s Zodiacal Releasing time-lord ALL confirm this financial window. Your birth chart wrote this moment into your timeline. Act with absolute conviction.',
    love: 'TRANSCENDENT: Every timing layer in existence is synchronized for love — your numerology stack, the planetary hour, AND your natal Zodiacal Releasing period. This is a fated window for connection. The cosmos and your birth chart agree: open your heart now.',
    health: 'TRANSCENDENT: Five independent timing systems are unified for vitality. Your numerological cycles, the planetary hour, AND your natal time-lord period ALL point to physical transformation. Your body was born to peak in this moment.',
    creativity: 'TRANSCENDENT: The rarest creative convergence possible — numerology, planetary hours, AND your natal Zodiacal Releasing are ALL channeling creative energy simultaneously. This is the window your birth chart encoded for your most important creative work.',
    spiritual: 'TRANSCENDENT: All five layers of cosmic timing converge in spiritual frequency. Your numerology, the planetary hour, AND your natal time-lord period are unified. This is a fated spiritual portal — the kind of moment mystics wait lifetimes for.',
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

    const themeZrQualified = zrContext && (
      zrContext.themeRelevantBenefic[rule.theme] || zrContext.isCosmicConvergence
    )

    let tier: AlignmentTier = 'standard'
    if (dayMatches && monthMatches && themeZrQualified) {
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

    const iconPrefix = tier === 'transcendent' ? '🌌' : tier === 'super-supreme' ? '👑' : tier === 'supreme' ? '⚜️' : ''

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
