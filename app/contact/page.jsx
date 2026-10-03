'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessBanner(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setShowSuccessBanner(false), 5000);
    }, 1000);
  };

  const faqs = [
    {
      q: 'How long can I borrow a book?',
      a: 'The standard borrowing period is 14 days. You can request an extension directly from your dashboard if no other user has reserved the title.',
    },
    {
      q: 'Is there any fee for borrowing books?',
      a: 'No, BookVerse is a 100% free community platform designed for sharing and reading books effortlessly.',
    },
    {
      q: 'How do I list my own book?',
      a: 'Simply head over to the "Upload Book" page, fill in the details along with a cover image, and publish it to the community.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-900/5 selection:bg-indigo-500 selection:text-white flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">

        {/* Header with Subtle Badge */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            Support & Help Desk
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Have questions, feedback, or need help? Send us a message and our team will get back to you shortly.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50">
            {showSuccessBanner && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center gap-3.5 text-emerald-800 text-sm animate-in fade-in zoom-in-95">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Message Delivered!</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Your Name <span className="text-indigo-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address <span className="text-indigo-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Subject <span className="text-indigo-600">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder="Inquiry about borrowing limits"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Message <span className="text-indigo-600">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all bg-slate-50/50 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Right Info Section */}
          <div className="lg:col-span-5 space-y-6">

            {/* Dark Styled Direct Contact Card */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-2xl group-hover:bg-indigo-600/30 transition-all" />
              <h3 className="text-xl font-bold tracking-tight">Need Immediate Assistance?</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Reach out directly to our library support desk for urgent queries regarding book availability or account issues.
              </p>

              <div className="mt-6 space-y-4 text-xs font-medium border-t border-slate-800 pt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2.5 bg-slate-800 rounded-xl text-indigo-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href="mailto:support@bookverse.com" className="hover:text-white transition-colors">
                    support@bookverse.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2.5 bg-slate-800 rounded-xl text-indigo-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Library HQ, Main Campus Road</span>
                </div>
              </div>
            </div>

            {/* Accordion FAQs */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3 pt-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-600' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}