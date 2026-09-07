import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, Layers, ExternalLink, BookOpen } from 'lucide-react'

export default async function FlashcardsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
  if (!user) redirect('/login')

  const topics = await prisma.topic.findMany({
    where: { userId: user.id },
    include: { flashcards: true },
    orderBy: { createdAt: 'desc' },
  })

  const topicsWithCards = topics.filter((t) => t.flashcards.length > 0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-20 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <Link href="/dashboard" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 truncate">
              <Layers className="w-5 h-5 text-blue-400 shrink-0" /> Flashcards Library
            </h1>
            <p className="text-xs text-slate-400 truncate">Select a topic deck to practice active recall</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">
        {topicsWithCards.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <p className="text-sm text-slate-400 mb-4">No flashcard decks generated yet.</p>
            <Link href="/dashboard/upload" className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold inline-block">
              Upload Material & Generate Flashcards
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topicsWithCards.map((topic) => (
              <div key={topic.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 truncate">{topic.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {topic.description || 'AI-generated study flashcards deck'}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold mb-6">
                    {topic.flashcards.length} Flashcards Available
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/dashboard/flashcards/${topic.id}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    Study Deck <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
