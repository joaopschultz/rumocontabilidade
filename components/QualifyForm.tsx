import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { LeadData } from "../types";

type UF = { id: number; sigla: string; nome: string };
type City = { id: number; nome: string };

const CAPITAIS: Record<string, string> = {
  AC: "Rio Branco",
  AL: "Maceió",
  AP: "Macapá",
  AM: "Manaus",
  BA: "Salvador",
  CE: "Fortaleza",
  DF: "Brasília",
  ES: "Vitória",
  GO: "Goiânia",
  MA: "São Luís",
  MT: "Cuiabá",
  MS: "Campo Grande",
  MG: "Belo Horizonte",
  PA: "Belém",
  PB: "João Pessoa",
  PR: "Curitiba",
  PE: "Recife",
  PI: "Teresina",
  RJ: "Rio de Janeiro",
  RN: "Natal",
  RS: "Porto Alegre",
  RO: "Porto Velho",
  RR: "Boa Vista",
  SC: "Florianópolis",
  SP: "São Paulo",
  SE: "Aracaju",
  TO: "Palmas",
};

const QualifyForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Estado/Cidade (IBGE)
  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedUF, setSelectedUF] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  // erros por campo (validação antes do submit / blur)
  const [fieldErrors, setFieldErrors] = useState<{ email: string; phone: string }>(
    { email: "", phone: "" }
  );

  const [formData, setFormData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    profession: "médico",
    city: "", // vamos preencher como "Cidade - UF"
    currentRegime: "PF",

    // mantidos só por compatibilidade com o tipo
    estimatedRevenue: "",
    incomeSources: "",
    numCollaborators: "",

    mainGoal: "acelerar uma conversa",
  });

  // ---------------- IBGE ----------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data: UF[] = await res.json();
        setUfs(data);
      } catch (err) {
        console.error("Erro ao carregar UFs (IBGE):", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedUF) return;

    (async () => {
      try {
        setLoadingCities(true);
        setSelectedCity("");
        setCities([]);

        const res = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`
        );
        const data: City[] = await res.json();

        // Capital primeiro
        const capital = CAPITAIS[selectedUF];
        if (capital) {
          const idx = data.findIndex((c) => c.nome === capital);
          if (idx > -1) {
            const [cap] = data.splice(idx, 1);
            data.unshift(cap);
          }
        }

        setCities(data);
      } catch (err) {
        console.error("Erro ao carregar cidades (IBGE):", err);
      } finally {
        setLoadingCities(false);
      }
    })();
  }, [selectedUF]);

  // ---------------- validações ----------------
  const validateEmail = (email: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    setFieldErrors((prev) => ({
      ...prev,
      email: isValid ? "" : "Informe um e-mail válido.",
    }));
    return isValid;
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    const isValid = digits.length === 10 || digits.length === 11;
    setFieldErrors((prev) => ({
      ...prev,
      phone: isValid ? "" : "Telefone deve ter DDD + número.",
    }));
    return isValid;
  };

  // ---------------- máscara telefone (permite apagar tudo) ----------------
  const formatPhoneBR = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    // ✅ se não tiver nada, deixa vazio (não prende "(")
    if (digits.length === 0) return "";

    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (raw: string) => {
    const formatted = formatPhoneBR(raw);
    setFormData((prev) => ({ ...prev, phone: formatted }));

    // se já tinha erro e o usuário está corrigindo, revalida
    if (fieldErrors.phone) validatePhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailOk = validateEmail(formData.email);
    const phoneOk = validatePhone(formData.phone);
    if (!emailOk || !phoneOk) return;

    // padroniza o campo city no formato "Cidade - UF"
    const cityNormalized = `${selectedCity} - ${selectedUF}`;
    setFormData((prev) => ({ ...prev, city: cityNormalized }));

    setLoading(true);
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
            João entrará em contato em breve para agilizar sua reunião.
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedUF("");
              setSelectedCity("");
              setCities([]);
              setFieldErrors({ email: "", phone: "" });
              setFormData((p) => ({
                ...p,
                name: "",
                email: "",
                phone: "",
                profession: "médico",
                currentRegime: "PF",
                city: "",
              }));
            }}
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
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Nome Completo
            </label>
            <input
              required
              type="text"
              autoComplete="name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">E-mail</label>
            <input
              required
              type="email"
              inputMode="email"
              autoComplete="email"
              className={`w-full px-4 py-3 rounded-xl border ${
                fieldErrors.email
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-200 focus:ring-indigo-900/20"
              } focus:outline-none focus:ring-2 bg-white`}
              value={formData.email}
              onChange={(e) => {
                const v = e.target.value;
                setFormData({ ...formData, email: v });
                if (fieldErrors.email) validateEmail(v);
              }}
              onBlur={() => validateEmail(formData.email)}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Profissão (voltou) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Profissão</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.profession}
              onChange={(e) =>
                setFormData({ ...formData, profession: e.target.value as any })
              }
            >
              <option value="médico">Médico(a)</option>
              <option value="dentista">Dentista</option>
              <option value="outros">Outros profissionais da saúde</option>
            </select>
          </div>

          {/* Atuação Atual (voltou) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Atuação Atual
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.currentRegime}
              onChange={(e) =>
                setFormData({ ...formData, currentRegime: e.target.value as any })
              }
            >
              <option value="PF">Pessoa Física</option>
              <option value="PJ">Pessoa Jurídica</option>
            </select>
          </div>

          {/* Estado + Cidade (coluna esquerda) */}
          <div className="space-y-2 md:col-start-1">
            <div className="grid grid-cols-1 md:grid-cols-[110px_minmax(0,1fr)] gap-6 items-end">
              {/* Estado */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-indigo-950">Estado</label>
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
                <label className="text-sm font-semibold text-indigo-950">Cidade</label>
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
            </div>
          </div>

          {/* Telefone (coluna direita) */}
          <div className="space-y-2 md:col-start-2">
            <label className="text-sm font-semibold text-indigo-950">
              Telefone / WhatsApp
            </label>
            <input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(31) 99999-9999"
              className={`w-full px-4 py-3 rounded-xl border ${
                fieldErrors.phone
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-200 focus:ring-indigo-900/20"
              } focus:outline-none focus:ring-2 bg-white`}
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => validatePhone(formData.phone)}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>
            )}
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
              Seus dados estão protegidos conforme nossa Política de Privacidade e LGPD.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QualifyForm;
