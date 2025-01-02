import { api } from './api-client'

export interface Schedule {
  id?: string
  date: Date
  morning?: boolean
  afternoon?: boolean
  overtime?: number
  location?: string
  createdAt?: Date
  updatedAt?: Date
  fortnightId?: string
}

interface FortnightResponse {
  fortnight: {
    id: string
    startDate: Date
    endDate: Date
    employeeId: string
    payerId: string
    createdAt: Date
    updatedAt: Date
    schedule: Schedule[]
  }
}

export async function getFortnightById(id: string) {
  const result = await api.get(`fortnights/${id}`).json<FortnightResponse>()
  return result
}
