'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { getEmployees } from '@/http/get-employees'
import { cn } from '@/lib/utils'

import type { CreateFortnightFormData } from '.'

export function SearchEmployeeForm() {
  const [open, setOpen] = React.useState(false)
  const form = useFormContext<CreateFortnightFormData>()

  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getEmployees(),
  })

  return (
    <>
      {isLoading ? (
        <div className="space-y-2 w-full">
          <Skeleton className="h-3.5" />
          <Skeleton className="h-10" />
        </div>
      ) : (
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Funcionário</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? data?.employees.find(({ id }) => id === field.value)
                            ?.name
                        : 'Selecione o funcionário'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar funcionários..." />
                    <CommandList>
                      <CommandEmpty>
                        Nenhum funcionário encontrado.
                      </CommandEmpty>
                      <CommandGroup>
                        {data?.employees.map(({ id, name }) => (
                          <CommandItem
                            value={name}
                            key={id}
                            onSelect={() => {
                              form.setValue('employeeId', id)
                              setOpen(false)
                            }}
                          >
                            {name}
                            <Check
                              className={cn(
                                'ml-auto',
                                id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  )
}
