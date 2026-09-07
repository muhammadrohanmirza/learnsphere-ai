import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Sparkles, BookOpen, Brain, 
  Layers, FileText, Award, Users, TrendingUp 
} from 'lucide-react'
import PricingFAQSection from '@/components/dashboard/PricingFAQSection'
import LandingNavbar from '@/components/shared/LandingNavbar'

export default async function LandingPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <LandingNavbar session={session} />

      {/* Hero Section matching the template */}
      <main className="flex-1 px-4 sm:px-6 md:px-12 py-12 sm:py-16 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> AI-Powered Learning Platform
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Learn Smarter.<br />
              Practice Better.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Improve Faster.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-xl leading-relaxed">
              Upload your study material and let AI create smart notes, 30+ MCQ quizzes, flashcards and personalized learning paths just for you.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto hover:scale-105 transition-transform duration-500">
              <Link
                href={session ? '/dashboard' : '/login?mode=signup'}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-600/30 transition-all text-base w-full sm:w-auto"
              >
                <Sparkles className="w-5 h-5" /> Start Learning Now
              </Link>
            </div>
          </div>

          {/* Right Seamless / Realistic Diagram Image */}
          <div className="lg:col-span-5 flex justify-center relative w-full">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
              <Image
                src="/diagram.png"
                alt="LearnSphere AI Core Diagram"
                width={899}
                height={547}
                priority
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(79,70,229,0.35)] hover:scale-125 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>

        {/* Stats Bar matching template */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-white">10K+</h4>
              <p className="text-[11px] sm:text-xs text-slate-400">Happy Students</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-white">50K+</h4>
              <p className="text-[11px] sm:text-xs text-slate-400">Topics Learned</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-white">200K+</h4>
              <p className="text-[11px] sm:text-xs text-slate-400">Quizzes Solved</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-white">90%</h4>
              <p className="text-[11px] sm:text-xs text-slate-400">Improvement Rate</p>
            </div>
          </div>
        </div>

        {/* All-in-One AI Learning Suite Section */}
        <section id="features" className="mt-24 sm:mt-32 space-y-8 sm:space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              ⚡ Everything You Need to Excel
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              All-in-One AI Learning Suite
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-indigo-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Notes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get structured, easy-to-understand notes generated from your study material.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">30+ MCQs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI creates at least 30 MCQs with explanations to test your understanding.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Flashcards</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Smart flashcards for quick revision and better memory retention.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-purple-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">AI Tutor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ask anything, get instant answers and clear explanations from your AI tutor.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-emerald-500/40 transition-all sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Track Progress</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Analyze your performance and get personalized recommendations to improve.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-24 sm:mt-32 space-y-8 sm:space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              🚀 Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              How LearnSphere AI Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-center backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-black text-xl flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Upload Material</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Paste your chapter text, lecture notes, or study material directly into the platform.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-center backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 font-black text-xl flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">AI Analysis & Generation</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our advanced Google Gemini AI instantly builds structured notes, flashcards, and 30+ MCQs.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-center backdrop-blur-xl">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-black text-xl flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Practice & Improve</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Take quizzes, review mistakes with detailed explanations, and watch your scores soar.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing & Testimonials & FAQ Section with Smooth Animation */}
        <PricingFAQSection />
      </main>

      {/* Footer matching template */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-8 px-6 sm:px-8 text-center text-xs text-slate-500 mt-24 sm:mt-32">
        <p>© {new Date().getFullYear()} LearnSphere AI. Empowering students with intelligent learning loops.</p>
      </footer>
    </div>
  )
}
