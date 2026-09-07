'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GraduationCap, ArrowRight, Menu, X } from 'lucide-react'

export default function LandingNav({ session }: { session: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`h-20 px-4 sm:px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#060913]/90 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl shadow-indigo-950/20' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-black text-white tracking-tight">
            LearnSphere <span className="text-indigo-400">AI</span>
          </span>
        </Link>

        {/* Desktop & Tablet Nav Links (visible on md and above) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </nav>

        {/* Desktop & Tablet Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 sm:px-4 py-2 transition-colors border border-slate-700/60 rounded-full hover:border-slate-500"
              >
                Log In
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button (visible on small screens) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all z-10"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-20 left-0 w-full bg-[#060913]/98 backdrop-blur-2xl border-b border-slate-800 p-6 flex flex-col gap-4 z-40 shadow-2xl animate-in slide-in-from-top duration-200">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-slate-800/60">Features</Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-slate-800/60">How It Works</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-slate-800/60">Pricing</Link>
          <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-white py-2 border-b border-slate-800/60">Testimonials</Link>
          <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-300 hover:text-white py-2">FAQ</Link>
          
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            {session ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30"
              >
                Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3.5 rounded-xl bg-slate-900 text-white text-sm font-semibold border border-slate-700/60"
                >
                  Log In
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
