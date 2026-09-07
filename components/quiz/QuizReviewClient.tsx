'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, XCircle, ArrowLeft, Award, Brain, Sparkles, RefreshCw, Loader2 } from 'lucide-react'

export default function QuizReviewClient({ attempt }: { attempt: any }) {
  const router = useRouter()
  const [retaking, setRetaking] = useState(false)

  const handleRetakeWithNewQuestions = async () => {
    const topicId = attempt.quiz?.topicId
    if (!topicId) {
      router.push(`/quiz/${attempt.quizId}`)
      return
    }

    setRetaking(true)
    try {
      const res = await fetch('/api/quiz/retake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      router.push(`/quiz/${data.quizId}`)
      router.refresh()
    } catch (err: any) {
      alert(err.message || 'Failed to generate new questions')
      setRetaking(false)
    }
  }

  const percentage = Math.round(attempt.percentage)
  let performanceLevel = 'Needs Revision 📚'
  let levelColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20'

  if (percentage >= 90) {
    performanceLevel = 'Excellent 🏆'
    levelColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  } else if (percentage >= 80) {
    performanceLevel = 'Very Good 🌟'
    levelColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  } else if (percentage >= 70) {
    performanceLevel = 'Good 👍'
    levelColor = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
  } else if (percentage >= 60) {
    performanceLevel = 'Needs Practice ⚠️'
    levelColor = 'text-orange-400 bg-orange-500/10 border-orange-500/20'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 sm:px-8 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden w-full sm:w-auto">
          <Link href="/dashboard" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="overflow-hidden">
            <h1 className="text-base sm:text-xl font-bold text-white flex items-center gap-2 truncate">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" /> Quiz Result & Review
            </h1>
            <p className="text-xs text-slate-400 truncate">{attempt.quiz.title}</p>
          </div>
        </div>
        <button
          onClick={handleRetakeWithNewQuestions}
          disabled={retaking}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 shrink-0"
        >
          {retaking ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Retake Quiz (New Questions)
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-6 sm:space-y-8">
        {/* Score Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className={`text-xs px-3 py-1.5 rounded-full border font-semibold inline-block ${levelColor}`}>
              {performanceLevel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Score: {attempt.score} / {attempt.total}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Percentage: <span className="font-bold text-white">{percentage}%</span> • Evaluated by LearnSphere AI
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
            <div className="p-3 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center flex-1 sm:flex-none">
              <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase">Correct</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{attempt.score}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center flex-1 sm:flex-none">
              <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase">Wrong</p>
              <p className="text-xl sm:text-2xl font-black text-red-400 mt-1">{attempt.total - attempt.score}</p>
            </div>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="space-y-6">
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-400" /> Question-by-Question Review
          </h3>

          <div className="space-y-4">
            {attempt.quizAnswers.map((answer: any, index: number) => {
              const question = answer.question
              const isCorrect = answer.isCorrect

              return (
                <div
                  key={answer.id}
                  className={`p-4 sm:p-6 rounded-3xl border ${
                    isCorrect
                      ? 'bg-emerald-950/10 border-emerald-500/30'
                      : 'bg-red-950/10 border-red-500/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <h4 className="font-semibold text-white text-sm sm:text-base leading-snug">{question.questionText}</h4>
                    </div>
                    <div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold shrink-0">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold shrink-0">
                          <XCircle className="w-4 h-4" /> Wrong
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs my-4 p-3.5 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">Your Answer:</span>
                      <span className={`font-semibold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                        {answer.selectedAnswer || 'Unanswered'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 uppercase font-semibold block mb-1">Correct Answer:</span>
                      <span className="font-semibold text-emerald-400">{question.correctAnswer}</span>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed space-y-1">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" /> Explanation & Revision Note:
                    </p>
                    <p>{question.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
