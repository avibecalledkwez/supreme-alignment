import SunCalc from 'suncalc'

export type Planet = 'Saturn' | 'Jupiter' | 'Mars' | 'Sun' | 'Venus' | 'Mercury' | 'Moon'

// Chaldean order (descending orbital period)
const CHALDEAN_SEQUENCE: Planet[] = ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon']

// Planet of the Day: the planet that rules the first hour of sunrise
const DAY_RULERS: Record<number, Planet> = {
  0: 'Sun',       // Sunday
  1: 'Moon',      // Monday
  2: 'Mars',      // Tuesday
  3: 'Mercury',   // Wednesday
  4: 'Jupiter',   // Thursday
  5: 'Venus',     // Friday
  6: 'Saturn',    // Saturday
}

export const PLANET_COLORS: Record<Planet, string> = {
  Saturn: '#6B7280',
  Jupiter: '#7C3AED',
  Mars: '#EF4444',
  Sun: '#F59E0B',
  Venus: '#EC4899',
  Mercury: '#06B6D4',
  Moon: '#A3E635',
}

export const PLANET_SYMBOLS: Record<Planet, string> = {
  Saturn: '♄',
  Jupiter: '♃',
  Mars: '♂',
  Sun: '☉',
  Venus: '♀',
  Mercury: '☿',
  Moon: '☽',
}

export interface PlanetaryHour {
  planet: Planet
  start: Date
  end: Date
  isDay: boolean
  hourIndex: number // 0-23 across the full planetary day
}

function getChaldeanPlanet(dayRuler: Planet, hourOffset: number): Planet {
  const startIndex = CHALDEAN_SEQUENCE.indexOf(dayRuler)
  const index = (startIndex + hourOffset) % 7
  return CHALDEAN_SEQUENCE[index]
}

/**
 * Calculate 24 planetary hours for a given calendar date.
 * Hours span from that date's sunrise to the next date's sunrise.
 */
export function calculatePlanetaryHoursForDate(
  calendarDate: Date,
  latitude: number,
  longitude: number
): PlanetaryHour[] {
  const hours: PlanetaryHour[] = []

  const day = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate(), 12, 0, 0)
  const todayTimes = SunCalc.getTimes(day, latitude, longitude)

  const tomorrow = new Date(day)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowTimes = SunCalc.getTimes(tomorrow, latitude, longitude)

  const sunrise = todayTimes.sunrise
  const sunset = todayTimes.sunset
  const nextSunrise = tomorrowTimes.sunrise

  const dayLengthMs = sunset.getTime() - sunrise.getTime()
  const nightLengthMs = nextSunrise.getTime() - sunset.getTime()
  const dayHourMs = dayLengthMs / 12
  const nightHourMs = nightLengthMs / 12

  const dayOfWeek = calendarDate.getDay()
  const dayRuler = DAY_RULERS[dayOfWeek]

  for (let i = 0; i < 24; i++) {
    const isDay = i < 12
    const hourMs = isDay ? dayHourMs : nightHourMs
    const baseTime = isDay ? sunrise : sunset
    const offset = isDay ? i : i - 12

    const start = new Date(baseTime.getTime() + offset * hourMs)
    const end = new Date(start.getTime() + hourMs)
    const planet = getChaldeanPlanet(dayRuler, i)

    hours.push({ planet, start, end, isDay, hourIndex: i })
  }

  return hours
}

/**
 * Calculate planetary hours for the current moment.
 * If before today's sunrise, we're in yesterday's nighttime hours.
 * Returns { hours, currentHour } where hours is for display (today's full day)
 * and currentHour is the actual current planetary hour (could be from yesterday).
 */
export function calculatePlanetaryHours(
  date: Date,
  latitude: number,
  longitude: number
): PlanetaryHour[] {
  return calculatePlanetaryHoursForDate(date, latitude, longitude)
}

/**
 * Find which planetary hour the given time falls in.
 * Checks today's hours first, then yesterday's nighttime hours.
 */
export function findCurrentPlanetaryHour(
  now: Date,
  latitude: number,
  longitude: number
): PlanetaryHour | null {
  const nowMs = now.getTime()

  // Try today's planetary hours
  const todayHours = calculatePlanetaryHoursForDate(now, latitude, longitude)
  const inToday = todayHours.find(h => nowMs >= h.start.getTime() && nowMs < h.end.getTime())
  if (inToday) return inToday

  // If not found, we might be before today's sunrise — check yesterday's nighttime hours
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayHours = calculatePlanetaryHoursForDate(yesterday, latitude, longitude)
  const inYesterday = yesterdayHours.find(h => nowMs >= h.start.getTime() && nowMs < h.end.getTime())
  if (inYesterday) return inYesterday

  return null
}

/**
 * Get planetary hours for a calendar day (midnight to midnight).
 * Combines yesterday's nighttime hours (that spill past midnight into today)
 * + today's daytime hours + today's nighttime hours (up to midnight).
 */
export function calculateCalendarDayHours(
  calendarDate: Date,
  latitude: number,
  longitude: number
): PlanetaryHour[] {
  const year = calendarDate.getFullYear()
  const month = calendarDate.getMonth()
  const day = calendarDate.getDate()
  const midnightStart = new Date(year, month, day, 0, 0, 0).getTime()
  const midnightEnd = new Date(year, month, day + 1, 0, 0, 0).getTime()

  // Yesterday's planetary hours (sunrise-to-sunrise): nighttime hours may spill into today
  const yesterday = new Date(year, month, day - 1)
  const yesterdayHours = calculatePlanetaryHoursForDate(yesterday, latitude, longitude)

  // Today's planetary hours (sunrise-to-sunrise): daytime + nighttime
  const todayHours = calculatePlanetaryHoursForDate(calendarDate, latitude, longitude)

  const result: PlanetaryHour[] = []

  // Add yesterday's nighttime hours that fall after midnight (into today)
  for (const h of yesterdayHours) {
    if (h.end.getTime() > midnightStart && h.start.getTime() < midnightStart) {
      // Straddles midnight — include it (starts before midnight, ends after)
      result.push(h)
    } else if (h.start.getTime() >= midnightStart && h.end.getTime() <= midnightEnd) {
      // Fully within today
      result.push(h)
    }
  }

  // Add today's hours that fall before midnight
  for (const h of todayHours) {
    if (h.start.getTime() >= midnightStart && h.start.getTime() < midnightEnd) {
      result.push(h)
    }
  }

  // Sort by start time
  result.sort((a, b) => a.start.getTime() - b.start.getTime())

  return result
}

export function getSunTimes(date: Date, latitude: number, longitude: number) {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
  const times = SunCalc.getTimes(day, latitude, longitude)
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
  }
}
