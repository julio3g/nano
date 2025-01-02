'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format, isAfter, isBefore } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { generateFortnight } from '@/utils/generate-fortnight'
import { getCurrentFortnight } from '@/utils/get-current-fortnight'

import { createFortnightAction } from './action'
import { FortnightCalendarView } from './fortnight-calendar-view'
import { SearchEmployeeForm } from './search-employee'
import { SearchPayerForm } from './search-payer'

const createFortnightFormSchema = z.object({
  employeeId: z.string().uuid(),
  payerId: z.string().uuid(),
  startDate: z.date(),
  endDate: z.date(),
  schedule: z
    .array(
      z.object({
        date: z.date(),
        formattedDate: z.string(),
        isWeekend: z.boolean(),
        dayName: z.string(),
        overtime: z.coerce.number().optional(),
        morning: z.coerce.boolean().optional(),
        afternoon: z.boolean().optional(),
        location: z.string().optional(),
      }),
    )
    .min(1)
    .refine(
      (items) =>
        items.some((item) =>
          Boolean(
            item.overtime || item.morning || item.afternoon || item.location,
          ),
        ),
      {
        message: 'Pelo menos um item deve ter dados preenchidos.',
      },
    ),
})

export type CreateFortnightFormData = z.infer<typeof createFortnightFormSchema>

export function FortnightForm() {
  const form = useForm<CreateFortnightFormData>({
    resolver: zodResolver(createFortnightFormSchema),
  })

  const { formState } = form
  const { errors } = formState

  // create a logic the fortnight
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

  const { fortnightStartDate, fortnightEndDate, days } = currentFortnight

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
    fortnight: days.map(({ date }) => date),
    weekend: days.filter((d) => d.isWeekend).map((d) => d.date),
    selected: [selectedDate],
  }

  const dataCalendarView = {
    today,
    modifiers,
    disableOutsideLimits,
    selectedDate,
    currentFortnightEndDate,
    setSelectedDate,
  }

  // form
  const { fields, append } = useFieldArray({
    name: 'schedule',
    control: form.control,
  })

  useEffect(() => {
    if (fields.length === 0) {
      const items = generateFortnight(fortnightStartDate)
      for (const item of items) append(item)
    }
  }, [fortnightStartDate, append, fields.length])

  async function onSubmit(data: CreateFortnightFormData) {
    try {
      await createFortnightAction({
        employeeId: data.employeeId,
        payerId: data.payerId,
        startDate: data.startDate,
        endDate: data.endDate,
        schedule: data.schedule,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="max-w-[768px] flex p-6 flex-col">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 grid-cols-2">
            <SearchEmployeeForm />
            <SearchPayerForm />
          </div>

          <div className="space-y-3">
            <p className="text-center">
              Quinzena: {format(fortnightStartDate, 'dd/MM/yyyy')} até{' '}
              {format(fortnightEndDate, 'dd/MM/yyyy')}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => navigateToFortnight('previous')}
                disabled={isPreviousFortnightDisabled()}
              >
                Voltar
              </Button>
              <FortnightCalendarView {...dataCalendarView} />
              <Button
                onClick={() => navigateToFortnight('next')}
                disabled={isNextFortnightDisabled()}
              >
                Próxima
              </Button>
            </div>
          </div>
          {/* <FortnightTable {...currentFortnight} /> */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-36">Dia</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Manhã</TableHead>
                <TableHead>Tarde</TableHead>
                <TableHead className="w-20">Extras</TableHead>
                <TableHead>Local de Trabalho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow className="h-12" key={field.id}>
                  <TableCell>{field.dayName}</TableCell>
                  <TableCell>{field.formattedDate}</TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.morning`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="h-4 align-middle">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  {/* <TableCell className="pl-4 pr-0"> */}
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.afternoon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="h-4 align-middle">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  {/* <TableCell className="px-4 py-1.5"> */}
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.overtime`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-9 text-center" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  {/* <TableCell className="px-4 py-1.5"> */}
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`schedule.${index}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input className="h-9" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {errors.schedule?.message}

          <Button type="submit" className="mt-4">
            Save Changes
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
