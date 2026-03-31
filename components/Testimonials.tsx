import React from 'react';

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

export default Testimonials;
