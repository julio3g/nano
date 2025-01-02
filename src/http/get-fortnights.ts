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
  id: string
  startDate: Date
  endDate: Date
  employeeId: string
  payerId: string
  createdAt: Date
  updatedAt: Date
  schedule: Schedule[]
}

export async function getFortnights() {
  const result = await api.get('fortnights').json<FortnightResponse>()
  return result
}
