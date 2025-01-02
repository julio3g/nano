import { addDays, format, isWeekend, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}
export function generateFortnight(startDate: Date) {
  const days = []

  for (let i = 0; i < 14; i++) {
    const currentDate = addDays(startDate, i)
    days.push({
      date: startOfDay(currentDate),
      formattedDate: format(currentDate, 'dd/MM/yyyy'),
      isWeekend: isWeekend(currentDate),
      dayName: capitalizeFirstLetter(
        format(currentDate, 'EEEE', { locale: ptBR }),
      ),
      morning: false,
      afternoon: false,
      overtime: 0,
      location: '',
    })
  }

  return days
}
