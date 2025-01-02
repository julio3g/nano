'use server'

import { createFortnight } from '@/http/create-fortnight'
import { getFortnightById } from '@/http/get-fortnight-by-id'
import apiError from '@/utils/errors'

import type { CreateFortnightFormData } from '.'

export async function getFortnightByIdAction(data: CreateFortnightFormData) {
  try {
    const response = await getFortnightById(data)
    if (!response) return { message: 'Email ou usuário já cadastrados!' }
    return null
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
}
