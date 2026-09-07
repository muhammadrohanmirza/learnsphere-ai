'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { GraduationCap, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'

export default function SignOutPage() {
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link href="/" className="flex justify-center items-center gap-3 mb-4 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">
            LearnSphere <span className="text-indigo-400">AI</span>
          </span>
        </Link>
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">Sign Out</h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Are you sure you want to end your current session?
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900/80 backdrop-xl py-8 px-6 shadow-2xl border border-slate-800 rounded-3xl sm:px-10 space-y-6 text-center">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
            <span>You will need to sign back in with your credentials to access your study materials and progress dashboard.</span>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/20 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Confirm Sign Out <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <Link
              href="/dashboard"
              className="w-full block py-3 px-4 rounded-xl border border-slate-800 text-slate-300 hover:text-white text-sm font-semibold hover:bg-slate-800/60 transition-all"
            >
              Cancel & Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
