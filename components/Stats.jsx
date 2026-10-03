'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Tags } from 'lucide-react';

export default function Stats() {
  const [counts, setCounts] = useState({
    books: '0',
    readers: '0',
    categories: '0',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();

        if (data.success) {
          setCounts({
            books: `${data.stats.books.toLocaleString()}+`,
            readers: `${data.stats.readers.toLocaleString()}+`,
            categories: `${data.stats.categories.toLocaleString()}+`,
          });
        }
      } catch (err) {
        console.error('Failed to load dynamic stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const stats = [
    {
      id: 1,
      name: 'Books Available',
      value: loading ? '...' : counts.books,
      icon: BookOpen,
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      id: 2,
      name: 'Active Readers',
      value: loading ? '...' : counts.readers,
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      name: 'Curated Categories',
      value: loading ? '...' : counts.categories,
      icon: Tags,
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="py-1 px-1 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="pt-6 md:pt-0 md:px-8 first:pt-0 first:px-0 flex items-center justify-center md:justify-start gap-5 group"
                >
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${stat.gradient} p-0.5 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <div className="bg-slate-950 p-3 rounded-[14px] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div>
                    <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-400 mt-0.5">
                      {stat.name}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}