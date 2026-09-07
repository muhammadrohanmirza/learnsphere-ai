import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Delete user (Prisma cascade will automatically delete profile, topics, notes, quizzes, attempts, flashcards, activities)
    await prisma.user.delete({
      where: { id: user.id },
    })

    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Delete Account Error:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
