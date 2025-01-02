import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { generateFortnight } from '@/utils/generate-fortnight'

export function FortnightTable() {
  const fortnight = generateFortnight(new Date())
  return (
    <div>
      {fortnight.map((fortnight, index) => (
        <Table key={index} className={fortnight.isWeekend ? 'bg-muted/50' : ''}>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className={fortnight.isWeekend ? 'font-medium' : ''}>
                {format(fortnight.date, 'dd/MM/yyyy')}
              </TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  )
}
