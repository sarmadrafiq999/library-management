'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BookDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise);

  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false);

  // Mock book detail data
  const book = {
    id: params.id || '1',
    title: 'Digital Horizons: Embracing the Future of Technology',
    author: 'Alex Carter',
    category: 'Technology',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
    status: isBorrowed ? 'Borrowed' : 'Available',
    uploadedBy: 'Ali Raza',
    publishedYear: '2024',
    pages: '320',
    language: 'English',
    description:
      'Digital Horizons explores the transformative impact of artificial intelligence, cloud computing, and modern web architectures on daily life. Written with depth and clarity, this book provides an engaging look into how software engineering is shaping our future.',
  };

  const handleBorrowConfirm = () => {
    setIsBorrowed(true);
    setIsBorrowModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        {/* Navigation Link */}
        <div className="mb-6">
          <Link
            href="/books"
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            ← Back to Catalog
          </Link>
        </div>

        {/* Main Details Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Media & Actions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                      book.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        book.status === 'Available' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />
                    {book.status}
                  </span>
                </div>

                <button
                  onClick={() => setIsBorrowModalOpen(true)}
                  disabled={book.status !== 'Available'}
                  className={`w-full py-3.5 px-6 rounded-xl text-sm font-semibold transition-all shadow-md ${
                    book.status === 'Available'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {book.status === 'Available' ? 'Borrow This Book' : 'Currently Unavailable'}
                </button>
              </div>
            </div>

            {/* Right Column: Book Details */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-3">
                  {book.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {book.title}
                </h1>
                <p className="text-base text-slate-600 mt-2">
                  Written by <strong className="text-slate-800">{book.author}</strong>
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 text-center">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Pages</p>
                  <p className="text-base font-bold text-slate-800 mt-1">{book.pages}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Language</p>
                  <p className="text-base font-bold text-slate-800 mt-1">{book.language}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Published</p>
                  <p className="text-base font-bold text-slate-800 mt-1">{book.publishedYear}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Description
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Uploader Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Uploaded by: <strong className="text-slate-900">{book.uploadedBy}</strong></span>
                <span className="text-indigo-600 font-medium">Verified Contributor</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isBorrowModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="text-3xl">📖</div>
            <h3 className="text-lg font-bold text-slate-900">Confirm Borrow Request</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to borrow <strong className="text-slate-900">{book.title}</strong>?
              This book will be added to your personal borrowed list for 14 days.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleBorrowConfirm}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
              >
                Confirm & Borrow
              </button>
              <button
                onClick={() => setIsBorrowModalOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}