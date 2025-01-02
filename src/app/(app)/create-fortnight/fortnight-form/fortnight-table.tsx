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

// interface FortnightTableProps {
//   fields: {
//     schedule: {
//       date: Date
//       formattedDate: string
//       isWeekend: boolean
//       dayName: string
//       morning?: boolean | undefined
//       afternoon?: boolean | undefined
//       overtime?: number | undefined
//       location?: string | undefined
//     }[]
//   }[]
// }

// const fields: FieldArrayWithId<
//   {
//     schedule: {
//       date: Date
//       formattedDate: string
//       isWeekend: boolean
//       dayName: string
//       morning?: boolean | undefined
//       afternoon?: boolean | undefined
//       overtime?: number | undefined
//       location?: string | undefined
//     }[]
//     employeeId: string
//     payerId: string
//     startDate: Date
//     endDate: Date
//   },
//   'schedule',
//   'id'
// >[]

export function FortnightTable({ fields }: FortnightTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-36">Dia</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Manhã</TableHead>
          <TableHead>Tarde</TableHead>
          <TableHead>Extras</TableHead>
          <TableHead>Localização</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field, index) => (
          <TableRow key={field.id}>
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
                        // className="items-center"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 capitalize" />
                  </FormItem>
                )}
              />
            </TableCell>
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
                    <FormMessage className="text-red-500 capitalize" />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={`schedule.${index}.overtime`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 capitalize" />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={`schedule.${index}.location`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 capitalize" />
                  </FormItem>
                )}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
