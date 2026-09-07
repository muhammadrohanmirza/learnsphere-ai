import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import QuizReviewClient from '@/components/quiz/QuizReviewClient'

export default async function QuizReviewPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const attemptId = params.id

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      quiz: { include: { topic: true } },
      quizAnswers: { include: { question: true } },
    },
  })

  if (!attempt) {
    redirect('/dashboard')
  }

  return <QuizReviewClient attempt={attempt} />
}
