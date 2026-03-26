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
  venusLongitude: number
  jupiterLongitude: number
  ascendantLongitude: number
  isDayChart: boolean
  lotOfFortuneLongitude: number
  lotOfFortuneSign: ZodiacSign
  lotOfFortuneSignIndex: number
  lotOfSpiritLongitude: number
  lotOfSpiritSign: ZodiacSign
  lotOfSpiritSignIndex: number
  lotOfErosLongitude: number
  lotOfErosSign: ZodiacSign
  lotOfErosSignIndex: number
  lotOfVictoryLongitude: number
  lotOfVictorySign: ZodiacSign
  lotOfVictorySignIndex: number
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
  // Sun is above the horizon (day chart) when its longitude is
  // between the Ascendant and Descendant going counter-clockwise,
  // i.e. 0–180° ahead of the Ascendant in ecliptic longitude.
  const diff = ((sunLon - ascLon) % 360 + 360) % 360
  return diff < 180
}

export function calculateNatalChart(input: NatalChartInput): NatalChartData {
  const moment = birthToUTC(input)
  const astroTime = Astronomy.MakeTime(moment)

  const sunPos = Astronomy.SunPosition(astroTime)
  const sunLongitude = sunPos.elon

  const moonPos = Astronomy.EclipticGeoMoon(astroTime)
  const moonLongitude = moonPos.lon

  const venusGeo = Astronomy.GeoVector(Astronomy.Body.Venus, astroTime, true)
  const venusEcl = Astronomy.Ecliptic(venusGeo)
  const venusLongitude = venusEcl.elon

  const jupiterGeo = Astronomy.GeoVector(Astronomy.Body.Jupiter, astroTime, true)
  const jupiterEcl = Astronomy.Ecliptic(jupiterGeo)
  const jupiterLongitude = jupiterEcl.elon

  const ascendantLongitude = calculateAscendant(moment, input.birthLat, input.birthLng)
  const isDayChart = isDayChartCalc(sunLongitude, ascendantLongitude)

  const norm = (v: number) => ((v % 360) + 360) % 360

  // Lot of Fortune: Day = Asc + Moon - Sun, Night = Asc + Sun - Moon
  const fortuneLongitude = isDayChart
    ? norm(ascendantLongitude + moonLongitude - sunLongitude)
    : norm(ascendantLongitude + sunLongitude - moonLongitude)
  const fortuneSignIndex = signIndexFromLongitude(fortuneLongitude)

  // Lot of Spirit (reverse of Fortune): Day = Asc + Sun - Moon, Night = Asc + Moon - Sun
  const spiritLongitude = isDayChart
    ? norm(ascendantLongitude + sunLongitude - moonLongitude)
    : norm(ascendantLongitude + moonLongitude - sunLongitude)
  const spiritSignIndex = signIndexFromLongitude(spiritLongitude)

  // Lot of Eros: Day = Asc + Venus - Spirit, Night = Asc + Spirit - Venus
  const erosLongitude = isDayChart
    ? norm(ascendantLongitude + venusLongitude - spiritLongitude)
    : norm(ascendantLongitude + spiritLongitude - venusLongitude)
  const erosSignIndex = signIndexFromLongitude(erosLongitude)

  // Lot of Victory: Day = Asc + Jupiter - Spirit, Night = Asc + Spirit - Jupiter
  const victoryLongitude = isDayChart
    ? norm(ascendantLongitude + jupiterLongitude - spiritLongitude)
    : norm(ascendantLongitude + spiritLongitude - jupiterLongitude)
  const victorySignIndex = signIndexFromLongitude(victoryLongitude)

  return {
    sunLongitude,
    moonLongitude,
    venusLongitude,
    jupiterLongitude,
    ascendantLongitude,
    isDayChart,
    lotOfFortuneLongitude: fortuneLongitude,
    lotOfFortuneSign: ZODIAC_SIGNS[fortuneSignIndex],
    lotOfFortuneSignIndex: fortuneSignIndex,
    lotOfSpiritLongitude: spiritLongitude,
    lotOfSpiritSign: ZODIAC_SIGNS[spiritSignIndex],
    lotOfSpiritSignIndex: spiritSignIndex,
    lotOfErosLongitude: erosLongitude,
    lotOfErosSign: ZODIAC_SIGNS[erosSignIndex],
    lotOfErosSignIndex: erosSignIndex,
    lotOfVictoryLongitude: victoryLongitude,
    lotOfVictorySign: ZODIAC_SIGNS[victorySignIndex],
    lotOfVictorySignIndex: victorySignIndex,
  }
}
