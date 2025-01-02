import type { Metadata } from 'next'

import { UpdateFortnightForm } from './update-form'

export const metadata: Metadata = {
  title: 'Editar a quinzena',
  description: 'Upload new videos.',
}

export default async function CreateFortnight() {
  return <UpdateFortnightForm />
}
