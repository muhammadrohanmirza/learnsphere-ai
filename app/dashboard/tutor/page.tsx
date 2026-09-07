import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, Brain } from 'lucide-react'
import AITutorClient from '@/components/tutor/AITutorClient'

export default async function AITutorPage({ searchParams }: { searchParams: { topic?: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
  if (!user) redirect('/login')

  const topics = await prisma.topic.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  let selectedTopic = null
  if (searchParams.topic) {
    selectedTopic = await prisma.topic.findUnique({
      where: { id: searchParams.topic },
      include: { notes: true },
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-20 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <Link href="/dashboard" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 truncate">
              <Brain className="w-5 h-5 text-indigo-400 shrink-0" /> AI Tutor Assistant
            </h1>
            <p className="text-xs text-slate-400 truncate">Ask questions, request examples, or clarify difficult concepts</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-4xl w-full mx-auto flex flex-col">
        <AITutorClient topics={topics} initialTopic={selectedTopic} />
      </main>
    </div>
  )
}
