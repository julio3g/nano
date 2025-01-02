'use client'

import { addDays, format, isAfter, isBefore } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'

import { Calendar } from '@/components/ui/calendar'
import { getCurrentFortnight } from '@/utils/get-current-fortnight'

import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

export function FortnightCalendar() {
  const initialStartDate = useMemo(() => new Date(2024, 10, 9), [])
  const today = useMemo(() => new Date(), [])

  const minStartDate = useMemo(() => initialStartDate, [initialStartDate])
  const maxStartDate = useMemo(
    () => addDays(initialStartDate, 365),
    [initialStartDate],
  )

  const [currentFortnight, setCurrentFortnight] = useState(() =>
    getCurrentFortnight(initialStartDate, today),
  )

  const currentFortnightEndDate = useMemo(() => {
    const currentFortnightData = getCurrentFortnight(initialStartDate, today)
    return currentFortnightData.fortnightEndDate
  }, [initialStartDate, today])

  const [selectedDate, setSelectedDate] = useState(today)

  const navigateToFortnight = (direction: 'previous' | 'next') => {
    const newStartDate =
      direction === 'previous'
        ? addDays(currentFortnight.fortnightStartDate, -14)
        : addDays(currentFortnight.fortnightStartDate, 14)

    if (
      isBefore(newStartDate, minStartDate) ||
      isAfter(newStartDate, maxStartDate)
    )
      return

    const nextFortnight = getCurrentFortnight(initialStartDate, newStartDate)
    setCurrentFortnight(nextFortnight)
    setSelectedDate(nextFortnight.fortnightStartDate)
  }

  useEffect(() => {
    const newFortnight = getCurrentFortnight(initialStartDate, selectedDate)
    setCurrentFortnight(newFortnight)
  }, [selectedDate, initialStartDate])

  const { fortnightIndex, fortnightStartDate, fortnightEndDate, days } =
    currentFortnight

  const disableOutsideLimits = (date: Date) => {
    return (
      isBefore(date, minStartDate) ||
      isAfter(date, currentFortnightEndDate) ||
      isAfter(date, maxStartDate)
    )
  }

  const isNextFortnightDisabled = () => {
    const nextFortnightStartDate = addDays(fortnightStartDate, 14)
    return (
      isAfter(nextFortnightStartDate, today) ||
      isAfter(nextFortnightStartDate, maxStartDate)
    )
  }

  const isPreviousFortnightDisabled = () => {
    const previousFortnightStartDate = addDays(fortnightStartDate, -14)
    return isBefore(previousFortnightStartDate, minStartDate)
  }

  const modifiers = {
    fortnight: days.map((d) => d.date),
    weekend: days.filter((d) => d.isWeekend).map((d) => d.date),
    selected: [selectedDate],
  }

  // console.log(currentFortnight)

  return (
    <>
      <div className="p-4">
        <h2 className="text-lg font-bold text-center">Fortnight Navigator</h2>
        <p className="text-center text-sm mb-4">
          Fortnight: {fortnightIndex + 1} (
          {format(fortnightStartDate, 'dd/MM/yyyy')} -{' '}
          {format(fortnightEndDate, 'dd/MM/yyyy')})
        </p>

        <div className="flex justify-between items-center mb-4">
          <Button
            onClick={() => navigateToFortnight('previous')}
            disabled={isPreviousFortnightDisabled()}
          >
            Previous
          </Button>
          <Button
            onClick={() => navigateToFortnight('next')}
            disabled={isNextFortnightDisabled()}
          >
            Next
          </Button>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date && !isAfter(date, currentFortnightEndDate))
              setSelectedDate(date)
          }}
          className="grid grid-cols-7 gap-1 text-center"
          disabled={disableOutsideLimits}
          modifiers={modifiers}
          modifiersClassNames={{
            fortnight:
              'bg-orange-500 text-white hover:bg-orange-500/90 hover:text-white',
            selected:
              'bg-orange-500/90 text-white hover:bg-orange-500/80 hover:text-white',
          }}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Dia</TableHead>
              <TableHead className="w-[100px]">Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[64px] text-sm px-3 py-1.5">
                Extras
              </TableHead>
              <TableHead className="text-right">Local de trabalho</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFortnight.days.map((fortnight, index) => (
              <TableRow
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className={
                  fortnight.isWeekend
                    ? 'bg-slate-50 hover:bg-slate-200/50 font-medium'
                    : 'p-1.5 h-12'
                }
              >
                <TableCell>{fortnight.dayName}</TableCell>
                <TableCell>{fortnight.formattedDate}</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <Input className="text-center" type="number" />
                </TableCell>
                <TableCell className="px-3 py-1.5">
                  <Input className="h-9" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
