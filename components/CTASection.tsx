import React from 'react';
import dynamic from 'next/dynamic';
import { Icons } from './Icons';

const HulyClock = dynamic(() => import('./HulyClock'), { ssr: false });

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[#0f1014] pb-[190px] pt-[77px] md:pb-[251px] md:pt-[109px] lg:pb-[294px] lg:pt-[152px]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-0 relative">

        {/* Left Side: Clock */}
        <div className="relative w-full h-[403px] flex items-center justify-center md:justify-start pointer-events-none -mt-10 md:-mt-0">
           {/* Positioning wrapper */}
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

export default CTASection;
