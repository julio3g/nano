import type { Metadata } from 'next'

import { FortnightForm } from './fortnight-form'

export const metadata: Metadata = {
  title: 'Criar nova quinzena',
  description: 'Upload new videos.',
}

export default async function CreateFortnight() {
  return <FortnightForm />
}
