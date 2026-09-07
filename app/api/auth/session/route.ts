import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(null, { status: 200 })
    }
    return NextResponse.json(session, { status: 200 })
  } catch (error) {
    return NextResponse.json(null, { status: 200 })
  }
}
