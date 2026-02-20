import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import ProcessSection from "./components/ProcessSection";
import QualifyForm from "./components/QualifyForm";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const WHATSAPP_LINK =
    "https://wa.me/5531999993189?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor%20da%20RUMO.";

  const COMPARISON_ROWS = [
    {
      feature: "Análise PF x PJ",
      traditional: "Só quando solicitado",
      rumo: "Planejamento tributário ativo",
    },
    {
      feature: "Relatórios Financeiros",
      traditional: "Inexistentes",
      rumo: "Resumo simples e gerencial",
    },
    {
      feature: "Conformidade LGPD",
      traditional: "Não é pauta",
      rumo: "Nativo no processo",
    },
    {
      feature: "Atendimento",
      traditional: "Camadas, intermediários e respostas lentas",
      rumo: "WhatsApp direto com quem decide e resolve",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        <Hero />

        <section id="metodo">
          <FeaturesSection />
        </section>

        {/* Benefits Table — Responsive */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-indigo-950">
                Por que somos diferentes?
              </h2>
              <p className="text-slate-500 mt-2">
                A comparação que define o próximo nível da sua gestão.
              </p>
            </div>

            {/* Desktop: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-4 px-6 text-slate-500 font-medium uppercase text-xs tracking-wider"
                    >
                      Entregável
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-6 text-slate-400 font-medium uppercase text-xs tracking-wider"
                    >
                      Contabilidade Tradicional
                    </th>
                    <th
                      scope="col"
                      className="py-4 px-6 text-indigo-900 font-bold uppercase text-xs tracking-wider bg-indigo-50/50"
                    >
                      RUMO Contabilidade
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="border-b border-slate-100">
                      <td className="py-5 px-6 font-semibold text-indigo-950">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 text-slate-500">
                        {row.traditional}
                      </td>
                      <td className="py-5 px-6 bg-indigo-50/30 text-indigo-950 font-medium">
                        {row.rumo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: Cards */}
            <div className="md:hidden space-y-6">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.feature}
                  className="rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <div className="px-5 py-4 bg-white">
                    <p className="text-sm font-bold text-indigo-950">
                      {row.feature}
                    </p>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="px-5 py-4 bg-slate-50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                          Tradicional
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {row.traditional}
                      </p>
                    </div>

                    <div className="px-5 py-4 bg-indigo-50/40">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wide">
                          RUMO
                        </span>
                      </div>
                      <p className="text-sm text-indigo-950 leading-relaxed font-medium">
                        {row.rumo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-indigo-900 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl"
              >
                Quero entender meu cenário
              </a>
            </div>
          </div>
        </section>

        <section id="processo">
          <ProcessSection />
        </section>

        <section id="qualificar">
          <QualifyForm />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
