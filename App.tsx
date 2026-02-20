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
        <ProcessSection />

        {/* Comparação */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-indigo-950">
                Por que somos diferentes?
              </h2>
              <p className="text-slate-500 mt-2">
                A comparação que define o próximo nível da sua gestão.
              </p>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block">
              <table className="w-full border-collapse rounded-2xl overflow-hidden border border-slate-200">
                <thead>
                  <tr>
                    <th className="py-4 px-6 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                      Entregável
                    </th>
                    <th className="py-4 px-6 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                      Contabilidade Tradicional
                    </th>
                    <th className="py-4 px-6 bg-indigo-700 text-white text-xs uppercase tracking-wider">
                      RUMO Contabilidade
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {COMPARACAO.map((row) => (
                    <tr
                      key={row.entregavel}
                      className="border-t border-slate-200"
                    >
                      <td className="py-6 px-6 font-semibold text-indigo-950">
                        {row.entregavel}
                      </td>

                      <td className="py-6 px-6 text-slate-600">
                        <div className="flex items-start gap-2">
                          <XCircle
                            className="mt-0.5 text-slate-400"
                            size={18}
                          />
                          <span>{row.tradicional}</span>
                        </div>
                      </td>

                      <td className="py-6 px-6 text-indigo-950 font-semibold">
                        <div className="flex items-start gap-2">
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

            {/* MOBILE */}
            <div className="md:hidden space-y-4">
              {COMPARACAO.map((row) => (
                <div
                  key={row.entregavel}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5"
                >
                  <p className="text-sm font-semibold text-indigo-950 mb-4">
                    {row.entregavel}
                  </p>

                  {/* Tradicional */}
                  <div className="flex items-start gap-3 mb-3">
                    <XCircle
                      className="mt-0.5 text-slate-400"
                      size={18}
                    />
                    <div>
                      <p className="text-xs uppercase text-slate-400 font-semibold">
                        Tradicional
                      </p>
                      <p className="text-slate-600 text-sm">
                        {row.tradicional}
                      </p>
                    </div>
                  </div>

                  {/* RUMO */}
                  <div className="flex items-start gap-3 bg-indigo-50 rounded-xl p-3">
                    <CheckCircle2
                      className="mt-0.5 text-emerald-500"
                      size={18}
                    />
                    <div>
                      <p className="text-xs uppercase text-indigo-700 font-semibold">
                        RUMO
                      </p>
                      <p className="text-indigo-950 font-semibold text-sm">
                        {row.rumo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <QualifyForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
