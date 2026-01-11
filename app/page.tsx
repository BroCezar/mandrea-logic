'use client';

import React, { useState, useEffect } from 'react';

/* --- 1. REPLICATED CLOCK COMPONENT (High-Fidelity Version) --- */
const HulyClock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-full bg-[#0B0C0F] border border-white/10 shadow-2xl">
      
      {/* 1. OUTER BLOOM TRAIL (Conic Gradient) */}
      <div 
        className="absolute inset-0 rounded-full opacity-60 blur-2xl"
        style={{
          background: `conic-gradient(from ${secDeg - 90}deg, transparent 0%, transparent 80%, #a5f3fc 95%, #ffffff 100%)`,
          transform: 'scale(0.95)'
        }}
      ></div>

      {/* 2. CLOCK FACE CONTAINER */}
      <div className="relative w-[96%] h-[96%] bg-[#0f1014] rounded-full flex items-center justify-center overflow-hidden border border-white/5 z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
        
        {/* Depth Layer: Warm Glow Overlay (Huly Style) */}
        <div className="absolute inset-0 z-0 opacity-40"
             style={{ background: 'radial-gradient(circle at center, rgba(255, 150, 50, 0.15) 0%, transparent 60%)' }}>
        </div>

        {/* Texture: Dot Grid */}
        <div className="absolute inset-0 opacity-20 z-0" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}>
        </div>

        {/* 3. THE HANDS (With Z-Index & Shadows) */}

        {/* Hour Hand - Bottom Layer */}
        <div 
           className="absolute w-1.5 h-20 bg-gradient-to-t from-slate-600 to-slate-300 rounded-full z-20 origin-bottom"
           style={{ 
             transform: `rotate(${hourDeg}deg) translateY(-50%)`,
             boxShadow: '0 0 4px rgba(0,0,0,0.8)' // Subtle shadow
           }}
        ></div>

        {/* Minute Hand - Middle Layer */}
        <div 
           className="absolute w-1 h-32 bg-gradient-to-t from-slate-500 to-white rounded-full z-30 origin-bottom"
           style={{ 
             transform: `rotate(${minDeg}deg) translateY(-50%)`,
             boxShadow: '0 4px 10px rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.2)' // Lifted shadow + Glow
           }}
        ></div>

        {/* Second Hand - Top Layer (High Contrast) */}
        <div 
           className="absolute w-[2px] h-36 bg-orange-500 z-40 origin-bottom"
           style={{ 
             transform: `rotate(${secDeg}deg) translateY(-30%)`,
             boxShadow: '0 0 12px rgba(255, 100, 0, 0.6)' // Strong orange glow
           }}
        >
             {/* Glowing Tip */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_white]"></div>
        </div>

        {/* 4. CENTER CAP (Pivot Point) */}
        <div className="absolute w-4 h-4 rounded-full z-50 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
             <div className="w-1.5 h-1.5 bg-black rounded-full opacity-50"></div>
        </div>

      </div>
    </div>
  );
};

/* --- 2. ICONS & ASSETS --- */
const Icons = {
  Slack: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
       <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.522 2.521 2.527 2.527 0 0 1-2.522-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.522 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.522 2.52A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.522-2.522v-2.522h2.522zM15.165 17.688a2.527 2.527 0 0 1-2.522-2.522 2.527 2.527 0 0 1 2.522-2.522h6.312A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.312z"/>
    </svg>
  ),
  Chip: () => (<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /></svg>),
  Network: () => (<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>),
  Analytics: () => (<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>),
  Lock: () => (<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>),
  Menu: () => (<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>),
  Close: () => (<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>)
};

/* --- 3. NAVIGATION --- */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (window.location.hash) window.history.replaceState(null, '', window.location.pathname);
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 50);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            <a href="#" onClick={scrollToTop} className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 bg-brand-500 rounded-sm rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all">
                <span className="text-dark-950 font-bold -rotate-45 text-sm">M</span>
              </div>
              <span className="text-xl font-bold tracking-widest text-white uppercase group-hover:text-brand-100 transition-colors">
                Mandrea<span className="text-brand-500">Logic</span>
              </span>
            </a>
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide uppercase">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white relative z-50" aria-label="Menu">
                {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark-950/95 backdrop-blur-xl md:hidden flex items-center justify-center animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="flex flex-col items-center space-y-8 p-8 text-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-light text-white tracking-widest uppercase hover:text-brand-400 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/* --- 4. HERO SECTION --- */
const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let currentIndex = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === text.length) clearInterval(interval);
      }, 75);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);
  return <span>{displayedText}</span>;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
          <div className="block"><TypewriterText text="LOGIC." delay={0} /></div>
          <div className="block"><TypewriterText text="SCALE." delay={600} /></div>
          <span className="inline-block pb-1 text-[#22d3ee] md:text-transparent md:bg-clip-text md:bg-gradient-to-r md:from-[#22d3ee] md:to-[#818cf8]">
             <TypewriterText text="AUTOMATION." delay={1200} />
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light animate-fade-in" style={{ animationDelay: '2s', opacity: 0, animationFillMode: 'forwards' }}>
          Mandrea Logic engineers the neural architecture for next-generation enterprises. We deploy autonomous agents, secure intelligence layers, and predictive workflows.
        </p>
      </div>
    </section>
  );
};

/* --- 5. CTA SECTION (Updated with Pro Clock) --- */
const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0f1014] pb-[190px] pt-[77px] md:pb-[251px] md:pt-[109px] lg:pb-[294px] lg:pt-[152px]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-0 relative">
        
        {/* Left Side: Clock */}
        <div className="relative w-full h-[403px] flex items-center justify-center md:justify-start pointer-events-none -mt-10 md:-mt-0">
           <div className="w-[280px] h-[280px] md:w-[332px] md:h-[332px] lg:w-[403px] lg:h-[403px] relative md:-left-4 lg:left-20">
              <HulyClock />
           </div>
        </div>

        {/* Right Side: Text & Buttons */}
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-20">
          
          <h2 className="max-w-[510px] bg-gradient-to-br from-white from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text font-sans text-4xl md:text-6xl lg:text-[80px] font-medium leading-[1.1] tracking-tight text-transparent mb-6">
            Join the Movement
          </h2>

          <p className="relative z-10 mb-8 md:mb-10 text-lg md:text-xl leading-snug tracking-tight text-gray-300 max-w-md">
            Unlock the future of productivity with Mandrea Logic.<br />
            Remember, this journey is just getting started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            
            {/* Primary Button */}
            <a href="#contact" className="group relative inline-flex items-center justify-center w-[180px] h-12 rounded-full overflow-hidden transition-all duration-200">
               <div className="absolute inset-0 bg-[#d1d1d1] border border-white/60 rounded-full z-10 group-hover:bg-white transition-colors"></div>
               <div className="absolute inset-0 z-0 opacity-100 group-hover:opacity-80 transition-opacity">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200%] bg-[radial-gradient(circle_at_center,#FFFFF5_0%,#FFAA81_25%,rgba(210,106,58,0)_70%)] blur-md"></div>
               </div>
               <span className="relative z-20 text-[#5A250A] font-bold uppercase text-xs tracking-wide group-hover:scale-105 transition-transform">
                 See in Action
               </span>
            </a>

            {/* Secondary Button */}
            <a href="#slack" className="group relative inline-flex items-center justify-center w-[180px] h-12 rounded-full bg-[#0B0C0F] border border-white/10 hover:border-white/20 transition-all">
               <div className="flex items-center gap-2">
                 <Icons.Slack />
                 <span className="text-white font-bold uppercase text-xs tracking-wide">Join our Slack</span>
               </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
};

/* --- 6. SERVICES --- */
const Services = () => {
  const services = [
    { title: "Autonomous Agents", desc: "Deploy self-governing AI agents capable of executing complex multi-step workflows without human intervention.", icon: <Icons.Chip /> },
    { title: "Workflow Orchestration", desc: "End-to-end automation of legacy processes using intelligent routing and decision-making logic.", icon: <Icons.Network /> },
    { title: "Predictive Intelligence", desc: "Turn data lakes into foresight. Custom models that predict market shifts, supply chain risks, and customer behavior.", icon: <Icons.Analytics /> },
    { title: "Sovereign AI Infrastructure", desc: "On-premise and private cloud deployment of LLMs ensuring total data privacy and regulatory compliance.", icon: <Icons.Lock /> }
  ];
  return (
    <section id="services" className="py-32 bg-dark-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div><h2 className="text-4xl font-bold text-white mb-4">Core Competencies</h2><p className="text-slate-400 max-w-md">Engineering solutions for the automated economy.</p></div>
          <div className="h-px w-full md:w-1/3 bg-slate-800"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((s, i) => (
            <div key={i} className="group p-8 border border-slate-800 bg-dark-900/50 hover:border-brand-500/50 hover:bg-dark-900 transition-all duration-500">
              <div className="w-12 h-12 text-brand-400 mb-6 group-hover:scale-110 transition-transform duration-500">{s.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- 7. INDUSTRIES --- */
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
          <div className="p-6 border-l-2 border-slate-800 flex items-center justify-center"><span className="text-slate-500 italic">and more...</span></div>
        </div>
      </div>
    </section>
  );
};

/* --- 8. PROCESS --- */
const Process = () => {
  return (
    <section id="process" className="py-32 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center"><h2 className="text-4xl font-bold text-white">The Engineering Cycle</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative z-10">
          {[
            { step: "01", title: "Discovery", text: "We analyze your data infrastructure and identify high-value automation targets." },
            { step: "02", title: "Architecture", text: "We design secure, scalable AI agents tailored to your specific operational logic." },
            { step: "03", title: "Deployment", text: "Rigorous testing, secure implementation, and continuous model optimization." }
          ].map((p, i) => (
            <div key={i} className="relative group">
              <div className="text-7xl md:text-8xl font-bold text-slate-800/40 mb-[-20px] md:mb-[-30px] z-0 select-none group-hover:text-brand-900/40 transition-colors duration-500">{p.step}</div>
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

/* --- 9. TESTIMONIALS --- */
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

/* --- 10. FOOTER --- */
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
      <div className="text-xs text-slate-700">&copy; {new Date().getFullYear()} Mandrea Logic Systems. All rights reserved.</div>
    </div>
  </footer>
);

/* --- MAIN PAGE ASSEMBLY --- */
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