import { type Planet } from './planetary-hours'

export type AlignmentTheme = 'financial' | 'love' | 'health' | 'creativity'
export type AlignmentTier = 'standard' | 'supreme' | 'super-supreme'

export interface Alignment {
  theme: AlignmentTheme
  label: string
  suggestion: string
  color: string
  icon: string
  tier: AlignmentTier
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
]

const TIER_LABELS: Record<AlignmentTier, string> = {
  'standard': 'Alignment',
  'supreme': 'Supreme Alignment',
  'super-supreme': 'Super Supreme Alignment',
}

const TIER_SUGGESTIONS: Record<AlignmentTier, Record<AlignmentTheme, string>> = {
  'standard': {
    financial: 'Optimal window for executing trades, signing contracts, or launching revenue-generating projects.',
    love: 'Optimal window for scheduling dates, resolving conflicts, or prioritizing social networking.',
    health: 'Optimal window to begin new workout routines, prioritize physical exertion, or schedule medical checkups.',
    creativity: 'Optimal window for brainstorming, content creation, or engaging in hobbies.',
  },
  'supreme': {
    financial: 'SUPREME: Your daily energy cycle AND planetary hour are locked in for wealth. Execute your highest-stakes financial moves NOW.',
    love: 'SUPREME: Your daily rhythm AND cosmic timing are perfectly synced for connection. Pursue meaningful relationships with full confidence.',
    health: 'SUPREME: Your body\'s daily vitality cycle AND planetary forces are aligned. Push your physical limits — recovery will be exceptional.',
    creativity: 'SUPREME: Your daily creative frequency AND planetary inspiration are in perfect harmony. Your most original ideas will surface now.',
  },
  'super-supreme': {
    financial: 'SUPER SUPREME: Month, day, hour, AND planetary energies are ALL synchronized for maximum financial power. This is the rarest window — act decisively on your biggest opportunities.',
    love: 'SUPER SUPREME: Your monthly, daily, hourly, AND planetary cycles are ALL resonating love frequencies. This is an extraordinarily rare moment of deep connection potential.',
    health: 'SUPER SUPREME: Every layer of your numerological cycle AND the planetary hour are unified for vitality. This is a once-in-a-rare window — commit to transformative health actions.',
    creativity: 'SUPER SUPREME: Your entire numerological stack AND cosmic timing are in total creative resonance. Channel this rare convergence into your most ambitious creative vision.',
  },
}

/**
 * Check all alignment rules and return matches with tier classification.
 *
 * Standard Alignment: Planet matches + Personal Hour matches
 * Supreme Alignment: Standard + Personal Day ALSO matches the theme's trigger numbers
 * Super Supreme Alignment: Supreme + Personal Month ALSO matches the theme's trigger numbers
 */
export function findAlignments(
  planet: Planet,
  personalHour: number,
  personalDay: number,
  personalMonth: number
): Alignment[] {
  return ALIGNMENT_RULES.filter(
    (rule) => rule.planets.includes(planet) && rule.personalHours.includes(personalHour)
  ).map((rule) => {
    const dayMatches = rule.personalHours.includes(personalDay)
    const monthMatches = rule.personalHours.includes(personalMonth)

    let tier: AlignmentTier = 'standard'
    if (dayMatches && monthMatches) {
      tier = 'super-supreme'
    } else if (dayMatches) {
      tier = 'supreme'
    }

    const tierLabel = TIER_LABELS[tier]
    const label = tier === 'standard'
      ? rule.label
      : `${rule.label} — ${tierLabel}`

    return {
      theme: rule.theme,
      label,
      suggestion: TIER_SUGGESTIONS[tier][rule.theme],
      color: rule.color,
      icon: tier === 'super-supreme' ? `👑${rule.icon}` : tier === 'supreme' ? `⚜️${rule.icon}` : rule.icon,
      tier,
    }
  })
}

/**
 * Get all alignment rules for reference.
 */
export function getAlignmentRules() {
  return ALIGNMENT_RULES
}
