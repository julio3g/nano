import { api } from './api-client'

interface Employee {
  name: string
  dailyValue: number
}

interface Payer {
  name: string
}

export interface Schedule {
  date: Date
  morning: boolean
  afternoon: boolean
  overtime: number
}

interface ResumeFortnightResponse {
  resume: {
    id: string
    startDate: Date
    endDate: Date
    payer: Payer
    employee: Employee
    schedule: Schedule[]
  }[]
}

export async function getResumeFortnights() {
  const result = await api.get('resume').json<ResumeFortnightResponse>()
  return result
}
