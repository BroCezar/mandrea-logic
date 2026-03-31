import React from 'react';

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

export default Industries;
