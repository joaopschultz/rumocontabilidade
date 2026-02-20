import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type UF = {
  id: number;
  sigla: string;
  nome: string;
};

type City = {
  id: number;
  nome: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  profession: string;
  monthlyRevenue: string;
  hasCnpj: string;
  currentRegime: string;
  painPoint: string;
};

const QualifyForm: React.FC = () => {
  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedUF, setSelectedUF] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    profession: "",
    monthlyRevenue: "",
    hasCnpj: "",
    currentRegime: "",
    painPoint: "",
  });

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Load UFs (IBGE)
  useEffect(() => {
    const loadUFs = async () => {
      try {
        const res = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data = (await res.json()) as UF[];
        setUfs(data);
      } catch (err) {
        console.error("Erro ao carregar UFs:", err);
      }
    };
    loadUFs();
  }, []);

  // Load Cities (IBGE) for selected UF
  useEffect(() => {
    const loadCities = async () => {
      if (!selectedUF) {
        setCities([]);
        setSelectedCity("");
        return;
      }

      setLoadingCities(true);
      try {
        const res = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`
        );
        const data = (await res.json()) as City[];
        setCities(data);
        setSelectedCity("");
      } catch (err) {
        console.error("Erro ao carregar cidades:", err);
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, [selectedUF]);

  const WHATSAPP_LINK =
    "https://wa.me/5531999993189?text=Olá,%20quero%20qualificar%20meu%20cenário%20com%20a%20RUMO.";

  const formatPayload = () => {
    return {
      ...formData,
      uf: selectedUF,
      city: selectedCity,
      submittedAt: new Date().toISOString(),
      source: "landing-page",
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      // Placeholder: aqui você integra com seu endpoint (Webhook, CRM etc.)
      // Exemplo:
      // await fetch("https://seu-endpoint.com/webhook", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formatPayload()),
      // });

      // Simulação de envio
      await new Promise((r) => setTimeout(r, 600));

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Não foi possível enviar. Tente novamente ou fale com a gente no WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-indigo-950">
            Vamos qualificar seu cenário?
          </h2>
          <p className="text-slate-600 mt-3">
            Responda em 1 minuto e receba um direcionamento claro sobre o melhor
            caminho (PF x PJ, regime e próximos passos).
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 sm:p-10">
            {submitted ? (
              <div className="text-center py-10">
                <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                  <CheckCircle2 className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-indigo-950">
                  Recebido! 🙌
                </h3>
                <p className="text-slate-600 mt-2 max-w-xl mx-auto">
                  Em breve entraremos em contato. Se preferir, pode falar agora
                  mesmo no WhatsApp.
                </p>

                <div className="mt-8">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-indigo-900 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-indigo-950">
                    Nome
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>

                {/* Profissão */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-indigo-950">
                    Profissão
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20"
                    placeholder="Médico, dentista, clínica..."
                    value={formData.profession}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, profession: e.target.value }))
                    }
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-indigo-950">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>

                {/* Estado / Cidade / Telefone — mesma linha */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-[minmax(140px,180px)_1fr_1fr] gap-6 items-end">
                  {/* Estado */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-indigo-950">
                      Estado
                    </label>
                    <select
                      required
                      className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
                      value={selectedUF}
                      onChange={(e) => setSelectedUF(e.target.value)}
                    >
                      <option value="" disabled>
                        UF
                      </option>
                      {ufs.map((uf) => (
                        <option key={uf.id} value={uf.sigla}>
                          {uf.sigla}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cidade */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-indigo-950">
                      Cidade
                    </label>
                    <select
                      required
                      disabled={!selectedUF || loadingCities}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white disabled:opacity-60"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="" disabled>
                        {loadingCities ? "Carregando..." : "Selecione..."}
                      </option>
                      {cities.map((c) => (
                        <option key={c.id} value={c.nome}>
                          {c.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Telefone */}
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
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Faturamento */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-indigo-950">
                    Faturamento mensal aproximado
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
                    value={formData.monthlyRevenue}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        monthlyRevenue: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    <option value="até 10k">Até R$ 10 mil</option>
                    <option value="10k a 30k">R$ 10 mil a R$ 30 mil</option>
                    <option value="30k a 70k">R$ 30 mil a R$ 70 mil</option>
                    <option value="70k+">Acima de R$ 70 mil</option>
                  </select>
                </div>

                {/* Possui CNPJ */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-indigo-950">
                    Já possui CNPJ?
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
                    value={formData.hasCnpj}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, hasCnpj: e.target.value }))
                    }
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    <option value="sim">Sim</option>
                    <option value="não">Não</option>
                  </select>
                </div>

                {/* Regime atual */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-indigo-950">
                    Se já tem CNPJ, qual o regime atual?
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
                    value={formData.currentRegime}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        currentRegime: e.target.value,
                      }))
                    }
                  >
                    <option value="">Não se aplica / Não sei</option>
                    <option value="simples">Simples Nacional</option>
                    <option value="presumido">Lucro Presumido</option>
                    <option value="real">Lucro Real</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                {/* Dor / principal desafio */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-indigo-950">
                    Qual seu principal desafio hoje?
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 min-h-[120px]"
                    placeholder="Ex.: impostos altos, falta de clareza financeira, medo de cair na malha fina..."
                    value={formData.painPoint}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, painPoint: e.target.value }))
                    }
                  />
                </div>

                {/* Error */}
                {errorMessage && (
                  <div className="md:col-span-2 rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-700 text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-slate-500">
                    Ao enviar, você concorda em receber contato da RUMO.{" "}
                    <span className="text-slate-400">
                      © {currentYear} RUMO Contabilidade.
                    </span>
                  </p>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-indigo-900 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={18} />
                        Enviando...
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-600">
            Prefere ir direto ao ponto?
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center mt-3 bg-white border border-slate-200 text-indigo-950 px-7 py-3 rounded-full font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default QualifyForm;
