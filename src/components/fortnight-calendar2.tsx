'use client'

import { addDays, isAfter, isBefore } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'

import { Calendar } from '@/components/ui/calendar'
import { getCurrentFortnight } from '@/utils/get-current-fortnight'

import { Button } from './ui/button'

export function FortnightCalendar() {
  const initialStartDate = useMemo(() => new Date(2024, 10, 9), [])
  const today = new Date()

  const minStartDate = useMemo(() => initialStartDate, [initialStartDate])
  const maxStartDate = useMemo(
    () => addDays(initialStartDate, 365),
    [initialStartDate],
  )

  const [currentFortnight, setCurrentFortnight] = useState(() =>
    getCurrentFortnight(initialStartDate, today),
  )
  const [selectedDate, setSelectedDate] = useState(today)

  const navigateToFortnight = (direction: 'previous' | 'next') => {
    const newStartDate =
      direction === 'previous'
        ? addDays(fortnightStartDate, -14)
        : addDays(fortnightStartDate, 14)

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
    return isBefore(date, minStartDate) || isAfter(date, fortnightStartDate)
  }

  const isNextFortnightDisabled = () => {
    const nextFortnightStartDate = addDays(fortnightStartDate, 14)
    return (
      isAfter(nextFortnightStartDate, today) ||
      isAfter(nextFortnightStartDate, maxStartDate)
    )
  }

  function isPreviousFortnightDisabled() {
    const previousFortnightStartDate = addDays(fortnightStartDate, -14)
    return isBefore(previousFortnightStartDate, minStartDate)
  }

  const modifiers = {
    fortnight: days.map((d) => d.date),
    weekend: days.filter((d) => d.isWeekend).map((d) => d.date),
    selected: [selectedDate],
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-center">Fortnight Navigator</h2>
      <p className="text-center text-sm mb-4">
        Fortnight: {fortnightIndex + 1} (
        {fortnightStartDate.toLocaleDateString()} -{' '}
        {fortnightEndDate.toLocaleDateString()})
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
          if (date) setSelectedDate(date)
        }}
        disabled={disableOutsideLimits}
        modifiers={modifiers}
        modifiersClassNames={{
          fortnight:
            'bg-orange-500 text-white hover:bg-orange-500/90 hover:text-white first:rounded-l-md last:rounded-r-md',
        }}
      />
    </div>
  )
}
