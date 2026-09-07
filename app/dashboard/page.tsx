import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { 
  GraduationCap, BookOpen, Brain, Award, Flame, 
  ArrowUpRight, PlusCircle, Sparkles, 
  FileText, LogOut, BarChart3, Layers
} from 'lucide-react'
import MobileNav from '@/components/dashboard/MobileNav'
import DeleteAccountButton from '@/components/dashboard/DeleteAccountButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.email) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      profile: true,
      topics: { orderBy: { createdAt: 'desc' } },
      quizzes: { orderBy: { createdAt: 'desc' } },
      quizAttempts: { orderBy: { createdAt: 'desc' }, include: { quiz: true } },
    },
  })

  if (!user) {
    redirect('/login')
  }

  const totalTopics = await prisma.topic.count({ where: { userId: user.id } })
  const totalQuizzes = await prisma.quiz.count({ where: { userId: user.id } })
  const totalNotes = await prisma.note.count({ where: { userId: user.id } })
  const totalFlashcards = await prisma.flashcard.count({ where: { userId: user.id } })

  const attempts = await prisma.quizAttempt.findMany({
    where: { userId: user.id, status: 'COMPLETED' },
  })

  const avgScore = attempts.length > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.percentage, 0) / attempts.length)
    : 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl hidden lg:flex flex-col justify-between p-6 sticky top-0 h-screen">
        <div>
          <Link href="/" className="flex items-center gap-3 mb-8 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">
              LearnSphere <span className="text-indigo-400">AI</span>
            </span>
          </Link>

          <nav className="space-y-1.5">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600/10 text-indigo-400 font-medium text-sm border border-indigo-500/20">
              <BarChart3 className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/dashboard/upload" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-sm transition-all">
              <PlusCircle className="w-5 h-5" /> Upload Material
            </Link>
            <Link href="/dashboard/notes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-sm transition-all">
              <FileText className="w-5 h-5" /> Notes Library
            </Link>
            <Link href="/dashboard/flashcards" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-sm transition-all">
              <Layers className="w-5 h-5" /> Flashcards
            </Link>
            <Link href="/dashboard/tutor" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-sm transition-all">
              <Brain className="w-5 h-5" /> AI Tutor
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 shrink-0">
              {user.name?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-white">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
          <DeleteAccountButton />
        </div>
      </aside>

      {/* Mobile Top Navbar */}
      <MobileNav user={user} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Desktop Top Header */}
        <header className="h-20 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl px-4 md:px-8 hidden lg:flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {user.name} 👋</h1>
            <p className="text-sm text-slate-400">Here is your AI learning progress and activity overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-amber-400 text-sm font-semibold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{user.profile?.streakCount || 1} Day Streak</span>
            </div>
            <Link
              href="/dashboard/upload"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Sparkles className="w-4 h-4" /> New Study Session
            </Link>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-7xl w-full mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Topics Studied</p>
                  <h3 className="text-3xl font-black text-white mt-2">{totalTopics}</h3>
                </div>
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-indigo-400 font-medium">
                <span>Active learning packages</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Quizzes Completed</p>
                  <h3 className="text-3xl font-black text-white mt-2">{attempts.length}</h3>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                  <Brain className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-purple-400 font-medium">
                <span>{totalQuizzes} total quizzes created</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">Average Quiz Score</p>
                  <h3 className="text-3xl font-black text-white mt-2">{avgScore}%</h3>
                </div>
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <span>{avgScore >= 80 ? '🌟 Excellent performance' : '👍 Keep practicing'}</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">AI Notes & Flashcards</p>
                  <h3 className="text-3xl font-black text-white mt-2">{totalNotes + totalFlashcards}</h3>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-blue-400 font-medium">
                <span>{totalNotes} notes, {totalFlashcards} flashcards</span>
              </div>
            </div>
          </div>

          {/* Recent Topics & Quiz Attempts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Recent Topics */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col h-[420px]">
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" /> Recent Learning Topics
                </h3>
                <Link href="/dashboard/upload" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  + Add New
                </Link>
              </div>

              {user.topics.length === 0 ? (
                <div className="text-center py-12 text-slate-500 my-auto">
                  <p className="text-sm">No topics uploaded yet.</p>
                  <Link href="/dashboard/upload" className="mt-3 inline-block text-xs font-semibold bg-indigo-600 text-white px-4 py-2 rounded-xl">
                    Upload Your First Material
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                  {user.topics.map((topic) => (
                    <div key={topic.id} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-between hover:border-indigo-500/40 transition-all">
                      <div className="overflow-hidden mr-2">
                        <h4 className="font-semibold text-white text-sm truncate">{topic.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{topic.description || 'AI-generated study package'}</p>
                      </div>
                      <Link
                        href={`/learn/${topic.id}`}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1 shrink-0"
                      >
                        Study <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Quiz Attempts */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col h-[420px]">
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" /> Recent Quiz Results
                </h3>
                <span className="text-xs font-semibold text-purple-400">
                  {user.quizAttempts.length} Attempts
                </span>
              </div>

              {user.quizAttempts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 my-auto">
                  <p className="text-sm">No quiz attempts recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                  {user.quizAttempts.map((attempt) => (
                    <div key={attempt.id} className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-between">
                      <div className="overflow-hidden mr-2">
                        <h4 className="font-semibold text-white text-sm truncate">{attempt.quiz.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          Score: {attempt.score} / {attempt.total} ({Math.round(attempt.percentage)}%)
                        </p>
                      </div>
                      <Link
                        href={`/quiz/review/${attempt.id}`}
                        className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-600 hover:text-white transition-all shrink-0"
                      >
                        Review
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
