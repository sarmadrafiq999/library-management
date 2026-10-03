"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  Upload,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["Fiction", "Technology", "Biography", "Mystery"];

  // Clerk authentication state & modal control
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (cat) => {
    router.push(`/books?cat=${encodeURIComponent(cat)}`);
  };

  // Clerk protected navigation handler
  const handleUploadClick = () => {
    if (isSignedIn) {
      router.push("/upload-book");
    } else {
      // Option A: Open Clerk's modal directly
      openSignIn({ redirectUrl: "/upload-book" });

      // Option B: Redirect to your dedicated Clerk /sign-in page
      // router.push('/sign-in');
    }
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-0 px- sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Lighting Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Next-Gen Digital Library Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-4xl font-black text-white tracking-tight leading-[1.1]">
              Discover, Read & Share <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Your Favorite Books
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore thousands of curated titles, organize your reading
              wishlist, and access a modern digital hub designed for book
              enthusiasts worldwide.
            </p>

            {/* Interactive Search Bar */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form
                onSubmit={handleSearch}
                className="relative flex items-center group"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, author, or keyword..."
                  className="w-full pl-11 pr-32 py-4 text-sm rounded-2xl border border-white/10 bg-slate-900/80 text-white placeholder-slate-500 backdrop-blur-xl shadow-2xl focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
                <Search className="w-5 h-5 text-slate-500 absolute left-4 group-focus-within:text-indigo-400 transition-colors" />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </form>

              {/* Quick Filter Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-4">
                <span className="text-xs text-slate-500 font-medium">
                  Popular:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="px-3 py-1 text-xs font-medium text-slate-400 bg-slate-900/60 hover:text-white hover:bg-slate-800 rounded-xl border border-white/5 hover:border-indigo-500/40 transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/books">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 border border-indigo-400/30 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Browse Books</span>
                </motion.div>
              </Link>

              {/* Protected Upload Title Button via Clerk */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleUploadClick}
                className="px-6 py-3.5 text-sm font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 rounded-2xl border border-white/10 hover:border-white/20 backdrop-blur-xl flex items-center gap-2 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4 text-slate-400" />
                <span>Upload Title</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Hero Graphic Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl p-8 flex flex-col justify-between shadow-2xl shadow-indigo-950/50 group">
              {/* Floating Stat Badge Top Right */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-xl shadow-xl flex items-center gap-3"
              >
                <div className="p-2 rounded-xl bg-indigo-500/20  text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Active Catalog
                  </p>
                  <p className="text-xs font-black text-white">10,000+ Books</p>
                </div>
              </motion.div>

              {/* Center Decorative Hero Graphic */}
              <div className="flex-1 flex flex-col items-center justify-center my-6 space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-2xl shadow-indigo-500/40">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-indigo-400" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    BookVerse Catalog
                  </h3>
                  <p className="text-xs text-slate-400">
                    Curated & Managed in Real-Time
                  </p>
                </div>
              </div>

              {/* Bottom Feature Card */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-white/5 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      Instant Reader Access
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Read & Borrow seamlessly
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg">
                  Free
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
