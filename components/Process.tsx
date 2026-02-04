import React from 'react';

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

export default Process;
