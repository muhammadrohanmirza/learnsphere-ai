'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Sparkles, Star, Send, Loader2 } from 'lucide-react'
import upgradeaccount from '@/app/upgradeaccount/page'

export default function PricingFAQSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Feedback Form State
  const [feedbacks, setFeedbacks] = useState<any[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'Computer Science Undergraduate',
      message: 'LearnSphere AI completely changed how I study for my Computer Science exams. Uploading my chapters and instantly getting 30+ MCQs with detailed explanations is a game changer!',
      rating: 5
    },
    {
      id: '2',
      name: 'Sophia Martinez',
      role: 'Medical Student',
      message: 'The AI tutor answers my questions instantly based on my exact uploaded syllabus. The PDF note export feature makes revising on the go so easy.',
      rating: 5
    },
    {
      id: '3',
      name: 'David Kim',
      role: 'Engineering Student',
      message: 'I love the fresh retake questions feature. Every time I retake a quiz, I get brand new questions that test my true understanding rather than memorization.',
      rating: 5
    }
  ])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFeedbacks((prev) => [...data, ...prev])
        }
      })
      .catch((err) => console.error(err))
  }, [])

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !role.trim() || !message.trim()) return

    setSubmitting(true)
    setSuccessMsg('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, message, rating }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      setFeedbacks([data.feedback, ...feedbacks])
      setName('')
      setRole('')
      setMessage('')
      setRating(5)
      setSuccessMsg('Thank you! Your feedback has been published successfully. 🎉')
    } catch (err: any) {
      alert(err.message || 'Failed to submit feedback')
    } finally {
      setSubmitting(false)
    }
  }

  const faqs = [
    {
      q: 'How does LearnSphere AI generate notes and quizzes?',
      a: 'LearnSphere AI uses advanced Google Gemini AI models to analyze your uploaded study materials, PDF notes, or topics. It extracts key concepts, definitions, and structures comprehensive notes along with 30+ multiple-choice questions.'
    },
    {
      q: 'Can I retake quizzes with new questions?',
      a: 'Yes! Whenever you click "Retake Quiz" from your review page, our AI generates a completely fresh set of 30+ questions so you never get repetitive questions.'
    },
    {
      q: 'Can I export my study notes as a PDF?',
      a: 'Absolutely. Every generated study note includes a "Download PDF / Print" button allowing you to save your notes instantly for offline reading.'
    },
    {
      q: 'Is there a free trial available?',
      a: 'Yes, our Free Learner tier lets you explore all core features including material uploads, AI notes, and interactive quizzes without requiring a credit card.'
    }
  ]

  return (
    <>
      {/* Pricing Section */}
      <section id="pricing" className="mt-24 sm:mt-36 space-y-8 sm:space-y-12 px-4 sm:px-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block"
          >
            💎 Flexible Pricing
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white"
          >
            Simple, Transparent Plans for Every Student
          </motion.h2>
          <p className="text-xs sm:text-sm text-slate-400">Choose the plan that fits your study goals. Upgrade or cancel anytime.</p>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex justify-center">
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="hidden sm:inline bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all backdrop-blur-xl"
          >
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Starter</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Free Learner</h3>
                <p className="text-xs text-slate-400 mt-2">Essential AI tools for casual students and quick study sessions.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Up to 5 study topics / month</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Automatic AI Revision Notes</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> 30+ MCQ Quizzes & Review</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> PDF Download Support</li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="/login"
                className="w-full block text-center py-3 rounded-xl border border-slate-700 text-white font-semibold text-sm hover:bg-slate-800 transition-all"
              >
                Get Started Free
              </a>
            </div>
          </motion.div>

          {/* Pro Tier */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-indigo-950/40 to-slate-900/80 border-2 border-indigo-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">Advanced AI</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Pro Student</h3>
                <p className="text-xs text-slate-400 mt-2">Unlimited power for high-achieving students and exam preparation.</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {billingCycle === 'monthly' ? '$12' : '$9'}
                </span>
                <span className="text-xs text-slate-400">/ month {billingCycle === 'yearly' ? '(billed annually)' : ''}</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Unlimited Study Topics & Uploads</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Unlimited Fresh Quiz Retakes</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Interactive AI Flashcards & Decks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> 24/7 Context-Aware AI Tutor</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> Priority AI Model Processing</li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="upgradeaccount"
                className="w-full block text-center py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
              >
                Upgrade to Pro
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="mt-24 sm:mt-36 space-y-8 sm:space-y-12 px-4 sm:px-6">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            💬 Student Success Stories
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Trusted by Thousands of Students Worldwide
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {feedbacks.map((fb, idx) => (
            <motion.div 
              key={fb.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: fb.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{fb.message}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 shrink-0">
                  {fb.name?.[0] || 'S'}
                </div>
                <div className="overflow-hidden">
                  <h5 className="font-bold text-white text-xs truncate">{fb.name}</h5>
                  <p className="text-[10px] text-slate-400 truncate">{fb.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feedback Submission Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mt-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white">Share Your Success Story</h3>
            <p className="text-xs text-slate-400 mt-1">We love hearing how LearnSphere AI helps you master your studies!</p>
          </div>

          {successMsg && (
            <div className="mb-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-xl text-center font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Your Role / Field</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Computer Science Student"
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setRating(num)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      rating >= num ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-600'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                ))}
                <span className="text-xs text-slate-400 ml-2 font-medium">({rating} / 5 Stars)</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Your Feedback / Review</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how LearnSphere AI is helping your learning journey..."
                className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 transition-all text-xs disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Feedback <Send className="w-3.5 h-3.5" /></>}
            </button>
          </form>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mt-24 sm:mt-36 max-w-3xl mx-auto w-full space-y-8 px-4 sm:px-6">
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            ❓ Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-xs sm:text-base hover:text-indigo-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
