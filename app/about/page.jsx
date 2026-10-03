'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Active Readers', value: '10,000+' },
    { label: 'Books Cataloged', value: '25,000+' },
    { label: 'Community Borrowers', value: '8,500+' },
    { label: 'Categories Covered', value: '40+' },
  ];

  const features = [
    {
      icon: '📚',
      title: 'Seamless Catalog',
      desc: 'Explore thousands of curated titles across genres with fast category filtering and search capabilities.',
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      desc: 'Empower users to share their own collection and borrow titles directly without subscription barriers.',
    },
    {
      icon: '⚡',
      title: 'Instant Borrowing',
      desc: 'Simple 1-click borrowing system with clear due-date management via personal user dashboard.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Neon Aura Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full space-y-20 relative z-10">

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            About BookVerse
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Building the Next Generation Digital Library
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            BookVerse is a modern, open platform designed to connect book enthusiasts, make knowledge accessible, and simplify personal collection management.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-6 sm:p-8 text-center shadow-xl hover:border-slate-700 transition-all space-y-2"
            >
              <h3 className="text-3xl sm:text-4xl font-black text-indigo-400">{item.value}</h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Core Features */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight">Why Choose BookVerse?</h2>
            <p className="text-xs text-slate-400">Designed for readers, built for community collaboration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-8 shadow-xl space-y-4 text-center sm:text-left hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action Banner */}
        <div className="relative rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 overflow-hidden bg-gradient-to-r from-indigo-900/90 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-2xl">
          {/* Decorative Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready to start reading?</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Browse our full catalog or share your favorite books with thousands of active readers today.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/books"
                className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 rounded-2xl transition-all shadow-xl active:scale-[0.98]"
              >
                Explore Catalog
              </Link>
              <Link
                href="/upload-book"
                className="px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-500/30 rounded-2xl transition-all shadow-xl active:scale-[0.98]"
              >
                Upload a Book
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}