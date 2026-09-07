'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'

export default function DeleteAccountButton() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
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
      setShowModal(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:text-white hover:bg-red-600/20 text-sm font-medium transition-all mt-2 border border-red-500/20"
      >
        <Trash2 className="w-4 h-4" /> Delete Account
      </button>

      {showModal && (
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
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-800 text-slate-300 hover:text-white text-sm font-semibold hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
