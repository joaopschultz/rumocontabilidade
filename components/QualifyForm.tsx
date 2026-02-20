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

  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedUF, setSelectedUF] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    phone: "",
  });

  const [formData, setFormData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    profession: "médico",
    city: "",
    currentRegime: "PF",
    estimatedRevenue: "",
    incomeSources: "",
    numCollaborators: "",
    mainGoal: "acelerar uma conversa",
  });

  // ---------------- IBGE ----------------
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      );
      const data: UF[] = await res.json();
      setUfs(data);
    })();
  }, []);

  useEffect(() => {
    if (!selectedUF) return;

    (async () => {
      setLoadingCities(true);
      setSelectedCity("");
      setCities([]);

      const res = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios?orderBy=nome`
      );
      const data: City[] = await res.json();

      const capital = CAPITAIS[selectedUF];
      if (capital) {
        const idx = data.findIndex((c) => c.nome === capital);
        if (idx > -1) {
          const [cap] = data.splice(idx, 1);
          data.unshift(cap);
        }
      }

      setCities(data);
      setLoadingCities(false);
    })();
  }, [selectedUF]);

  // ---------------- VALIDAÇÕES ----------------

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

  // ---------------- MÁSCARA TELEFONE ----------------

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(
        6
      )}`;

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
      7,
      11
    )}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setFormData({ ...formData, phone: formatted });
  };

  // ---------------- SUBMIT ----------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailOk = validateEmail(formData.email);
    const phoneOk = validatePhone(formData.phone);

    if (!emailOk || !phoneOk) return;

    const cityNormalized = `${selectedCity} - ${selectedUF}`;
    setFormData((prev) => ({ ...prev, city: cityNormalized }));

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 max-w-2xl mx-auto text-center">
        <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-indigo-950 mb-3">
          Obrigado! Sua solicitação foi enviada.
        </h3>
        <p className="text-slate-600">
          João entrará em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-8 md:p-12 rounded-[2rem] border shadow-lg"
        >
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Nome Completo
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              E-mail
            </label>
            <input
              required
              type="email"
              className={`w-full px-4 py-3 rounded-xl border ${
                fieldErrors.email
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-200 focus:ring-indigo-900/20"
              } focus:ring-2 bg-white`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onBlur={() => validateEmail(formData.email)}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-600">{fieldErrors.email}</p>
            )}
          </div>

          {/* Estado + Cidade */}
          <div className="md:col-start-1">
            <div className="grid md:grid-cols-[110px_1fr] gap-6">
              <div>
                <label className="text-sm font-semibold text-indigo-950">
                  Estado
                </label>
                <select
                  required
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 bg-white"
                  value={selectedUF}
                  onChange={(e) => setSelectedUF(e.target.value)}
                >
                  <option value="">UF</option>
                  {ufs.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.sigla}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-indigo-950">
                  Cidade
                </label>
                <select
                  required
                  disabled={!selectedUF}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.nome}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">
              Telefone / WhatsApp
            </label>
            <input
              required
              type="tel"
              placeholder="(31) 99999-9999"
              className={`w-full px-4 py-3 rounded-xl border ${
                fieldErrors.phone
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-slate-200 focus:ring-indigo-900/20"
              } focus:ring-2 bg-white`}
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => validatePhone(formData.phone)}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-rose-600">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Botão */}
          <div className="md:col-span-2 mt-4">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-800 transition"
            >
              {loading ? "Enviando..." : "Solicitar contato"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QualifyForm;
