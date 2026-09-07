import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })

    const { quizId, answers } = await req.json()
    // answers is a dictionary: { [questionId]: selectedAnswer }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    })

    if (!quiz) return NextResponse.json({ message: 'Quiz not found' }, { status: 404 })

    let correctCount = 0
    const total = quiz.questions.length

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: user.id,
        quizId,
        score: 0,
        total,
        percentage: 0,
        status: 'COMPLETED',
        timeTaken: 120, // default placeholder
      },
    })

    for (const question of quiz.questions) {
      const selectedAnswer = answers[question.id] || ''
      const isCorrect = selectedAnswer === question.correctAnswer
      if (isCorrect) correctCount++

      await prisma.quizAnswer.create({
        data: {
          attemptId: attempt.id,
          questionId: question.id,
          selectedAnswer,
          isCorrect,
        },
      })
    }

    const percentage = Math.round((correctCount / total) * 100)

    await prisma.quizAttempt.update({
      where: { id: attempt.id },
      data: {
        score: correctCount,
        percentage,
      },
    })

    // Award XP and activity log
    await prisma.learningActivity.create({
      data: {
        userId: user.id,
        activityType: 'QUIZ_COMPLETED',
        title: `Completed quiz: ${quiz.title} (${percentage}%)`,
        xpEarned: correctCount * 10,
      },
    })

    await prisma.profile.update({
      where: { userId: user.id },
      data: { totalXP: { increment: correctCount * 10 } },
    })

    return NextResponse.json({ message: 'Quiz evaluated successfully', attemptId: attempt.id }, { status: 200 })
  } catch (error: any) {
    console.error('Quiz Submission Error:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
