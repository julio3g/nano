import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {}

export async function GET() {
  const payers = await prisma.payer.findMany()

  return NextResponse.json({ payers }, { status: 200 })
}
