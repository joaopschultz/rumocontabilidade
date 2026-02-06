import React, { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { LeadData } from "../types";

const QualifyForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    profession: "médico",
    city: "",
    currentRegime: "PF",

    // mantidos apenas por compatibilidade com o tipo
    estimatedRevenue: "",
    incomeSources: "",
    numCollaborators: "",

    mainGoal: "acelerar uma conversa",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simula envio para CRM / WhatsApp / e-mail
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>

          <h3 className="text-2xl font-bold text-indigo-950 mb-3">
            Obrigado! Sua solicitação foi enviada.
          </h3>

          <p className="text-slate-600 leading-relaxed">
            João entrará em contato em breve para entender seu momento e
            acelerar sua tomada de decisão com segurança.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 text-sm text-slate-500 hover:text-indigo-900 transition-colors"
          >
            Enviar outro contato
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="triagem" className="py-24 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 mb-4">
            Vamos conversar?
          </h2>
          <p className="text-slate-600">
            Preencha os dados abaixo para agilizar sua reunião com o João.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-lg"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Nome Completo
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              E-mail
            </label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Profissão
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.profession}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  profession: e.target.value as any,
                })
              }
            >
              <option value="médico">Médico(a)</option>
              <option value="dentista">Dentista</option>
              <option value="outros">Outros profissionais da saúde</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Atuação Atual
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.currentRegime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentRegime: e.target.value as any,
                })
              }
            >
              <option value="PF">Pessoa Física</option>
              <option value="PJ">Pessoa Jurídica</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Cidade
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Telefone / WhatsApp
            </label>
            <input
              required
              type="tel"
              placeholder="(31) 9..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-800 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>Solicitar contato</>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-4">
              Seus dados estão protegidos conforme nossa Política de Privacidade
              e LGPD.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QualifyForm;
