import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const resume = await prisma.fortnight.findMany({
    select: {
      id: true,
      startDate: true,
      endDate: true,
      payer: { select: { name: true } },
      employee: { select: { name: true, dailyValue: true } },
      schedule: {
        select: {
          morning: true,
          afternoon: true,
          overtime: true,
        },
      },
    },
  })
  return NextResponse.json({ resume })
}
