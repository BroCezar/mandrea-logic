import React from 'react';

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

export default Footer;
