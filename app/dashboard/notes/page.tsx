import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, FileText, BookOpen, Trash2, ExternalLink } from 'lucide-react'

export default async function NotesLibraryPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
  if (!user) redirect('/login')

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    include: { topic: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-20 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Notes Library
            </h1>
            <p className="text-xs text-slate-400">All your AI-generated study notes and summaries</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-6xl w-full mx-auto">
        {notes.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <p className="text-sm text-slate-400 mb-4">No notes generated yet.</p>
            <Link href="/dashboard/upload" className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold">
              Upload Material & Generate Notes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all">
                <div>
                  <h3 className="font-bold text-white text-base mb-2">{note.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-4 mb-4 leading-relaxed font-normal">
                    {note.content}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  {note.topicId && (
                    <Link
                      href={`/learn/${note.topicId}`}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1"
                    >
                      View Topic <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
