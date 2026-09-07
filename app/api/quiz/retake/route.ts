import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateQuizFromContent } from '@/lib/ai/service'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const { topicId } = await req.json()
    if (!topicId) return NextResponse.json({ message: 'Topic ID required' }, { status: 400 })

    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
      include: { documents: true },
    })

    if (!topic) return NextResponse.json({ message: 'Topic not found' }, { status: 404 })

    // Generate fresh questions with random seed
    const rawQuestions = await generateQuizFromContent(topic.title, topic.content, Math.random())

    const newQuiz = await prisma.quiz.create({
      data: {
        userId: topic.userId,
        topicId: topic.id,
        title: `Retake Quiz: ${topic.title} (${new Date().toLocaleDateString()})`,
        description: 'Fresh AI-generated retake evaluation with 30+ MCQs',
        difficulty: 'INTERMEDIATE',
      },
    })

    for (const q of rawQuestions) {
      await prisma.question.create({
        data: {
          quizId: newQuiz.id,
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          concept: q.concept,
        },
      })
    }

    return NextResponse.json({ quizId: newQuiz.id }, { status: 201 })
  } catch (error: any) {
    console.error('Retake Quiz Error:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
