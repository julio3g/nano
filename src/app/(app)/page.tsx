import { Header } from '@/components/header'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getResumeFortnights } from '@/http/get-resume'

import { DataTableDemo } from './test-table'

export default async function Home() {
  const { resume } = await getResumeFortnights()

  return (
    <>
      <Header />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do funcionário</TableHead>
            <TableHead>Nome do pagador</TableHead>
            <TableHead>Valor da diária</TableHead>
            <TableHead className="w-20">Extras</TableHead>
            <TableHead>Dias</TableHead>
            <TableHead>Valor total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resume.map(({ id, employee, payer, schedule }) => (
            <TableRow key={id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{payer.name}</TableCell>
              <TableCell>{employee.dailyValue}</TableCell>
              <TableCell>
                {schedule.reduce(
                  (total, { overtime }) => Math.round(total + overtime),
                  0,
                )}
                h
              </TableCell>
              <TableCell>
                {schedule.reduce((totalDays, { morning, afternoon }) => {
                  // const oneDay = morning && afternoon
                  // const halfDay = morning || afternoon
                  // // return totalDays + (oneDay ? 1 : halfDay)
                  // if (morning && afternoon) {
                  //   return totalDays + 1
                  // }
                  // if (morning || afternoon) {
                  //   return totalDays + 0.5
                  // }
                  // return totalDays
                  return totalDays + (Number(morning) + Number(afternoon)) * 0.5
                }, 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTableDemo />
    </>
  )
}
