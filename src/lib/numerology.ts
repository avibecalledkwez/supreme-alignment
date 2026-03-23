/**
 * Reduce any number to a single digit (1-9) by repeatedly summing its digits.
 */
export function reduceToSingleDigit(num: number): number {
  let n = Math.abs(num)
  while (n > 9) {
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + parseInt(d, 10), 0)
  }
  return n
}

/**
 * Calculate Personal Year:
 * Birth Month + Birth Day + Current Year → reduced to single digit
 */
export function personalYear(birthMonth: number, birthDay: number, currentYear: number): number {
  const sum = reduceToSingleDigit(birthMonth) + reduceToSingleDigit(birthDay) + reduceToSingleDigit(currentYear)
  return reduceToSingleDigit(sum)
}

/**
 * Calculate Personal Month:
 * Personal Year + Current Calendar Month → reduced to single digit
 */
export function personalMonth(pYear: number, currentMonth: number): number {
  const sum = pYear + reduceToSingleDigit(currentMonth)
  return reduceToSingleDigit(sum)
}

/**
 * Calculate Personal Day:
 * Personal Month + Current Calendar Day → reduced to single digit
 */
export function personalDay(pMonth: number, currentDay: number): number {
  const sum = pMonth + reduceToSingleDigit(currentDay)
  return reduceToSingleDigit(sum)
}

/**
 * Calculate Personal Hour:
 * Personal Day + Clock Hour (24h reduced) → reduced to single digit
 *
 * Clock hour: e.g. 14:00 → 1+4 = 5
 */
export function personalHour(pDay: number, clockHour24: number): number {
  const hourReduced = reduceToSingleDigit(clockHour24)
  const sum = pDay + hourReduced
  return reduceToSingleDigit(sum)
}

export interface NumerologyProfile {
  personalYear: number
  personalMonth: number
  personalDay: number
  personalHour: number
}

/**
 * Calculate the full numerology profile for a given moment.
 */
export function calculateNumerology(
  birthMonth: number,
  birthDay: number,
  now: Date
): NumerologyProfile {
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  const currentDay = now.getDate()
  const currentHour = now.getHours()

  const pYear = personalYear(birthMonth, birthDay, currentYear)
  const pMonth = personalMonth(pYear, currentMonth)
  const pDay = personalDay(pMonth, currentDay)
  const pHour = personalHour(pDay, currentHour)

  return {
    personalYear: pYear,
    personalMonth: pMonth,
    personalDay: pDay,
    personalHour: pHour,
  }
}

/**
 * Calculate personal hour for every clock hour (0-23) in a day.
 */
export function calculateAllPersonalHours(
  birthMonth: number,
  birthDay: number,
  date: Date
): number[] {
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const currentDay = date.getDate()

  const pYear = personalYear(birthMonth, birthDay, currentYear)
  const pMonth = personalMonth(pYear, currentMonth)
  const pDay = personalDay(pMonth, currentDay)

  return Array.from({ length: 24 }, (_, hour) => personalHour(pDay, hour))
}
