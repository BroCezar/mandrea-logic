'use client';

import React, { useState, useEffect } from 'react';

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

export default Hero;
