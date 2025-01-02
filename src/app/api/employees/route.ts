import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { name, dailyValue } = await request.json()
  await prisma.employee.create({ data: { name, dailyValue } })
}

export async function GET() {
  const employees = await prisma.employee.findMany()

  return NextResponse.json({ employees }, { status: 200 })
}
