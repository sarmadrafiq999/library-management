'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

export default function FeaturedBooks() {
  const books = [
    {
      id: 1,
      title: 'Digital Horizons',
      author: 'Alex Carter',
      category: 'Technology',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop',
      status: 'Available',
    },
    {
      id: 2,
      title: 'Echoes of Autumn',
      author: 'Elena Rostova',
      category: 'Fiction',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
      status: 'Available',
    },
    {
      id: 3,
      title: 'Code Craft',
      author: 'David Vance',
      category: 'Engineering',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
      status: 'Available',
    },
    {
      id: 4,
      title: 'Hidden Path',
      author: 'Sarah Jenkins',
      category: 'Mystery',
      cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop',
      status: 'Available',
    },
  ];

  return (
    <section className="py-16 sm:py-2 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs font-semibold text-indigo-400 mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Handpicked Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Featured Books
            </h2>
          </div>

          <Link href="/books">
            <motion.div
              whileHover={{ x: 4 }}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Explore Full Catalog</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group flex flex-col rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/50 transition-all duration-300 overflow-hidden"
            >
              {/* Book Cover Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                <Image
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-indigo-300 border border-white/10 backdrop-blur-md">
                  {book.category}
                </span>
              </div>

              {/* Book Details */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-indigo-300 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    by <span className="text-slate-300 font-medium">{book.author}</span>
                  </p>
                </div>

                {/* Footer Section of Card */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {book.status}
                  </span>

                  <Link href={`/books/${book.id}`}>
                    <span className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-colors">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Details</span>
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}