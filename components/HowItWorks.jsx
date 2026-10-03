'use client';

import { motion } from 'framer-motion';
import { Search, BookOpen, Share2, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Browse & Search',
      description: 'Find books by category, author, or title easily with our smart search tools.',
      icon: Search,
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      id: '02',
      title: 'Borrow Instantly',
      description: 'Reserve available books in one click and keep track of your active loans.',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: '03',
      title: 'Share Your Shelf',
      description: 'Upload your own collection to share knowledge with the community.',
      icon: Share2,
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="py-16 sm:py-2 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs font-semibold text-indigo-400 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Seamless Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Managing and borrowing books has never been this simple and intuitive.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="relative bg-slate-900/60 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Step Number Background Watermark */}
                <span className="absolute top-4 right-6 text-5xl font-black text-white/5 select-none transition-colors group-hover:text-indigo-500/10">
                  {step.id}
                </span>

                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.gradient} p-0.5 shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}