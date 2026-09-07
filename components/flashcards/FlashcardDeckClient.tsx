'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, RotateCw } from 'lucide-react'

export default function FlashcardDeckClient({ flashcards }: { flashcards: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
        <p className="text-sm text-slate-400 mb-4">No flashcards available yet.</p>
        <a href="/dashboard/upload" className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold inline-block">
          Upload Material & Generate Flashcards
        </a>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handlePrev = () => {
    setIsFlipped(false)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center px-2">
        <span className="text-xs font-semibold text-slate-400">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
        <span className="text-xs font-semibold text-blue-400 truncate max-w-[200px] sm:max-w-xs">
          {currentCard.topic?.title || 'General Deck'}
        </span>
      </div>

      {/* Flashcard Box */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-72 sm:h-80 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between cursor-pointer hover:border-blue-500/40 transition-all relative overflow-hidden group select-none"
      >
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isFlipped ? 'Answer (Back)' : 'Question (Front)'}
          </span>
          <RotateCw className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
        </div>

        <div className="text-center my-auto px-2 sm:px-4">
          <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
        </div>

        <div className="text-center">
          <span className="text-xs text-slate-500 font-medium">Click card anywhere to flip</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 text-sm font-semibold transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        <button
          onClick={handleNext}
          className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
        >
          {currentIndex === flashcards.length - 1 ? 'Start Over' : 'Next Card'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
