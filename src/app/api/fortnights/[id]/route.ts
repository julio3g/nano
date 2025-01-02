import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const fortnight = await prisma.fortnight.findFirst({
    where: { id },
    include: {
      schedule: {
        orderBy: {
          date: 'asc',
        },
      },
    },
  })

  return NextResponse.json({ fortnight }, { status: 200 })
}
