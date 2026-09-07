'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Brain, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function QuizClient({ quiz }: { quiz: any }) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const questions = quiz.questions
  const currentQuestion = questions[currentIndex]

  const handleSelectOption = (option: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option,
    })
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz.id,
          answers: selectedAnswers,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to submit quiz')

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      router.push(`/quiz/review/${data.attemptId}`)
    } catch (error: any) {
      alert(error.message || 'Submission error')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 bg-slate-900/30 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between">
        <div className="overflow-hidden mr-2">
          <h1 className="text-base sm:text-xl font-bold text-white flex items-center gap-2 truncate">
            <Brain className="w-5 h-5 text-purple-400 shrink-0" /> {quiz.title}
          </h1>
          <p className="text-xs text-slate-400 truncate">Total Questions: {questions.length} (30+ MCQs)</p>
        </div>
        <div className="shrink-0">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </header>

      {/* Quiz Body */}
      <main className="flex-1 p-4 sm:p-8 max-w-3xl w-full mx-auto flex flex-col justify-center">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full mb-6 sm:mb-8 overflow-hidden">
            <div
              className="bg-purple-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="mb-6 sm:mb-8">
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-400 mb-2 block">
              {currentQuestion.concept || 'General Concept'}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQuestion.questionText}
            </h2>
          </div>

          <div className="space-y-3 mb-6 sm:mb-8">
            {currentQuestion.options.map((option: string, idx: number) => {
              const isSelected = selectedAnswers[currentQuestion.id] === option
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-600/10'
                      : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="pr-2">{option}</span>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-purple-500 bg-purple-600 text-white' : 'border-slate-700'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-800 gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="flex-1 sm:flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? 'Evaluating...' : 'Submit Quiz'} <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
