import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as z from 'zod'

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  rating: z.number().min(1).max(5).default(5),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = feedbackSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ message: result.error.issues[0]?.message || 'Invalid data' }, { status: 400 })
    }

    const { name, role, message, rating } = result.data

    // Using raw SQL query via Prisma client to bypass client engine lock issue for feedback table
    const created = await prisma.$executeRaw`
      INSERT INTO "feedbacks" (id, name, role, message, rating, created_at)
      VALUES (gen_random_uuid()::text, ${name}, ${role}, ${message}, ${rating}, NOW())
    `

    return NextResponse.json({ 
      message: 'Feedback submitted successfully', 
      feedback: { name, role, message, rating } 
    }, { status: 201 })
  } catch (error: any) {
    console.error('Feedback Submit Error:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.$queryRaw`
      SELECT id, name, role, message, rating, created_at as "createdAt"
      FROM "feedbacks"
      ORDER BY created_at DESC
      LIMIT 10
    `
    return NextResponse.json(feedbacks, { status: 200 })
  } catch (error: any) {
    console.error('Fetch Feedbacks Error:', error)
    return NextResponse.json([], { status: 200 })
  }
}
