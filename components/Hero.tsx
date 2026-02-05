
import React from 'react';
import { ChevronRight, Stethoscope, TrendingUp, ShieldCheck } from 'lucide-react';
import SavingsSlider from './SavingsSlider';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
              <Stethoscope size={16} />
              Exclusivo para Médicos e Dentistas
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-indigo-950 leading-tight mb-6">
              O contador que <br />
              <span className="text-emerald-500">pensa como gestor.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Deixe o improviso de lado. Tenha previsibilidade, economia tributária e segurança fiscal com uma contabilidade boutique feita para quem cuida da saúde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#triagem" className="flex items-center justify-center gap-2 bg-indigo-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-900/20">
                Fazer Diagnóstico Gratuito
                <ChevronRight size={20} />
              </a>
              <div className="flex items-center gap-3 px-6 py-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i + 10}/32/32`} className="w-8 h-8 rounded-full border-2 border-white" alt="Client" />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-500 underline">Especialistas já validaram</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 relative">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 relative z-10">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-indigo-950 leading-tight mb-2">
                  Trabalhar duro é sua parte. Garantir que o governo não fique com o seu lucro é a nossa.
                </h3>
                <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                  <ShieldCheck size={16} />
                  <span>Dentro da lei, com planejamento e organização</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600">Pessoa Física (Carnê Leão)</span>
                    <span className="text-red-500 font-bold">27,5%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 w-[85%]"></div>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-emerald-900">Pessoa Jurídica (Especialista)</span>
                    <span className="text-emerald-600 font-bold">6% a 15,5%</span>
                  </div>
                  <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[30%]"></div>
                  </div>
                </div>

                <SavingsSlider />
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2">
                <TrendingUp className="text-emerald-500" size={18} />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Foco em Performance Tributária</span>
              </div>
            </div>
            
            {/* Background elements for the visual */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-50 rounded-2xl -z-10 rotate-12 border border-indigo-100"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-50 rounded-2xl -z-10 -rotate-12 border border-emerald-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
