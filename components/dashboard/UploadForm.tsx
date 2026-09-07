'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2 } from 'lucide-react'

export default function UploadForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [stepMessage, setStepMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setLoading(true)
    setStepMessage('Analyzing study material with AI...')

    try {
      setTimeout(() => {
        setStepMessage('Generating structured AI notes & study guide...')
      }, 1500)

      setTimeout(() => {
        setStepMessage('Creating 30+ MCQs & answer explanations...')
      }, 3000)

      const res = await fetch('/api/topics/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create learning package')
      }

      router.push(`/learn/${data.topicId}`)
      router.refresh()
    } catch (error: any) {
      alert(error.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center animate-pulse">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">LearnSphere AI at Work</h3>
            <p className="text-sm text-indigo-400 mt-2 font-medium px-4">{stepMessage}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Topic / Chapter Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Advanced JavaScript & Asynchronous Programming"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Paste Study Material, Notes, or Chapter Content
            </label>
            <textarea
              required
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your chapter text, lecture notes, or study notes here. LearnSphere AI will automatically parse the content to generate comprehensive notes, 30+ MCQs, flashcards, and tutor context..."
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono leading-relaxed resize-y"
            />
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-300 leading-relaxed">
              <span className="font-semibold text-white">Automatic Learning Pipeline:</span> Upon submission, LearnSphere AI will instantly generate smart revision notes, flashcards, and an interactive quiz with detailed answer explanations.
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all text-sm"
          >
            <Sparkles className="w-5 h-5" /> Generate Learning Package
          </button>
        </form>
      )}
    </div>
  )
}
