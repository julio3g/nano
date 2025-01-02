// 'use client'

// import { addDays, format, isAfter, isBefore } from 'date-fns'
// import React, { useMemo } from 'react'

// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { useFortnightStore } from '@/stores/use-fortnight-store'
// import { getCurrentFortnight } from '@/utils/get-current-fortnight'

// export function FortnightCalendarWithStore() {
//   const {
//     currentFortnight,
//     selectedDate,
//     initialStartDate,
//     today,
//     setSelectedDate,
//     navigateToFortnight,
//     minStartDate,
//     maxStartDate,
//   } = useFortnightStore()

//   const { fortnightIndex, fortnightStartDate, fortnightEndDate, days } =
//     currentFortnight

//   const isNextFortnightDisabled = () => {
//     const nextFortnightStartDate = addDays(fortnightStartDate, 14)
//     return isAfter(nextFortnightStartDate, maxStartDate)
//   }

//   const isPreviousFortnightDisabled = () => {
//     const previousFortnightStartDate = addDays(fortnightStartDate, -14)
//     return isBefore(previousFortnightStartDate, minStartDate)
//   }

//   const currentFortnightEndDate = useMemo(() => {
//     const currentFortnightData = getCurrentFortnight(initialStartDate, today)
//     return currentFortnightData.fortnightEndDate
//   }, [initialStartDate, today])

//   const disableOutsideLimits = (date: Date) => {
//     return (
//       isBefore(date, minStartDate) ||
//       isAfter(date, currentFortnightEndDate) ||
//       isAfter(date, maxStartDate)
//     )
//   }

//   const modifiers = {
//     fortnight: days.map((d) => d.date),
//     weekend: days.filter((d) => d.isWeekend).map((d) => d.date),
//     selected: [selectedDate],
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold text-center">Fortnight Navigator</h2>
//       <p className="text-center text-sm mb-4">
//         Fortnight: {fortnightIndex + 1} (
//         {format(fortnightStartDate, 'dd/MM/yyyy')} -{' '}
//         {format(fortnightEndDate, 'dd/MM/yyyy')})
//       </p>

//       <div className="flex justify-between items-center mb-4">
//         <Button
//           onClick={() => navigateToFortnight('previous')}
//           disabled={isPreviousFortnightDisabled()}
//         >
//           Previous
//         </Button>
//         <Button
//           onClick={() => navigateToFortnight('next')}
//           disabled={isNextFortnightDisabled()}
//         >
//           Next
//         </Button>
//       </div>

//       <Calendar
//         mode="single"
//         selected={selectedDate}
//         onSelect={(date) => {
//           if (date && !isAfter(date, maxStartDate)) setSelectedDate(date)
//         }}
//         className="grid grid-cols-7 gap-1 text-center"
//         disabled={disableOutsideLimits}
//         modifiers={modifiers}
//         modifiersClassNames={{
//           fortnight:
//             'bg-orange-500 text-white hover:bg-orange-500/90 hover:text-white',
//           selected:
//             'bg-orange-500/90 text-white hover:bg-orange-500/80 hover:text-white',
//         }}
//       />

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[140px]">Dia</TableHead>
//             <TableHead className="w-[100px]">Data</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="w-[64px] text-sm px-3 py-1.5">
//               Extras
//             </TableHead>
//             <TableHead className="text-right">Local de trabalho</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {days.map((fortnight, index) => (
//             <TableRow
//               key={index}
//               className={
//                 fortnight.isWeekend
//                   ? 'bg-slate-50 hover:bg-slate-200/50 font-medium'
//                   : 'p-1.5 h-12'
//               }
//             >
//               <TableCell>{fortnight.dayName}</TableCell>
//               <TableCell>{fortnight.formattedDate}</TableCell>
//               <TableCell>Paid</TableCell>
//               <TableCell>
//                 <Input className="text-center" type="number" />
//               </TableCell>
//               <TableCell className="px-3 py-1.5">
//                 <Input className="h-9" />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// 'use client'

// import { addDays, format, isAfter, isBefore } from 'date-fns'
// import React, { useMemo } from 'react'

// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { useFortnightStore } from '@/stores/use-fortnight-store'

// export function FortnightCalendarWithStore() {
//   const {
//     currentFortnight,
//     selectedDate,
//     initialStartDate,
//     today,
//     setSelectedDate,
//     navigateToFortnight,
//     minStartDate,
//     maxStartDate,
//     saveFortnight, // Add save functionality
//   } = useFortnightStore()

//   const { fortnightIndex, fortnightStartDate, fortnightEndDate, days } =
//   setCurrentFortnight()

//   const isNextFortnightDisabled = () => {
//     const nextFortnightStartDate = addDays(fortnightStartDate, 14)
//     return isAfter(nextFortnightStartDate, maxStartDate)
//   }

//   const isPreviousFortnightDisabled = () => {
//     const previousFortnightStartDate = addDays(fortnightStartDate, -14)
//     return isBefore(previousFortnightStartDate, minStartDate)
//   }

//   const currentFortnightEndDate = useMemo(() => {
//     return fortnightEndDate
//   }, [fortnightEndDate])

//   const disableOutsideLimits = (date: Date) => {
//     return (
//       isBefore(date, minStartDate) ||
//       isAfter(date, currentFortnightEndDate) ||
//       isAfter(date, maxStartDate)
//     )
//   }

//   const modifiers = {
//     fortnight: days.map((d) => d.date),
//     weekend: days.filter((d) => d.isWeekend).map((d) => d.date),
//     selected: [selectedDate],
//   }

//   // Update schedule items directly in the store
//   const updateScheduleItem = (index: number, key: string, value: any) => {
//     const updatedDays = [...days]
//     updatedDays[index] = {
//       ...updatedDays[index],
//       [key]: value,
//     }
//     saveFortnight({
//       ...currentFortnight,
//       days: updatedDays,
//     })
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold text-center">Fortnight Navigator</h2>
//       <p className="text-center text-sm mb-4">
//         Fortnight: {fortnightIndex + 1} (
//         {format(fortnightStartDate, 'dd/MM/yyyy')} -{' '}
//         {format(fortnightEndDate, 'dd/MM/yyyy')})
//       </p>

//       <div className="flex justify-between items-center mb-4">
//         <Button
//           onClick={() => navigateToFortnight('previous')}
//           disabled={isPreviousFortnightDisabled()}
//         >
//           Previous
//         </Button>
//         <Button
//           onClick={() => navigateToFortnight('next')}
//           disabled={isNextFortnightDisabled()}
//         >
//           Next
//         </Button>
//       </div>

//       <Calendar
//         mode="single"
//         selected={selectedDate}
//         onSelect={(date) => {
//           if (date && !isAfter(date, maxStartDate)) setSelectedDate(date)
//         }}
//         className="grid grid-cols-7 gap-1 text-center"
//         disabled={disableOutsideLimits}
//         modifiers={modifiers}
//         modifiersClassNames={{
//           fortnight:
//             'bg-orange-500 text-white hover:bg-orange-500/90 hover:text-white',
//           selected:
//             'bg-orange-500/90 text-white hover:bg-orange-500/80 hover:text-white',
//         }}
//       />

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[140px]">Dia</TableHead>
//             <TableHead className="w-[100px]">Data</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="w-[64px] text-sm px-3 py-1.5">
//               Extras
//             </TableHead>
//             <TableHead className="text-right">Local de trabalho</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {days.map((day, index) => (
//             <TableRow
//               key={index}
//               className={
//                 day.isWeekend
//                   ? 'bg-slate-50 hover:bg-slate-200/50 font-medium'
//                   : 'p-1.5 h-12'
//               }
//             >
//               <TableCell>{day.dayName}</TableCell>
//               <TableCell>{day.formattedDate}</TableCell>
//               <TableCell>Paid</TableCell>
//               <TableCell>
//                 <Input
//                   className="text-center"
//                   type="number"
//                   defaultValue={day.overtime || 0}
//                   onChange={(e) =>
//                     updateScheduleItem(
//                       index,
//                       'overtime',
//                       Number(e.target.value),
//                     )
//                   }
//                 />
//               </TableCell>
//               <TableCell className="px-3 py-1.5">
//                 <Input
//                   className="h-9"
//                   defaultValue={day.location || ''}
//                   onChange={(e) =>
//                     updateScheduleItem(index, 'location', e.target.value)
//                   }
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

'use client'

import { addDays, format, isAfter, isBefore } from 'date-fns'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFortnight } from '@/contexts/fortnight-context'

export function FortnightCalendarWithStore() {
  const { state, dispatch } = useFortnight()
  const { currentFortnight, selectedDate, initialStartDate, today } = state

  const isNextFortnightDisabled = () => {
    const nextFortnightStartDate = addDays(
      currentFortnight.fortnightStartDate,
      14,
    )
    return isAfter(nextFortnightStartDate, addDays(initialStartDate, 365))
  }

  const isPreviousFortnightDisabled = () => {
    const previousFortnightStartDate = addDays(
      currentFortnight.fortnightStartDate,
      -14,
    )
    return isBefore(previousFortnightStartDate, initialStartDate)
  }

  const disableOutsideLimits = (date: Date) => {
    return (
      isBefore(date, initialStartDate) ||
      isAfter(date, addDays(initialStartDate, 365))
    )
  }

  const modifiers = {
    fortnight: currentFortnight.days.map((d) => d.date),
    weekend: currentFortnight.days
      .filter((d) => d.isWeekend)
      .map((d) => d.date),
    selected: [selectedDate],
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-center">Fortnight Navigator</h2>
      <p className="text-center text-sm mb-4">
        Fortnight: {currentFortnight.fortnightIndex + 1} (
        {format(currentFortnight.fortnightStartDate, 'dd/MM/yyyy')} -{' '}
        {format(currentFortnight.fortnightEndDate, 'dd/MM/yyyy')})
      </p>

      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() =>
            dispatch({ type: 'NAVIGATE_FORTNIGHT', payload: 'previous' })
          }
          disabled={isPreviousFortnightDisabled()}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            dispatch({ type: 'NAVIGATE_FORTNIGHT', payload: 'next' })
          }
          disabled={isNextFortnightDisabled()}
        >
          Next
        </Button>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) =>
          dispatch({ type: 'SET_SELECTED_DATE', payload: date })
        }
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
          {currentFortnight.days.map((day, index) => (
            <TableRow key={index}>
              <TableCell>{day.dayName}</TableCell>
              <TableCell>{day.formattedDate}</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>
                <Input
                  type="number"
                  defaultValue={day.overtime || 0}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_DAY',
                      payload: {
                        index,
                        key: 'overtime',
                        value: e.target.value,
                      },
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={day.location || ''}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_DAY',
                      payload: {
                        index,
                        key: 'location',
                        value: e.target.value,
                      },
                    })
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
