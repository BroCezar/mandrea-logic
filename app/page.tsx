'use client';

import React, { useState, useEffect, useRef } from 'react';

const EnhancedGlowClock = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<Date | null>(null);
  const trailRef = useRef<Array<{ angle: number; timestamp: number }>>([]);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !time) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = rect.width / 2 - 20;

    const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
    const secAngle = (seconds * 6 - 90) * (Math.PI / 180);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const now = Date.now();
    trailRef.current.push({ angle: secAngle, timestamp: now });
    
    // Keep trail for longer to create the arc effect
    trailRef.current = trailRef.current.filter(t => now - t.timestamp < 2000);

    // Draw the glowing arc trail
    if (trailRef.current.length > 1) {
      // Create gradient path
      for (let i = 0; i < trailRef.current.length - 1; i++) {
        const trail = trailRef.current[i];
        const age = now - trail.timestamp;
        const maxAge = 2000;
        const normalizedAge = age / maxAge;
        
        // Fade from bright orange/white to blue/purple
        const opacity = Math.pow(1 - normalizedAge, 1.5);
        
        // Color transition: white -> orange -> red -> purple -> blue
        let r, g, b;
        if (normalizedAge < 0.2) {
          // White to bright orange
          const t = normalizedAge / 0.2;
          r = 255;
          g = 255 - t * 155;
          b = 255 - t * 205;
        } else if (normalizedAge < 0.5) {
          // Orange to red/purple
          const t = (normalizedAge - 0.2) / 0.3;
          r = 255 - t * 55;
          g = 100 - t * 50;
          b = 50 + t * 150;
        } else {
          // Purple to blue
          const t = (normalizedAge - 0.5) / 0.5;
          r = 200 - t * 100;
          g = 50 + t * 130;
          b = 200 + t * 55;
        }

        const x = centerX + Math.cos(trail.angle) * radius * 0.88;
        const y = centerY + Math.sin(trail.angle) * radius * 0.88;

        // Draw multiple layers for intense glow
        for (let layer = 0; layer < 3; layer++) {
          const layerSize = 8 + layer * 6;
          const layerOpacity = opacity * (0.6 - layer * 0.15);

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, layerSize);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${layerOpacity})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${layerOpacity * 0.5})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.beginPath();
          ctx.arc(x, y, layerSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    }

    // Draw bright leading point (the "comet head")
    const currentX = centerX + Math.cos(secAngle) * radius * 0.88;
    const currentY = centerY + Math.sin(secAngle) * radius * 0.88;

    // Outer glow
    const outerGlow = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 30);
    outerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    outerGlow.addColorStop(0.2, 'rgba(255, 200, 100, 0.8)');
    outerGlow.addColorStop(0.5, 'rgba(255, 100, 50, 0.4)');
    outerGlow.addColorStop(1, 'rgba(255, 100, 50, 0)');

    ctx.beginPath();
    ctx.arc(currentX, currentY, 30, 0, Math.PI * 2);
    ctx.fillStyle = outerGlow;
    ctx.fill();

    // Core bright point
    const coreGlow = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8);
    coreGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
    coreGlow.addColorStop(0.5, 'rgba(255, 220, 150, 0.9)');
    coreGlow.addColorStop(1, 'rgba(255, 150, 80, 0)');

    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
    ctx.fillStyle = coreGlow;
    ctx.fill();

  }, [time]);

  if (!time) return null;

  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-full bg-black overflow-hidden border border-white/10 shadow-2xl">
      
      {/* CANVAS LAYER: Enhanced Comet Trail */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
      />

      {/* Background atmosphere */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-slate-900/50 via-black to-black z-0"></div>
      
      {/* Rotating glow that follows second hand */}
      <div 
        className="absolute inset-0 rounded-full opacity-60 blur-3xl z-1"
        style={{
          background: `conic-gradient(from ${secDeg}deg, transparent 0%, rgba(255, 150, 80, 0.5) 5%, rgba(139, 92, 246, 0.3) 20%, rgba(6, 182, 212, 0.25) 40%, transparent 60%)`,
        }}
      ></div>

      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.2)] z-2"></div>

      {/* Clock face */}
      <div className="relative w-[96%] h-[96%] bg-gradient-to-b from-slate-950 via-black to-slate-950 rounded-full flex items-center justify-center overflow-hidden border border-white/5 z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]">
        
        {/* Radial gradient */}
        <div className="absolute inset-0 z-0 opacity-60" 
             style={{ background: 'radial-gradient(circle at center, rgba(30, 30, 60, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)' }}>
        </div>

        {/* Texture */}
        <div className="absolute inset-0 opacity-15 z-0" 
             style={{ 
               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 0.5px, transparent 0.5px)', 
               backgroundSize: '10px 10px' 
             }}>
        </div>

        {/* Hour markers at 12, 3, 6, 9 */}
        <div className="absolute inset-0 z-5">
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * 90) * (Math.PI / 180);
            const x = Math.sin(angle) * 44;
            const y = -Math.cos(angle) * 44;
            return (
              <div 
                key={i} 
                className="absolute w-1 h-3 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full opacity-60"
                style={{ 
                  top: '50%', 
                  left: '50%', 
                  transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`,
                }}
              ></div>
            );
          })}
        </div>

        {/* Hour Hand */}
        <div 
          className="absolute origin-bottom z-20"
          style={{ 
            width: '5px', 
            height: '23%', 
            bottom: '50%', 
            left: '50%', 
            marginLeft: '-2.5px',
            transform: `rotate(${hourDeg}deg)`,
            background: `linear-gradient(to top, rgba(80, 80, 100, 0.95), rgba(120, 120, 140, 0.7))`,
            borderRadius: '6px 6px 0 0',
            boxShadow: `0 0 10px rgba(100, 100, 120, 0.3)`
          }}
        ></div>

        {/* Minute Hand */}
        <div 
          className="absolute origin-bottom z-30"
          style={{ 
            width: '4px', 
            height: '33%', 
            bottom: '50%', 
            left: '50%', 
            marginLeft: '-2px',
            transform: `rotate(${minDeg}deg)`,
            background: `linear-gradient(to top, rgba(100, 100, 120, 0.95), rgba(150, 150, 170, 0.8))`,
            borderRadius: '5px 5px 0 0',
            boxShadow: `0 0 15px rgba(120, 120, 140, 0.4)`
          }}
        ></div>

        {/* Second Hand - Invisible (trail shows it) */}
        <div 
          className="absolute origin-bottom z-40 opacity-0"
          style={{ 
            width: '2px', 
            height: '40%', 
            bottom: '50%', 
            left: '50%', 
            marginLeft: '-1px',
            transform: `rotate(${secDeg}deg)`,
          }}
        ></div>

        {/* Center cap */}
        <div className="absolute w-4 h-4 rounded-full z-50 flex items-center justify-center bg-slate-800 border border-slate-600 shadow-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
        </div>

      </div>
    </div>
  );
};