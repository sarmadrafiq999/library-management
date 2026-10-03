import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedBooks from '@/components/FeaturedBooks';
import HowItWorks from '@/components/HowItWorks';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Global Background Glow Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/10 blur-3xl pointer-events-none -z-10" />

      {/* Page Sections */}
      <Navbar />
      <div className="space-y-12 sm:space-y-20">
        <Hero />
        <Stats />
        <FeaturedBooks />
        <HowItWorks />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}