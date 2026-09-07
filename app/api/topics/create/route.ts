import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateNotesFromContent, generateQuizFromContent, generateFlashcardsFromContent } from '@/lib/ai/service'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const { title, content } = await req.json()
    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 })
    }

    // 1. Create Topic
    const topic = await prisma.topic.create({
      data: {
        userId: user.id,
        title,
        description: `AI-generated study package for ${title}`,
        content,
      },
    })

    // 2. Save Document
    await prisma.document.create({
      data: {
        topicId: topic.id,
        fileName: `${title}.txt`,
        fileUrl: '#',
        fileType: 'text/plain',
        extractedText: content,
      },
    })

    // 3. Generate AI Notes
    const notesContent = await generateNotesFromContent(title, content)
    await prisma.note.create({
      data: {
        userId: user.id,
        topicId: topic.id,
        title: `Notes: ${title}`,
        content: notesContent,
        isPinned: true,
      },
    })

    // 4. Generate AI Quiz & Questions (Ensure 10-30 MCQs)
    const rawQuestions = await generateQuizFromContent(title, content)
    const quiz = await prisma.quiz.create({
      data: {
        userId: user.id,
        topicId: topic.id,
        title: `Quiz: ${title}`,
        description: `Comprehensive evaluation quiz for ${title}`,
        difficulty: 'INTERMEDIATE',
      },
    })

    for (const q of rawQuestions) {
      await prisma.question.create({
        data: {
          quizId: quiz.id,
          questionText: q.questionText || 'Sample question?',
          options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: q.correctAnswer || q.options?.[0] || 'Option A',
          explanation: q.explanation || 'Correct answer based on study material.',
          concept: q.concept || title,
        },
      })
    }

    // 5. Generate Flashcards
    const rawFlashcards = await generateFlashcardsFromContent(title, content)
    for (const f of rawFlashcards) {
      await prisma.flashcard.create({
        data: {
          userId: user.id,
          topicId: topic.id,
          front: f.front || 'Question',
          back: f.back || 'Answer',
        },
      })
    }

    // 6. Log Learning Activity & Update XP
    await prisma.learningActivity.create({
      data: {
        userId: user.id,
        activityType: 'TOPIC_STUDIED',
        title: `Studied topic: ${title}`,
        xpEarned: 100,
      },
    })

    await prisma.profile.update({
      where: { userId: user.id },
      data: { totalXP: { increment: 100 } },
    })

    return NextResponse.json({ message: 'Success', topicId: topic.id }, { status: 201 })
  } catch (error: any) {
    console.error('Topic Creation Error:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
