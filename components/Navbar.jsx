'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Menu, X, ArrowRight, LogIn } from 'lucide-react';
import { Show, UserButton, useClerk, useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const navLinks = [
    { name: 'Home', href: '/', requiresAuth: false },
    { name: 'Catalog', href: '/books', requiresAuth: false },
    { name: 'Dashboard', href: '/dashboard', requiresAuth: true },
    { name: 'Upload Book', href: '/upload-book', requiresAuth: true },
    { name: 'About', href: '/about', requiresAuth: false },
    { name: 'Contact', href: '/contact', requiresAuth: false },
  ];

  // Protect link clicks for logged-out users
  const handleNavClick = (e, link) => {
    if (link.requiresAuth && !isSignedIn) {
      e.preventDefault();
      openSignIn();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-7xl mx-auto rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 4 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all"
            >
              <BookOpen className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                BookVerse
              </span>
              <span className="text-[9px] font-bold tracking-widest text-indigo-400 uppercase -mt-1">
                Digital Library
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors text-slate-300 hover:text-white focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md shadow-indigo-500/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Authentication Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                if (!isSignedIn) {
                  openSignIn();
                } else {
                  window.location.href = '/upload-book';
                }
              }}
              className="hidden sm:inline-flex focus:outline-none cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 transition-all shadow-lg shadow-indigo-600/25 border border-indigo-400/30 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Publish Title</span>
              </motion.div>
            </button>

            {/* When user is signed in */}
            <Show when="signed-in">
              <UserButton />
            </Show>

            {/* When user is signed out */}
            <Show when="signed-out">
              <button
                onClick={() => openSignIn()}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sign In</span>
              </button>
            </Show>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-white/10 focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl bg-slate-900/90 border border-white/10 p-4 shadow-2xl backdrop-blur-2xl space-y-2 overflow-hidden"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}