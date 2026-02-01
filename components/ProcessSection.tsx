
import React from 'react';
import { PROCESS_STEPS } from '../constants';

const ProcessSection: React.FC = () => {
  return (
    <section id="processo" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-indigo-950 mb-8 leading-tight">
              Sua transição para uma gestão de elite em <span className="text-emerald-500">3 passos.</span>
            </h2>
            <div className="space-y-12">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-900/20">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-indigo-950 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <div className="w-64 h-64 border-8 border-white rounded-full"></div>
            </div>
            
            <h4 className="text-2xl font-bold mb-6 relative z-10">Rotina Mensal Previsível</h4>
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Dia 05</p>
                  <p className="text-white/70 text-sm">Fechamento de faturamento e envio de notas/recibos.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Dia 15</p>
                  <p className="text-white/70 text-sm">Entrega de guias tributárias com resumo explicativo.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="font-semibold">Dia 25</p>
                  <p className="text-white/70 text-sm">Relatório gerencial: "Quanto entrou, quanto saiu, quanto sobrou".</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 rounded-3xl bg-emerald-500 text-indigo-950 font-bold text-center">
              Zero surpresas, 100% controle.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
