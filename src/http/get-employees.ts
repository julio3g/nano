import { api } from './api-client'

interface EmployeeResponse {
  employees: {
    id: string
    name: string
    dailyValue: number
  }[]
}

export async function getEmployees() {
  return await api.get('employees').json<EmployeeResponse>()
}
