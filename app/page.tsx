'use client';

import React, { useState, useEffect } from 'react';

/* --- Icons --- */
const Icons = {
  Chip: () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  Network: () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  Analytics: () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  Lock: () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  Menu: () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  Close: () => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

/* --- Navigation Component --- */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 1. AGGRESSIVE SCROLL TO TOP FIX
    // This disables the browser's memory of where you were
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // 2. Remove any #hash from the URL (like #services) so it doesn't jump
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 3. Force scroll to 0 immediately, and again after a tiny delay to ensure it overrides everything
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    // Handle Navbar Background
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isMobileMenuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Expertise', href: '#services' },
    { name: 'Sectors', href: '#industries' },
    { name: 'Methodology', href: '#process' },
    { name: 'Impact', href: '#testimonials' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* LOGO - Click to go HOME */}
            <a href="#" onClick={scrollToTop} className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 bg-brand-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all">
                <span className="text-dark-950 font-bold -rotate-45 text-sm">M</span>
              </div>
              <span className="text-xl font-bold tracking-widest text-white uppercase group-hover:text-brand-100 transition-colors">
                Mandrea<span className="text-brand-500">Logic</span>
              </span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white relative z-50"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-dark-950/95 backdrop-blur-xl md:hidden flex items-center justify-center animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-center space-y-8 p-8 text-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-light text-white tracking-widest uppercase hover:text-brand-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/* --- Hero Section --- */
const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === text.length) clearInterval(interval);
      }, 75); // Faster typing speed
      
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-dark-950">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block mb-8 px-4 py-1.5 border border-brand-500/30 rounded-full bg-brand-500/5 backdrop-blur-sm animate-slide-up">
          <span className="text-brand-400 text-xs font-bold tracking-[0.2em] uppercase">System Architecture & Intelligence</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-none min-h-[1.2em] md:min-h-[3em]">
          <div className="block">
            <TypewriterText text="LOGIC." delay={0} />
          </div>
          
          <div className="block">
            <TypewriterText text="SCALE." delay={600} />
          </div>
          
          <span className="inline-block pb-1 text-[#22d3ee] md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-[#22d3ee] md:to-[#818cf8]">
             <TypewriterText text="AUTOMATION." delay={1200} />
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light animate-fade-in" style={{ animationDelay: '2s', opacity: 0, animationFillMode: 'forwards' }}>
          Mandrea Logic engineers the neural architecture for next-generation enterprises. 
          We deploy autonomous agents, secure intelligence layers, and predictive workflows.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in" style={{ animationDelay: '2.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <a href="#services" className="px-8 py-4 text-lg font-bold text-cyan-100 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
            View Capabilities
          </a>
          <a href="#process" className="px-8 py-4 text-lg font-medium text-gray-300 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
            Our Methodology
          </a>
        </div>
      </div>
    </section>
  );
};

/* --- Services Section --- */
const Services = () => {
  const services = [
    {
      title: "Autonomous Agents",
      desc: "Deploy self-governing AI agents capable of executing complex multi-step workflows without human intervention.",
      icon: <Icons.Chip />
    },
    {
      title: "Workflow Orchestration",
      desc: "End-to-end automation of legacy processes using intelligent routing and decision-making logic.",
      icon: <Icons.Network />
    },
    {
      title: "Predictive Intelligence",
      desc: "Turn data lakes into foresight. Custom models that predict market shifts, supply chain risks, and customer behavior.",
      icon: <Icons.Analytics />
    },
    {
      title: "Sovereign AI Infrastructure",
      desc: "On-premise and private cloud deployment of LLMs ensuring total data privacy and regulatory compliance.",
      icon: <Icons.Lock />
    }
  ];

  return (
    <section id="services" className="py-32 bg-dark-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Core Competencies</h2>
            <p className="text-slate-400 max-w-md">Engineering solutions for the automated economy.</p>
          </div>
          <div className="h-px w-full md:w-1/3 bg-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((s, i) => (
            <div key={i} className="group p-8 border border-slate-800 bg-dark-900/50 hover:border-brand-500/50 hover:bg-dark-900 transition-all duration-500">
              <div className="w-12 h-12 text-brand-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Industries Section --- */
const Industries = () => {
  const sectors = [
    { name: "Fintech", detail: "Fraud detection & Algorithmic auditing" },
    { name: "Healthcare", detail: "Patient triage & Data synthesis" },
    { name: "Manufacturing", detail: "Predictive maintenance & Supply chain" },
    { name: "Legal", detail: "Contract discovery & Risk analysis" },
    { name: "E-Commerce", detail: "Dynamic pricing & Inventory logic" }
  ];

  return (
    <section id="industries" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-sm font-bold text-brand-500 uppercase tracking-widest mb-12">Applied Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <div key={i} className="p-6 border-l-2 border-slate-700 hover:border-brand-400 bg-dark-950 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">{sector.name}</h3>
              <p className="text-sm text-slate-500">{sector.detail}</p>
            </div>
          ))}
          <div className="p-6 border-l-2 border-slate-800 flex items-center justify-center">
            <span className="text-slate-500 italic">and more...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- Process Section --- */
const Process = () => {
  return (
    <section id="process" className="py-32 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold text-white">The Engineering Cycle</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {[
            { step: "01", title: "Discovery", text: "We analyze your data infrastructure and identify high-value automation targets." },
            { step: "02", title: "Architecture", text: "We design secure, scalable AI agents tailored to your specific operational logic." },
            { step: "03", title: "Deployment", text: "Rigorous testing, secure implementation, and continuous model optimization." }
          ].map((p, i) => (
            <div key={i} className="relative group">
              {/* Number is now a Block element (not absolute) so it pushes text down */}
              <div className="text-7xl md:text-8xl font-bold text-slate-800/40 mb-[-20px] md:mb-[-30px] z-0 select-none group-hover:text-brand-900/40 transition-colors duration-500">
                {p.step}
              </div>
              <div className="relative z-10 pl-4">
                <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-brand-500 pl-4">{p.title}</h3>
                <p className="text-slate-400">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Testimonials --- */
const Testimonials = () => {
  const reviews = [
    { q: "Mandrea Logic transformed our manual auditing process into a fully autonomous workflow. The accuracy is unmatched.", a: "Director of Ops, FinServe Global" },
    { q: "We needed a private LLM solution that didn't expose data. Their engineering team delivered a flawless on-premise architecture.", a: "CTO, MedData Systems" },
    { q: "The predictive models they built for our supply chain saved us millions in Q4 alone. Pure ROI.", a: "VP Logistics, EuroTrans" }
  ];

  return (
    <section id="testimonials" className="py-24 bg-dark-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">Client Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-dark-950 p-8 shadow-lg border border-slate-800/50">
              <p className="text-slate-300 italic mb-6">"{r.q}"</p>
              <div className="text-sm font-bold text-brand-500 uppercase tracking-wide">{r.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- Footer --- */
const Footer = () => (
  <footer className="bg-dark-950 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col items-center md:items-start">
        <span className="text-xl font-bold text-white tracking-widest uppercase mb-2">Mandrea<span className="text-brand-500">Logic</span></span>
        <span className="text-xs text-slate-500 font-medium tracking-wider">ROME • LONDON • BUCHAREST</span>
      </div>
      
      <div className="flex gap-8 text-sm text-slate-500">
        <span className="cursor-not-allowed hover:text-slate-400">Privacy Policy</span>
        <span className="cursor-not-allowed hover:text-slate-400">Terms of Service</span>
        <span className="cursor-not-allowed hover:text-slate-400">Client Portal (Locked)</span>
      </div>

      <div className="text-xs text-slate-700">
        &copy; {new Date().getFullYear()} Mandrea Logic Systems. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="bg-dark-950 min-h-screen selection:bg-brand-500/30 selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Industries />
      <Process />
      <Testimonials />
      <Footer />
    </main>
  );
}