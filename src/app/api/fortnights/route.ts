import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const fortnights = await prisma.fortnight.findMany({
    include: { schedule: true },
  })

  return NextResponse.json({ fortnights }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const { employeeId, payerId, startDate, endDate, schedule } =
    await request.json()

  const fortnight = await prisma.fortnight.create({
    data: {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      employeeId,
      payerId,
      schedule: {
        create: schedule.map((day) => ({
          date: new Date(day.date),
          morning: day.morning,
          afternoon: day.afternoon,
          overtime: day.overtime,
          location: day.location,
        })),
      },
    },
  })

  return NextResponse.json({ fortnight }, { status: 201 })
}
