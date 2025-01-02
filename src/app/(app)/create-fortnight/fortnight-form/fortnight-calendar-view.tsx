'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import type { CreateFortnightFormData } from '.'

interface FortnightCalendarViewProps {
  today: Date
  modifiers: {
    fortnight: Date[]
    weekend: Date[]
    selected: Date[]
  }
  disableOutsideLimits: (date: Date) => boolean
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export function FortnightCalendarView({
  today,
  modifiers,
  disableOutsideLimits,
  selectedDate,
  setSelectedDate,
}: FortnightCalendarViewProps) {
  const form = useFormContext<CreateFortnightFormData>()

  const { setValue } = form

  setValue('startDate', modifiers.fortnight[0])

  setValue('endDate', modifiers.fortnight[13])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              'flex-1 pl-3 text-left font-normal',
              !selectedDate && 'text-muted-foreground',
            )}
          >
            <span>
              {today ? format(today, 'dd/MM/yyyy') : 'Selecione da Data'}
            </span>
            <CalendarIcon className="ml-auto size-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          disabled={disableOutsideLimits}
          modifiers={modifiers}
          modifiersClassNames={{
            fortnight:
              'bg-orange-500 text-white hover:bg-orange-500/90 hover:text-white',
            selected:
              'bg-orange-500/90 text-white hover:bg-orange-500/80 hover:text-white',
            weekend: 'bg-orange-500/85 text-white',
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
