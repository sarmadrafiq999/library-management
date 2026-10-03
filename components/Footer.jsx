'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Mail, Heart, Sparkles, Code, Globe } from 'lucide-react';

// Custom SVG Brand Icons to avoid lucide-react brand export issues
const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-10 pt-10 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto rounded-3xl glass-card border border-white/10 p-8 sm:p-12 relative z-10 shadow-2xl backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30"
              >
                <BookOpen className="w-5 h-5" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
                  BookVerse
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-indigo-400 uppercase -mt-1">
                  Digital Library
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400">
              A futuristic digital sanctuary designed to discover, track, and manage your literary universe with seamless precision.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Code, href: "#" },
                { icon: TwitterIcon, href: "#" },
                { icon: LinkedinIcon, href: "#" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 border border-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-center"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Navigation</span>
            </p>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {[
                { name: 'Home', href: '/' },
                { name: 'Browse Catalog', href: '/books' },
                { name: 'Personal Dashboard', href: '/dashboard' },
                { name: 'Upload New Title', href: '/upload-book' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-indigo-300 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated Categories */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Categories</span>
            </p>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {[
                { name: 'Fiction & Novels', href: '/books?cat=Fiction' },
                { name: 'Tech & Engineering', href: '/books?cat=Technology' },
                { name: 'Science & Cosmos', href: '/books?cat=Science' },
                { name: 'Biography & History', href: '/books?cat=Biography' },
              ].map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="hover:text-purple-300 hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Contact Box */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-pink-400" />
              <span>Support</span>
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions, feedback, or title requests? Connect with our curating team.
            </p>
            <Link href="/contact" className="inline-block pt-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700/80 border border-white/10 hover:border-indigo-500/40 transition-all flex items-center gap-2 shadow-inner"
              >
                <span>Get In Touch</span>
                <span className="text-indigo-400">→</span>
              </motion.div>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} BookVerse Platform. Engineered with precision.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            <span>for book lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}