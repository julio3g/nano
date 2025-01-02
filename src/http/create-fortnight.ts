import { api } from './api-client'
import type { Schedule } from './get-fortnights'

interface CreateFortnightRequest {
  startDate: Date
  endDate: Date
  payerId: string
  employeeId: string
  schedule: Schedule[]
}

type CreateFortnightResponse = undefined
export async function createFortnight({
  startDate,
  endDate,
  payerId,
  employeeId,
  schedule,
}: CreateFortnightRequest): Promise<CreateFortnightResponse> {
  await api.post('fortnights', {
    json: {
      startDate,
      endDate,
      payerId,
      employeeId,
      schedule,
    },
  })
}
