import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, Layers } from 'lucide-react'
import FlashcardDeckClient from '@/components/flashcards/FlashcardDeckClient'

export default async function TopicFlashcardsPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const topicId = params.id

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: { flashcards: true },
  })

  if (!topic) {
    redirect('/dashboard/flashcards')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-20 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <Link href="/dashboard/flashcards" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 truncate">
              <Layers className="w-5 h-5 text-blue-400 shrink-0" /> {topic.title} - Deck
            </h1>
            <p className="text-xs text-slate-400 truncate">Practice active recall with interactive flip cards</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-3xl w-full mx-auto flex flex-col justify-center">
        <FlashcardDeckClient flashcards={topic.flashcards} />
      </main>
    </div>
  )
}
