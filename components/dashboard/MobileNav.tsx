'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, BarChart3, PlusCircle, FileText, Layers, Brain, LogOut, Menu, X, Flame, Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MobileNav({ user }: { user: any }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to delete account')
      }

      router.push('/login')
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
      setLoading(false)
      setShowDeleteModal(false)
    }
  }

  return (
    <>
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-45 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              LearnSphere <span className="text-indigo-400">AI</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-amber-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{user.profile?.streakCount || 1}d</span>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800 p-6 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top duration-200 z-50">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600/10 text-indigo-400 font-medium text-sm border border-indigo-500/20"
            >
              <BarChart3 className="w-5 h-5" /> Dashboard
            </Link>
            <Link
              href="/dashboard/upload"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 font-medium text-sm"
            >
              <PlusCircle className="w-5 h-5" /> Upload Material
            </Link>
            <Link
              href="/dashboard/notes"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 font-medium text-sm"
            >
              <FileText className="w-5 h-5" /> Notes Library
            </Link>
            <Link
              href="/dashboard/flashcards"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 font-medium text-sm"
            >
              <Layers className="w-5 h-5" /> Flashcards
            </Link>
            <Link
              href="/dashboard/tutor"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 font-medium text-sm"
            >
              <Brain className="w-5 h-5" /> AI Tutor
            </Link>
            <div className="pt-4 border-t border-slate-800 mt-2 space-y-2">
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-300 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </form>
              <button
                onClick={() => {
                  setOpen(false)
                  setShowDeleteModal(true)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 bg-red-500/10 border border-red-500/20 text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Your Account?</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                This action is permanent and cannot be undone. All your uploaded materials, AI notes, quizzes, flashcards, and learning progress will be permanently deleted.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-800 text-slate-300 hover:text-white text-sm font-semibold hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold shadow-lg shadow-red-600/20 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
