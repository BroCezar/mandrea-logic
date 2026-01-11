'use client';

import React, { useEffect, useState } from 'react';

export default function TechClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="w-80 h-80 rounded-full bg-dark-950 border border-slate-800 animate-pulse"></div>;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center rounded-full bg-dark-950 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-800/50 p-2 select-none">
      
      {/* 1. OUTER GLOW TRAIL */}
      <div 
        className="absolute inset-0 rounded-full opacity-60 blur-2xl transition-transform duration-1000 ease-linear will-change-transform"
        style={{
          background: `conic-gradient(from ${secDeg - 90}deg, transparent 0%, transparent 70%, #06b6d4 90%, #f97316 100%)`
        }}
      ></div>

      {/* 2. INNER FACE */}
      <div className="relative w-full h-full bg-dark-950 rounded-full flex items-center justify-center z-10 overflow-hidden border border-slate-700/30">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

        {/* TICKS */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`absolute w-1 h-3 bg-slate-600 ${i % 3 === 0 ? 'h-5 bg-slate-400 w-1.5' : ''}`}
            style={{ transform: `rotate(${i * 30}deg) translateY(-130px)`, transformOrigin: 'center 140px' }}
          />
        ))}

        {/* HANDS */}
        <div className="absolute w-2 h-20 bg-slate-300 rounded-full z-20 shadow-lg origin-bottom" style={{ transform: `rotate(${hourDeg}deg) translateY(-50%)` }}></div>
        <div className="absolute w-1.5 h-28 bg-brand-500 rounded-full z-30 shadow-[0_0_10px_rgba(6,182,212,0.5)] origin-bottom" style={{ transform: `rotate(${minDeg}deg) translateY(-50%)` }}></div>
        <div className="absolute w-0.5 h-32 bg-orange-500 z-40 origin-bottom transition-transform duration-1000 ease-linear" style={{ transform: `rotate(${secDeg}deg) translateY(-30%)` }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_15px_#f97316]"></div>
        </div>
        
        <div className="absolute w-4 h-4 bg-slate-200 rounded-full z-50 border-2 border-dark-950"></div>
        <div className="absolute top-20 text-[10px] font-bold tracking-[0.3em] text-slate-600 uppercase">Mandrea</div>
      </div>
    </div>
  );
}