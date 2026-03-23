import { type Planet } from './planetary-hours'

export type AlignmentTheme = 'financial' | 'love' | 'health' | 'creativity'

export interface Alignment {
  theme: AlignmentTheme
  label: string
  suggestion: string
  color: string
  icon: string
}

const ALIGNMENT_RULES: {
  theme: AlignmentTheme
  label: string
  planets: Planet[]
  personalHours: number[]
  suggestion: string
  color: string
  icon: string
}[] = [
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

/**
 * Check all alignment rules and return any that match the given planetary hour + personal hour.
 */
export function findAlignments(planet: Planet, personalHour: number): Alignment[] {
  return ALIGNMENT_RULES.filter(
    (rule) =>
      rule.planets.includes(planet) && rule.personalHours.includes(personalHour)
  ).map(({ theme, label, suggestion, color, icon }) => ({
    theme,
    label,
    suggestion,
    color,
    icon,
  }))
}

/**
 * Get all alignment rules for reference.
 */
export function getAlignmentRules() {
  return ALIGNMENT_RULES
}
