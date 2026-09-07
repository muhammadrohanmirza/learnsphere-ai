import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import * as z from 'zod'

const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = forgotSchema.safeParse(body)
    
    if (!result.success) {
      const errorMessage = result.error.issues?.[0]?.message || 'Invalid input data'
      return NextResponse.json({ message: errorMessage }, { status: 400 })
    }

    const { email, newPassword } = result.data

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'No account found with this email address' },
        { status: 404 }
      )
    }

    const hashedPassword = await hash(newPassword, 10)

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    return NextResponse.json(
      { message: 'Password reset successfully. You can now sign in with your new password.' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Forgot Password API Error:', error)
    return NextResponse.json(
      { message: error.message || 'Something went wrong during password reset' },
      { status: 500 }
    )
  }
}
