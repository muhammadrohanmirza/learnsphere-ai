import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import QuizClient from '@/components/quiz/QuizClient'

export default async function QuizPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const quizId = params.id

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: true,
      topic: true,
    },
  })

  if (!quiz || quiz.questions.length === 0) {
    redirect('/dashboard')
  }

  return <QuizClient quiz={quiz} />
}
