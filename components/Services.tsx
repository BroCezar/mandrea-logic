import React from 'react';
import { Icons } from './Icons';

const Services = () => {
  const services = [
    { title: "Autonomous Agents", desc: "Deploy self-governing AI agents capable of executing complex multi-step workflows without human intervention.", icon: <Icons.Chip /> },
    { title: "Workflow Orchestration", desc: "End-to-end automation of legacy processes using intelligent routing and decision-making logic.", icon: <Icons.Network /> },
    { title: "Predictive Intelligence", desc: "Turn data lakes into foresight. Custom models that predict market shifts, supply chain risks, and customer behavior.", icon: <Icons.Analytics /> },
    { title: "Sovereign AI Infrastructure", desc: "On-premise and private cloud deployment of LLMs ensuring total data privacy and regulatory compliance.", icon: <Icons.Lock /> }
  ];
  return (
    <section id="services" className="py-32 bg-dark-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div><h2 className="text-4xl font-bold text-white mb-4">Core Competencies</h2><p className="text-slate-400 max-w-md">Engineering solutions for the automated economy.</p></div>
          <div className="h-px w-full md:w-1/3 bg-slate-800"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((s, i) => (
            <div key={i} className="group p-8 border border-slate-800 bg-dark-900/50 hover:border-brand-500/50 hover:bg-dark-900 transition-all duration-500">
              <div className="w-12 h-12 text-brand-400 mb-6 group-hover:scale-110 transition-transform duration-500">{s.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
