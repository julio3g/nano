import { api } from './api-client'

interface PayerResponse {
  payers: {
    id: string
    name: string
  }[]
}

export async function getPayers() {
  return await api.get('payers').json<PayerResponse>()
}
