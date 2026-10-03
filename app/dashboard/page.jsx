'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadFilter, setUploadFilter] = useState('All');
  const [data, setData] = useState({
    stats: { totalBorrowed: 0, totalUploaded: 0 },
    activeBorrows: [],
    myUploadedBooks: [],
  });
  const [actionLoading, setActionLoading] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const result = await res.json();
      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleReturn = async (bookId) => {
    setActionLoading(bookId);
    try {
      const res = await fetch('/api/books/borrow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, action: 'return' }),
      });
      const result = await res.json();
      if (result.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Helper to check due date urgency
  const getDueDateStatus = (dueDateStr) => {
    const due = new Date(dueDateStr);
    const now = new Date();
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Overdue', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
    if (diffDays <= 2) return { label: `Due in ${diffDays}d`, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { label: `Due ${due.toLocaleDateString()}`, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' };
  };

  // Filtered lists
  const filteredBorrows = useMemo(() => {
    return data.activeBorrows.filter(
      (item) =>
        item.book?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.book?.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data.activeBorrows, searchQuery]);

  const filteredUploads = useMemo(() => {
    return data.myUploadedBooks.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        uploadFilter === 'All' || book.status === uploadFilter;
      return matchesSearch && matchesFilter;
    });
  }, [data.myUploadedBooks, searchQuery, uploadFilter]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800/80">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Live Reader Portal
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              My Activity Hub
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Monitor active book rentals, track return dates, and manage community contributions.
            </p>
          </div>

          {/* Quick Filter Search Bar */}
          <div className="relative w-full md:w-80">
            <svg
              className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, author, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all backdrop-blur-md"
            />
          </div>
        </div>

        {/* Analytics Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* Borrowed Stat Card */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Active Borrowed
              </span>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                📚
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-indigo-400">
                {data.stats.totalBorrowed}{' '}
                <span className="text-sm font-semibold text-slate-400">/ 5 Max</span>
              </h2>
              {/* Borrow Capacity Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((data.stats.totalBorrowed / 5) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Uploaded Stat Card */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-300">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Community Uploads
              </span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                📤
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-emerald-400">
                {data.stats.totalUploaded}{' '}
                <span className="text-sm font-semibold text-slate-400">Books Shared</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-2">Active contributor level: Community Hero</p>
            </div>
          </div>
        </div>

        {/* Skeleton Loaders */}
        {loading ? (
          <div className="space-y-12 animate-pulse">
            <div className="space-y-4">
              <div className="h-6 w-48 bg-slate-900 rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2].map((n) => (
                  <div key={n} className="h-32 bg-slate-900/80 rounded-3xl border border-slate-800/80" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-48 bg-slate-900 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-24 bg-slate-900/80 rounded-3xl border border-slate-800/80" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-14">

            {/* Active Borrows Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Active Borrows</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                    {filteredBorrows.length}
                  </span>
                </h2>
              </div>

              {filteredBorrows.length === 0 ? (
                <div className="bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 p-12 text-center text-slate-400 space-y-3">
                  <p className="text-sm">You have no active borrowed books.</p>
                  <a
                    href="/books"
                    className="inline-block text-xs font-bold text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Browse Available Library Catalog →
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredBorrows.map((record) => {
                    const status = getDueDateStatus(record.dueDate);
                    return (
                      <div
                        key={record._id}
                        className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-5 shadow-xl flex items-center gap-5 hover:border-slate-700 transition-all group"
                      >
                        <div className="relative overflow-hidden rounded-2xl flex-shrink-0">
                          <img
                            src={
                              record.book?.cover ||
                              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop'
                            }
                            alt={record.book?.title}
                            className="w-20 h-24 object-cover bg-slate-950 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-grow min-w-0 space-y-2">
                          <div>
                            <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-indigo-400 transition-colors">
                              {record.book?.title || 'Unknown Title'}
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-1">
                              {record.book?.author || 'Unknown Author'}
                            </p>
                          </div>

                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-semibold ${status.color}`}>
                            <span>{status.label}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleReturn(record.book?._id)}
                          disabled={actionLoading === record.book?._id}
                          className="px-4 py-3 rounded-2xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/20 flex-shrink-0 flex items-center gap-2"
                        >
                          {actionLoading === record.book?._id ? (
                            <>
                              <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              <span>Returning</span>
                            </>
                          ) : (
                            <span>Return</span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* My Contributions Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>My Contributions</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                    {filteredUploads.length}
                  </span>
                </h2>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 self-start sm:self-auto">
                  {['All', 'Available', 'Borrowed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setUploadFilter(tab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        uploadFilter === tab
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {filteredUploads.length === 0 ? (
                <div className="bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 p-12 text-center text-slate-400 space-y-3">
                  <p className="text-sm">No books found matching this filter.</p>
                  <a
                    href="/upload"
                    className="inline-block text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
                  >
                    + Upload a New Book to the Library
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredUploads.map((book) => (
                    <div
                      key={book._id}
                      className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800/80 p-4 shadow-xl flex items-center justify-between hover:border-slate-700 transition-all gap-4 group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={
                            book.cover ||
                            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop'
                          }
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-xl bg-slate-950 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="min-w-0 space-y-1">
                          <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-emerald-400 transition-colors">
                            {book.title}
                          </h4>
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
                            {book.category}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full flex-shrink-0 border ${
                          book.status === 'Available'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}