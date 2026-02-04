'use client';

import React, { useState, useEffect, useRef } from 'react';

/* --- 1. HULY CLOCK COMPONENT (Fixed & Formatted) --- */
export const HulyClock = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<Date | null>(null);
  // Store the trail data in a ref so it persists across renders without triggering re-renders
  const trailRef = useRef<Array<{ angle: number; timestamp: number }>>([]);

  useEffect(() => {
    // Set start time
    setTime(new Date());

    let animationFrameId: number;

    const animate = () => {
      setTime(new Date());
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation loop
    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !time) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle High-DPI screens
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = rect.width / 2 - 20;

    const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
    // -90 degrees so 0 seconds is at the top
    const secAngle = (seconds * 6 - 90) * (Math.PI / 180);

    // Clear previous frame
    ctx.clearRect(0, 0, rect.width, rect.height);

    const now = Date.now();
    // Add current position to trail
    trailRef.current.push({ angle: secAngle, timestamp: now });

    // Remove old trail points (older than 2 seconds)
    trailRef.current = trailRef.current.filter(t => now - t.timestamp < 2000);

    // Draw the glowing arc trail
    if (trailRef.current.length > 1) {
      for (let i = 0; i < trailRef.current.length - 1; i++) {
        const trail = trailRef.current[i];
        const age = now - trail.timestamp;
        const normalizedAge = age / 2000; // 0 to 1

        // Fade out older parts of the trail
        const opacity = Math.pow(1 - normalizedAge, 1.5);

        // Color transition logic: White -> Orange -> Purple -> Blue
        let r, g, b;
        if (normalizedAge < 0.2) {
          const t = normalizedAge / 0.2;
          r = 255; g = 255 - t * 155; b = 255 - t * 205;
        } else if (normalizedAge < 0.5) {
          const t = (normalizedAge - 0.2) / 0.3;
          r = 255 - t * 55; g = 100 - t * 50; b = 50 + t * 150;
        } else {
          const t = (normalizedAge - 0.5) / 0.5;
          r = 200 - t * 100; g = 50 + t * 130; b = 200 + t * 55;
        }

        const x = centerX + Math.cos(trail.angle) * radius * 0.88;
        const y = centerY + Math.sin(trail.angle) * radius * 0.88;

        // Draw multiple layers for glow effect
        for (let layer = 0; layer < 3; layer++) {
          const layerSize = 8 + layer * 6;
          const layerOpacity = opacity * (0.6 - layer * 0.15);

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, layerSize);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${layerOpacity})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.beginPath();
          ctx.arc(x, y, layerSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    }

    // Draw the "Head" (Current Second)
    const currentX = centerX + Math.cos(secAngle) * radius * 0.88;
    const currentY = centerY + Math.sin(secAngle) * radius * 0.88;

    // Outer white glow
    const headGlow = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 30);
    headGlow.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    headGlow.addColorStop(0.2, 'rgba(255, 200, 100, 0.8)');
    headGlow.addColorStop(1, 'rgba(255, 100, 50, 0)');

    ctx.beginPath();
    ctx.arc(currentX, currentY, 30, 0, Math.PI * 2);
    ctx.fillStyle = headGlow;
    ctx.fill();

    // Bright core
    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
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

      {/* 1. CANVAS LAYER (The Comet Trail) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
      />

      {/* 2. BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-slate-900/50 via-black to-black z-0"></div>

      {/* 3. AMBIENT ROTATING GLOW */}
      <div
        className="absolute inset-0 rounded-full opacity-60 blur-3xl z-1"
        style={{
          background: `conic-gradient(from ${secDeg}deg, transparent 0%, rgba(255, 150, 80, 0.5) 5%, rgba(139, 92, 246, 0.3) 20%, rgba(6, 182, 212, 0.25) 40%, transparent 60%)`,
        }}
      ></div>

      {/* 4. OUTER RING BORDER */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.2)] z-2"></div>

      {/* 5. CLOCK FACE */}
      <div className="relative w-[96%] h-[96%] bg-gradient-to-b from-slate-950 via-black to-slate-950 rounded-full flex items-center justify-center overflow-hidden border border-white/5 z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]">

        {/* Face Gradient */}
        <div className="absolute inset-0 z-0 opacity-60"
             style={{ background: 'radial-gradient(circle at center, rgba(30, 30, 60, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)' }}>
        </div>

        {/* Texture Grid */}
        <div className="absolute inset-0 opacity-15 z-0"
             style={{
               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 0.5px, transparent 0.5px)',
               backgroundSize: '10px 10px'
             }}>
        </div>

        {/* Hour Markers (12, 3, 6, 9) */}
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

        {/* Center Cap */}
        <div className="absolute w-4 h-4 rounded-full z-50 flex items-center justify-center bg-slate-800 border border-slate-600 shadow-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
        </div>

      </div>
    </div>
  );
};
