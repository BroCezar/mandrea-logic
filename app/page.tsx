import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="bg-dark-950 min-h-screen selection:bg-brand-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <CTASection />
      <Services />
      <Industries />
      <Process />
      <Testimonials />
      <Footer />
    </main>
  );
}
