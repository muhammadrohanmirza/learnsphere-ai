'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowRight, Menu, X } from 'lucide-react'

export default function LandingNavbar({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="h-20 border-b border-slate-800/60 bg-[#060913]/80 backdrop-blur-2xl px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">
            LearnSphere <span className="text-indigo-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-500">
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors border border-slate-700/60 rounded-full hover:border-slate-500"
              >
                Log In
              </Link>
              <Link
                href="/login?mode=signup"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#060913]/95 backdrop-blur-xl border-b border-slate-800/60 p-6 flex flex-col gap-4 text-sm font-medium text-slate-300 z-40">
          <Link href="#features" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link href="#testimonials" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
          <Link href="#faq" className="hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          {session ? (
            <Link href="/dashboard" className="text-indigo-400 font-semibold" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          ) : (
            <Link href="/login" className="w-40 text-center bg-indigo-600 hover:scale-105 transition-transform duration-500 hover:bg-indigo-200 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-indigo-600/30" onClick={() => setIsMenuOpen(false)}>Login / Sign Up</Link>
          )}
        </div>
      )}
    </>
  )
}
