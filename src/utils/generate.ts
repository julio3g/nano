import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import utc from 'dayjs/plugin/utc'
import isWeekend from 'dayjs/plugin/weekday'
import extenso from 'extenso'

dayjs.extend(isoWeek)
dayjs.extend(isWeekend)
dayjs.extend(utc)
dayjs.locale('pt-br')

const generateTwoWeeksWithWeekends = (startDate: dayjs.Dayjs) => {
  const dates = []
  for (let i = 0; i < 14; i++) {
    const currentDate = startDate.add(i, 'day')
    const indexDay = currentDate.weekday()
    const isWeekend = indexDay === 6 || indexDay === 0
    dates.push({
      date: currentDate.format('DD/MM/YYYY'),
      dayName: currentDate.format('dddd'),
      isWeekend,
    })
  }
  return dates
}

const startDate = dayjs('2024-11-23')
const twoWeekSchedule = generateTwoWeeksWithWeekends(startDate)

console.log('Datas e finais de semana:', twoWeekSchedule)

const NumberOfExtend = extenso(3280.59, { mode: 'currency' })

console.log('3280 em extenso:', NumberOfExtend)
