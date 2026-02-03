
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import ProcessSection from './components/ProcessSection';
import QualifyForm from './components/QualifyForm';
import Footer from './components/Footer';

function App() {
  const WHATSAPP_LINK = "https://wa.me/5531987654321?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor%20da%20RUMO.";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        {/* Trust Bar - Hidden temporarily as requested */}
        {/* 
        <div className="bg-slate-50 py-12 border-y border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
            <div className="font-bold text-xl">MEDCLOUD</div>
            <div className="font-bold text-xl">DENTALEASE</div>
            <div className="font-bold text-xl">HEALTHPARTNER</div>
            <div className="font-bold text-xl">SIMPLESNACIONAL</div>
            <div className="font-bold text-xl">LGPDSYSTEM</div>
          </div>
        </div>
        */}

        <FeaturesSection />
        
        {/* Quote/Vision Section */}
        <section className="bg-indigo-900 py-24 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight">
              "Sua prioridade é o paciente. <br className="hidden md:block" /> A nossa é a saúde da sua empresa."
            </h2>
            <div className="flex items-center justify-center gap-6">
              <div className="relative">
                <img
                  src={`${import.meta.env.BASE_URL}founder-joao-paulo.jpg`}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-emerald-400 object-cover shadow-2xl"
                  alt="João Paulo - RUMO"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-indigo-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-xl md:text-2xl">João Paulo</p>
                <p className="text-emerald-400 font-medium">Founder & Consultor Estratégico RUMO</p>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* Benefits Table */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-indigo-950">Por que somos diferentes?</h2>
              <p className="text-slate-500 mt-2">A comparação que define o próximo nível da sua gestão.</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 px-6 text-slate-500 font-medium uppercase text-xs tracking-wider">Entregável</th>
                    <th className="py-4 px-6 text-slate-500 font-medium uppercase text-xs tracking-wider">Contabilidade Tradicional</th>
                    <th className="py-4 px-6 text-indigo-900 font-bold uppercase text-xs tracking-wider bg-indigo-50/50">RUMO Contabilidade</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-6 font-medium">Análise PF x PJ</td>
                    <td className="py-6 px-6 text-slate-400">Só quando solicitado</td>
                    <td className="py-6 px-6 text-indigo-950 font-semibold bg-indigo-50/50">Diagnóstico mensal ativo</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-6 font-medium">Relatórios Financeiros</td>
                    <td className="py-6 px-6 text-slate-400">Inexistentes</td>
                    <td className="py-6 px-6 text-indigo-950 font-semibold bg-indigo-50/50">Resumo simples e gerencial</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-6 px-6 font-medium">Conformidade LGPD</td>
                    <td className="py-6 px-6 text-slate-400">Não é pauta</td>
                    <td className="py-6 px-6 text-indigo-950 font-semibold bg-indigo-50/50">Nativo no processo</td>
                  </tr>
                  <tr>
                    <td className="py-6 px-6 font-medium">Atendimento</td>
                    <td className="py-6 px-6 text-slate-400">Camadas, intermediários e respostas lentas</td>
                    <td className="py-6 px-6 text-indigo-950 font-semibold bg-indigo-50/50">WhatsApp direto com quem decide e resolve</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <QualifyForm />
      </main>
      <Footer />
      
      {/* Floating CTA for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 left-6 z-40">
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-indigo-900 text-white py-4 rounded-2xl font-bold shadow-2xl"
        >
          Falar com um Consultor
        </a>
      </div>
    </div>
  );
}

export default App;
