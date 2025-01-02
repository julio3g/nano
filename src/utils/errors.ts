export default function apiError(error: unknown) {
  if (error instanceof Error) return error.message
  return 'Erro genérico'
}
