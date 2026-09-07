import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import * as z from 'zod'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = signupSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: {
          create: {
            streakCount: 1,
            lastActiveDate: new Date(),
            totalXP: 50,
          },
        },
      },
    })

    // Create initial welcome learning activity
    await prisma.learningActivity.create({
      data: {
        userId: user.id,
        activityType: 'JOINED',
        title: 'Joined LearnSphere AI',
        xpEarned: 50,
      },
    })

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    )
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json(
      { message: 'Something went wrong during registration' },
      { status: 500 }
    )
  }
}
