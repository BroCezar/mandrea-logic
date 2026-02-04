'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

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

export default Navbar;
