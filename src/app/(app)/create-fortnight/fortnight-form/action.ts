'use server'

import { createFortnight } from '@/http/create-fortnight'
import apiError from '@/utils/errors'

import type { CreateFortnightFormData } from '.'

export async function createFortnightAction(data: CreateFortnightFormData) {
  try {
    const response = await createFortnight(data)
    if (!response) return { message: 'Email ou usuário já cadastrados!' }
    return null
  } catch (error: unknown) {
    return { message: apiError(error) }
  }
}
