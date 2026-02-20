import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import ProcessSection from "./components/ProcessSection";
import QualifyForm from "./components/QualifyForm";
import Footer from "./components/Footer";
import { CheckCircle2, XCircle } from "lucide-react";

function App() {
  const WHATSAPP_LINK =
    "https://wa.me/5531999993189?text=Olá,%20gostaria%20de%20falar%20com%20um%20consultor%20da%20RUMO.";

  const COMPARACAO = [
    {
      entregavel: "Análise PF x PJ",
      tradicional: "Só quando solicitado",
      rumo: "Diagnóstico mensal ativo",
    },
    {
      entregavel: "Relatórios Financeiros",
      tradicional: "Inexistentes",
      rumo: "Resumo simples e gerencial",
    },
    {
      entregavel: "Conformidade LGPD",
      tradicional: "Não é pauta",
      rumo: "Nativo no processo",
    },
    {
      entregavel: "Atendimento",
      tradicional: "Camadas, intermediários e respostas lentas",
      rumo: "WhatsApp direto com quem decide e resolve",
    },
  ] as const;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />

        <FeaturesSection />

        {/* Quote/Vision Section */}
        <section className="bg-indigo-900 py-24 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 leading-tight">
              "Sua prioridade é o paciente. <br className="hidden md:block" /> A
              nossa é a saúde da sua empresa."
            </h2>
            <div className="flex items-center justify-center gap-6">
              <div className="relative">
                <img
                  src="images/founder-joao-paulo.jpg"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-emerald-400 object-cover shadow-2xl"
                  alt="João Paulo - RUMO"
                />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-xl">João Paulo</p>
                <p className="text-indigo-100">
                  Founder & Consultor Estratégico RUMO
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* Comparação (Responsiva) */}
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

            {/* DESKTOP / TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse rounded-2xl overflow-hidden border border-slate-100">
                <thead>
                  <tr>
                    <th className="py-4 px-6 text-slate-600 font-semibold uppercase text-xs tracking-wider bg-slate-50">
                      Entregável
                    </th>

                    {/* Tradicional: mais acinzentado */}
                    <th className="py-4 px-6 text-slate-600 font-semibold uppercase text-xs tracking-wider bg-slate-100">
                      Contabilidade Tradicional
                    </th>

                    {/* RUMO: azul mais sutil */}
                    <th className="py-4 px-6 text-indigo-50 font-bold uppercase text-xs tracking-wider bg-indigo-800">
                      RUMO Contabilidade
                    </th>
                  </tr>
                </thead>

                <tbody className="text-slate-700">
                  {COMPARACAO.map((row) => (
                    <tr
                      key={row.entregavel}
                      className="border-t border-slate-100"
                    >
                      <td className="py-6 px-6 font-semibold text-indigo-950">
                        {row.entregavel}
                      </td>

                      {/* Tradicional: bg cinza + X */}
                      <td className="py-6 px-6 bg-slate-50 text-slate-500">
                        <div className="flex items-start gap-2">
                          <XCircle className="mt-0.5 text-rose-400" size={18} />
                          <span>{row.tradicional}</span>
                        </div>
                      </td>

                      {/* RUMO: bg leve + check verde */}
                      <td className="py-6 px-6 bg-indigo-50/60">
                        <div className="flex items-start gap-2 text-indigo-950 font-semibold">
                          <CheckCircle2
                            className="mt-0.5 text-emerald-500"
                            size={18}
                          />
                          <span>{row.rumo}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE / CARDS (títulos mais discretos) */}
            <div className="md:hidden space-y-4">
              {COMPARACAO.map((row) => (
                <div
                  key={row.entregavel}
                  className="rounded-2xl border border-slate-100 bg-white shadow-sm"
                >
                  {/* título discreto */}
                  <div className="px-5 pt-5 pb-3">
                    <p className="text-sm font-semibold text-indigo-950">
                      {row.entregavel}
                    </p>
                  </div>

                  <div className="px-5 pb-5 space-y-3">
                    {/* Tradicional */}
                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                      <div className="mt-0.5">
                        <XCircle className="text-rose-400" size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Tradicional
                        </p>
                        <p className="text-slate-600">{row.tradicional}</p>
                      </div>
                    </div>

                    {/* RUMO */}
                    <div className="flex items-start gap-3 rounded-xl bg-indigo-50/60 p-3">
                      <div className="mt-0.5">
                        <CheckCircle2 className="text-emerald-500" size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
                          RUMO
                        </p>
                        <p className="text-indigo-950 font-semibold">
                          {row.rumo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-slate-400 mt-8">
              *Comparação ilustrativa para destacar diferenciais de serviço.
            </p>
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
