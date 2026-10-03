'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Upload, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-16 sm:py-3 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Background Glows */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/60 border border-white/10 text-xs font-semibold text-indigo-400 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Join BookVerse Today</span>
              </div>
              <h2 className="text-2xl sm:text-2xl font-black text-white tracking-tight">
                Ready to Share Your Shelf?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Join our growing community today. Upload your collection and start borrowing books seamlessly.
              </p>
            </div>

            <Link href="/upload-book" className="shrink-0">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 border border-indigo-400/30 transition-all shadow-xl shadow-indigo-600/25 flex items-center gap-2"
              >
                <Upload className="w-4 h-4 text-white" />
                <span>Upload Your First Book</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}