import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'
import UploadForm from '@/components/dashboard/UploadForm'

export default async function UploadPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <Link href="/dashboard" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 truncate">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" /> Upload Material
            </h1>
            <p className="text-xs text-slate-400 truncate">Transform notes & text into AI notes, 30+ MCQs, & flashcards.</p>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-4xl w-full mx-auto">
        <UploadForm />
      </main>
    </div>
  )
}
