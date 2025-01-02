import { addDays, differenceInDays, startOfDay } from 'date-fns'

import { generateFortnight } from './generate-fortnight'

export const getCurrentFortnight = (startDate: Date, currentDate: Date) => {
  const daysDifference = differenceInDays(
    startOfDay(currentDate),
    startOfDay(startDate),
  )
  const fortnightIndex = Math.floor(daysDifference / 14)
  const fortnightStartDate = addDays(startDate, fortnightIndex * 14)

  return {
    fortnightIndex,
    fortnightStartDate,
    fortnightEndDate: addDays(fortnightStartDate, 13),
    days: generateFortnight(fortnightStartDate),
  }
}
