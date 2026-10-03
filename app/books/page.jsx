'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Loader2, Sparkles, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { useAuth, useClerk } from '@clerk/nextjs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [actionLoading, setActionLoading] = useState(null);

  // Clerk Authentication hooks
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  // Fetch books from MongoDB via API
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/books?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`
      );
      const data = await res.json();
      if (data.success) {
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  // Handle Borrow / Return Action with Login Protection
  const handleBorrowToggle = async (bookId, currentStatus) => {
    // If user is NOT signed in, trigger Clerk sign-in modal
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    setActionLoading(bookId);
    const action = currentStatus === 'Available' ? 'borrow' : 'return';

    try {
      const res = await fetch('/api/books/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, action }),
      });

      const data = await res.json();

      if (data.success) {
        fetchBooks();
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server');
    } finally {
      setActionLoading(null);
    }
  };

  const categories = ['All', 'Technology', 'Fiction', 'Biography', 'Mystery', 'Science'];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MongoDB Powered Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Library Catalog
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Search and borrow available books in real time
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all backdrop-blur-xl"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                  : 'bg-slate-900/60 text-slate-400 border border-white/10 hover:border-white/20 hover:text-white backdrop-blur-md'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="h-[400px] rounded-3xl bg-slate-900/40 border border-white/5 animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="h-52 bg-slate-800/50 rounded-2xl w-full" />
                <div className="space-y-3 mt-4">
                  <div className="h-3 bg-slate-800/50 rounded w-1/4" />
                  <div className="h-5 bg-slate-800/50 rounded w-3/4" />
                  <div className="h-3 bg-slate-800/50 rounded w-1/2" />
                </div>
                <div className="h-10 bg-slate-800/50 rounded-xl mt-4 w-full" />
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 rounded-3xl border border-white/10 p-12 text-center max-w-md mx-auto my-12 backdrop-blur-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No books found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Try changing your search terms or selecting a different category filter.
            </p>
          </motion.div>
        ) : (
          /* Book Cards Grid */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {books.map((book) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={book._id}
                  className="bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-xl backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Book Cover Image */}
                  <div className="relative h-56 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={
                        book.cover ||
                        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop'
                      }
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    <span
                      className={`absolute top-3 right-3 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md border ${
                        book.status === 'Available'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-indigo-300 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">by {book.author}</p>

                    <p className="text-xs text-slate-400/80 mt-3 line-clamp-2 flex-grow leading-relaxed">
                      {book.description || 'No description provided.'}
                    </p>

                    {/* Borrow / Return Action Button */}
                    <button
                      onClick={() => handleBorrowToggle(book._id, book.status)}
                      disabled={actionLoading === book._id}
                      className={`mt-5 w-full py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                        book.status === 'Available'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/20'
                          : 'bg-amber-600/80 hover:bg-amber-600 shadow-md shadow-amber-600/20'
                      }`}
                    >
                      {actionLoading === book._id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Processing...</span>
                        </>
                      ) : book.status === 'Available' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-white" />
                          <span>Borrow Book</span>
                        </>
                      ) : (
                        <>
                          <RotateCcw className="w-4 h-4 text-white" />
                          <span>Return Book</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}