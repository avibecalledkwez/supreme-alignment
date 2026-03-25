import * as Astronomy from 'astronomy-engine'

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo'
  | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'

export const ZODIAC_SIGNS: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
]

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋',
  Leo: '♌', Virgo: '♍', Libra: '♎', Scorpio: '♏',
  Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
}

export interface NatalChartInput {
  birthYear: number
  birthMonth: number // 1-12
  birthDay: number
  birthHour: number // 0-23
  birthMinute: number
  birthLat: number
  birthLng: number
}

export interface NatalChartData {
  sunLongitude: number
  moonLongitude: number
  ascendantLongitude: number
  isDayChart: boolean
  lotOfFortuneLongitude: number
  lotOfFortuneSign: ZodiacSign
  lotOfFortuneSignIndex: number
}

function signIndexFromLongitude(lon: number): number {
  return Math.floor(((lon % 360) + 360) % 360 / 30)
}

function birthToUTC(input: NatalChartInput): Date {
  // Estimate UTC offset from longitude (~30min accuracy, acceptable for ZR L4)
  const offsetHours = Math.round(input.birthLng / 15)
  const localDate = new Date(
    input.birthYear, input.birthMonth - 1, input.birthDay,
    input.birthHour, input.birthMinute, 0
  )
  return new Date(localDate.getTime() - offsetHours * 60 * 60 * 1000)
}

function calculateAscendant(utcDate: Date, lat: number, lng: number): number {
  const gmst = Astronomy.SiderealTime(Astronomy.MakeTime(utcDate))
  const lstHours = (gmst + lng / 15 + 24) % 24
  const lstDeg = lstHours * 15

  const obliquity = 23.4393
  const oblRad = obliquity * Math.PI / 180
  const latRad = lat * Math.PI / 180
  const ramcRad = lstDeg * Math.PI / 180

  const y = -Math.cos(ramcRad)
  const x = Math.sin(ramcRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad)
  let asc = Math.atan2(y, x) * 180 / Math.PI
  asc = ((asc % 360) + 360) % 360
  return asc
}

function isDayChartCalc(sunLon: number, ascLon: number): boolean {
  const diff = ((sunLon - ascLon) % 360 + 360) % 360
  return diff > 180
}

export function calculateNatalChart(input: NatalChartInput): NatalChartData {
  const moment = birthToUTC(input)
  const astroTime = Astronomy.MakeTime(moment)

  const sunPos = Astronomy.SunPosition(astroTime)
  const sunLongitude = sunPos.elon

  const moonPos = Astronomy.EclipticGeoMoon(astroTime)
  const moonLongitude = moonPos.lon

  const ascendantLongitude = calculateAscendant(moment, input.birthLat, input.birthLng)
  const isDayChart = isDayChartCalc(sunLongitude, ascendantLongitude)

  let lotLongitude: number
  if (isDayChart) {
    lotLongitude = ((ascendantLongitude + moonLongitude - sunLongitude) % 360 + 360) % 360
  } else {
    lotLongitude = ((ascendantLongitude + sunLongitude - moonLongitude) % 360 + 360) % 360
  }

  const lotSignIndex = signIndexFromLongitude(lotLongitude)

  return {
    sunLongitude,
    moonLongitude,
    ascendantLongitude,
    isDayChart,
    lotOfFortuneLongitude: lotLongitude,
    lotOfFortuneSign: ZODIAC_SIGNS[lotSignIndex],
    lotOfFortuneSignIndex: lotSignIndex,
  }
}
