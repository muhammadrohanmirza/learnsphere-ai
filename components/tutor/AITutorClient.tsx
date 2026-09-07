'use client'

import { useState } from 'react'
import { Send, Brain, User, Sparkles, Loader2 } from 'lucide-react'

export default function AITutorClient({ topics, initialTopic }: { topics: any[]; initialTopic: any }) {
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopic?.id || topics[0]?.id || '')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: initialTopic 
        ? `Hello! I am your AI Tutor. I see you're studying "${initialTopic.title}". Feel free to ask any questions about this material!`
        : 'Hello! I am your LearnSphere AI Tutor. Select a topic above or ask me any question about your studies!',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const activeTopic = topics.find((t) => t.id === selectedTopicId)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage,
          contextContent: activeTopic?.content || 'General student learning context',
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to get tutor response')

      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }])
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again!' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900/60 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden h-[calc(100vh-140px)] sm:h-[650px]">
      {/* Topic selector bar */}
      <div className="p-3 sm:p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 shrink-0">Context:</span>
          <select
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
            className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate max-w-[280px]"
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
        <span className="text-xs text-indigo-400 flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5" /> AI Ready
        </span>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-purple-600/20 border border-purple-500/30 text-purple-400'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Brain className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>
            <div
              className={`max-w-[85%] sm:max-w-xl p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-400 text-xs sm:text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" /> Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-3 sm:p-4 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 sm:gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI tutor anything about this topic..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 sm:px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm shrink-0"
        >
          <span>Send</span> <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </form>
    </div>
  )
}
