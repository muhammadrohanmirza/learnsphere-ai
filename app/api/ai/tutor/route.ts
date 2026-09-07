import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { askAITutor } from '@/lib/ai/service'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { question, contextContent } = await req.json()
    if (!question) {
      return NextResponse.json({ message: 'Question is required' }, { status: 400 })
    }

    const answer = await askAITutor(question, contextContent || '')

    return NextResponse.json({ answer }, { status: 200 })
  } catch (error: any) {
    console.error('AI Tutor API Error:', error)
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
