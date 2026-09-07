"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Bell, GraduationCap, Sparkles } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Icon */}
       
        <div className="mx-auto mb-8 flex h-20 items-center justify-center shadow-2xl">
          {/* <Sparkles className="w-10 h-10 text-cyan-400" /> */}
           <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">
            LearnSphere <span className="text-indigo-400">AI</span>
          </span>
        </Link>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium mb-6">
          <Bell className="w-4 h-4" />
          Premium Features Coming Soon
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Coming{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Soon
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
          Our premium upgrade system is currently under development.
          Soon you will be able to unlock powerful AI learning features,
          advanced quizzes, detailed analytics, and much more.
        </p>

        {/* Feature Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-semibold">Advanced AI</h3>
            <p className="text-sm text-slate-500 mt-1">
              Smarter learning
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-sm text-slate-500 mt-1">
              Track your progress
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-semibold">Premium Tools</h3>
            <p className="text-sm text-slate-500 mt-1">
              More powerful features
            </p>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Footer */}
        <p className="mt-8 text-sm text-slate-600">
          © 2026 LearnSphere AI. More exciting features are on the way.
        </p>
      </div>
    </main>
  );
}