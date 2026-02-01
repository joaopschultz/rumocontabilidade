
import React from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  FileText, 
  Calendar, 
  CheckCircle2,
  Users
} from 'lucide-react';

export const COLORS = {
  primary: 'text-indigo-900',
  accent: 'bg-emerald-500',
  secondary: 'bg-slate-900',
};

export const FEATURES = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    title: "Clareza Tributária",
    description: "Análise profunda PF x PJ para garantir que você não pague um centavo a mais de imposto."
  },
  {
    icon: <Clock className="w-6 h-6 text-emerald-500" />,
    title: "Atendimento Ágil",
    description: "Sem burocracia. Respostas rápidas e objetivas para que você foque nos seus pacientes."
  },
  {
    icon: <FileText className="w-6 h-6 text-emerald-500" />,
    title: "Conformidade LGPD",
    description: "Proteção total de dados sensíveis, essencial para a rotina de profissionais de saúde."
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-500" />,
    title: "Visão de Gestor",
    description: "Não somos apenas contadores. Pensamos como parceiros estratégicos do seu negócio."
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Diagnóstico Rápido",
    description: "Analisamos sua situação atual de faturamento e fontes de renda."
  },
  {
    number: "02",
    title: "Plano de Rumo",
    description: "Apresentamos o melhor caminho tributário e organizamos sua documentação."
  },
  {
    number: "03",
    title: "Gestão Contínua",
    description: "Assumimos a rotina fiscal e contábil com entregas mensais previsíveis."
  }
];
