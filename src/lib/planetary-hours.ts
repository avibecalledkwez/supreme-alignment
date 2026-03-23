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
  // Move backwards through the sequence (Chaldean order goes Saturn->Jupiter->Mars->Sun->Venus->Mercury->Moon)
  // Each subsequent hour goes to the next planet in the sequence
  const index = (startIndex + hourOffset) % 7
  return CHALDEAN_SEQUENCE[index]
}

export function calculatePlanetaryHours(
  date: Date,
  latitude: number,
  longitude: number
): PlanetaryHour[] {
  const hours: PlanetaryHour[] = []

  // Get sun times for today
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const todayTimes = SunCalc.getTimes(today, latitude, longitude)

  // Get sun times for tomorrow (for nighttime calculation)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowTimes = SunCalc.getTimes(tomorrow, latitude, longitude)

  const sunrise = todayTimes.sunrise
  const sunset = todayTimes.sunset
  const nextSunrise = tomorrowTimes.sunrise

  // Calculate hour lengths
  const dayLengthMs = sunset.getTime() - sunrise.getTime()
  const nightLengthMs = nextSunrise.getTime() - sunset.getTime()
  const dayHourMs = dayLengthMs / 12
  const nightHourMs = nightLengthMs / 12

  // Get the day ruler
  const dayOfWeek = today.getDay()
  const dayRuler = DAY_RULERS[dayOfWeek]

  // Generate 24 planetary hours (12 day + 12 night)
  for (let i = 0; i < 24; i++) {
    const isDay = i < 12
    const hourMs = isDay ? dayHourMs : nightHourMs
    const baseTime = isDay ? sunrise : sunset
    const offset = isDay ? i : i - 12

    const start = new Date(baseTime.getTime() + offset * hourMs)
    const end = new Date(start.getTime() + hourMs)
    const planet = getChaldeanPlanet(dayRuler, i)

    hours.push({
      planet,
      start,
      end,
      isDay,
      hourIndex: i,
    })
  }

  return hours
}

export function getCurrentPlanetaryHour(hours: PlanetaryHour[]): PlanetaryHour | null {
  const now = new Date()
  return hours.find(h => now >= h.start && now < h.end) || null
}

export function getSunTimes(date: Date, latitude: number, longitude: number) {
  const times = SunCalc.getTimes(date, latitude, longitude)
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
  }
}
