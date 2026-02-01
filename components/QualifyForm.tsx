
import React, { useState } from 'react';
import { Send, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { getSmartDiagnostic } from '../services/geminiService';
import { LeadData } from '../types';

const QualifyForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [diagnostic, setDiagnostic] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    profession: 'médico',
    city: '',
    currentRegime: 'PF',
    estimatedRevenue: '',
    incomeSources: '',
    numCollaborators: '',
    mainGoal: 'pagar menos com segurança'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to CRM
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get AI Diagnostic
    const result = await getSmartDiagnostic({
      profession: formData.profession,
      revenue: formData.estimatedRevenue,
      sources: formData.incomeSources
    });
    
    setDiagnostic(result);
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-bold text-indigo-950">Diagnóstico Solicitado!</h3>
          <p className="text-slate-500">João entrará em contato em breve. Confira abaixo sua análise preliminar via RUMO-AI.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 mb-8">
          <div className="flex items-center gap-2 mb-4 text-indigo-900 font-bold">
            <Sparkles size={18} />
            <span>RUMO-AI Insight</span>
          </div>
          <p className="text-indigo-950 leading-relaxed italic">
            "{diagnostic}"
          </p>
        </div>
        
        <button 
          onClick={() => setSubmitted(false)}
          className="w-full py-4 text-slate-500 font-medium hover:text-indigo-900 transition-colors"
        >
          Fazer outra análise
        </button>
      </div>
    );
  }

  return (
    <section id="triagem" className="py-24 px-4 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 mb-4">Inicie seu diagnóstico agora.</h2>
          <p className="text-slate-600">Preencha os dados abaixo para receber uma análise preliminar e acelerar sua reunião com o João.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-lg">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Nome Completo</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">E-mail Profissional</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Sua Profissão</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.profession}
              onChange={e => setFormData({...formData, profession: e.target.value as any})}
            >
              <option value="médico">Médico(a)</option>
              <option value="dentista">Dentista</option>
              <option value="outros">Outros profissionais da saúde</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Atuação Atual</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.currentRegime}
              onChange={e => setFormData({...formData, currentRegime: e.target.value as any})}
            >
              <option value="PF">Pessoa Física (Autônomo)</option>
              <option value="PJ">Pessoa Jurídica (Empresa)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Faturamento Mensal Médio (R$)</label>
            <input 
              required
              placeholder="Ex: 25000"
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.estimatedRevenue}
              onChange={e => setFormData({...formData, estimatedRevenue: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Nº de Colaboradores</label>
            <input 
              placeholder="Ex: 2"
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.numCollaborators}
              onChange={e => setFormData({...formData, numCollaborators: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Cidade</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.city}
              onChange={e => setFormData({...formData, city: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Telefone / WhatsApp</label>
            <input 
              required
              placeholder="(31) 9...."
              type="tel" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-indigo-950">Principais fontes de renda (Consultório, Plantões, etc.)</label>
            <textarea 
              required
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-900/20 bg-white"
              value={formData.incomeSources}
              onChange={e => setFormData({...formData, incomeSources: e.target.value})}
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
                  Gerando Diagnóstico...
                </>
              ) : (
                <>
                  Solicitar Análise & Diagnóstico
                  <Sparkles size={20} />
                </>
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
