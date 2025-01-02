'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const createEmployeesFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Insira pelo menos 4 caracteres no nome' }),
  dailyValue: z.preprocess(
    (value) => {
      const setValue = String(value)
      const cleanedValue = setValue.replace(/[R$\s.]/g, '').replace(',', '.')
      return cleanedValue ? Number.parseFloat(cleanedValue) : 0
    },
    z.number().min(1, { message: 'O valor deve ser no mínimo R$ 1,00' }),
  ),
})

export type CreateEmployeesFormData = z.infer<typeof createEmployeesFormSchema>

export function EmployeesForm() {
  const form = useForm<CreateEmployeesFormData>({
    resolver: zodResolver(createEmployeesFormSchema),
    defaultValues: {
      name: '',
      dailyValue: 0,
    },
  })

  async function onSubmit(data: CreateEmployeesFormData) {
    toast.success('Event has been created.')
    console.log(data)
  }

  return (
    <Card className="max-w-80">
      <CardHeader>
        <CardTitle className="text-center font-semibold">
          Criar um novo funcionário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do funcionário:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="text-left" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dailyValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da diária:</FormLabel>
                  <FormControl>
                    <Input
                      type="currency"
                      {...field}
                      value={field.value || 'R$ 0,00'}
                      className="text-left"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full text-white bg-orange-500 hover:bg-orange-500/90 duration-150"
              type="submit"
            >
              Salvar funcionário
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
