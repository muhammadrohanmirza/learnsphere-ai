import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Brain, Layers, FileText, Sparkles } from 'lucide-react'
import DownloadPDFButton from '@/components/notes/DownloadPDFButton'

export default async function LearnTopicPage({ params }: { params: { topic: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const topicId = params.topic

  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: {
      notes: true,
      quizzes: { include: { questions: true } },
      flashcards: true,
    },
  })

  if (!topic) {
    redirect('/dashboard')
  }

  const quiz = topic.quizzes[0]
  const note = topic.notes[0]
  const noteContent = note?.content || topic.content

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 sm:px-8 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden w-full md:w-auto">
          <Link href="/dashboard" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 truncate">
              <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" /> {topic.title}
            </h1>
            <p className="text-xs text-slate-400 truncate">AI-generated complete learning package</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
          <DownloadPDFButton title={topic.title} content={noteContent} />
          {quiz && (
            <Link
              href={`/quiz/${quiz.id}`}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/20 transition-all"
            >
              <Brain className="w-4 h-4" /> Take Quiz ({quiz.questions.length})
            </Link>
          )}
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Notes & Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> AI Revision Notes
              </h2>
              <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                Structured & Exam-focused
              </span>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line font-normal overflow-x-auto">
              {noteContent}
            </div>
          </div>
        </div>

        {/* Sidebar Quick Links (1 col) */}
        <div className="space-y-6">
          {/* Flashcards Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2 text-xs sm:text-sm">
                <Layers className="w-4 h-4 text-blue-400" /> Flashcards ({topic.flashcards.length})
              </h3>
              <Link href="/dashboard/flashcards" className="text-xs text-blue-400 font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {topic.flashcards.slice(0, 3).map((fc) => (
                <div key={fc.id} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                  <p className="font-semibold text-white mb-1">Q: {fc.front}</p>
                  <p className="text-slate-400">A: {fc.back}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tutor Prompt Box */}
          <div className="bg-gradient-to-tr from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-white flex items-center gap-2 text-xs sm:text-sm mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Need Help?
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Have questions about this topic or need simpler examples? Ask your AI Tutor!
            </p>
            <Link
              href={`/dashboard/tutor?topic=${topic.id}`}
              className="w-full block text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/20"
            >
              Ask AI Tutor
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
