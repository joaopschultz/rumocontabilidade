
export type ProfessionalType = 'médico' | 'dentista' | 'outros';
export type TaxRegime = 'PF' | 'PJ';

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  profession: ProfessionalType;
  city: string;
  currentRegime: TaxRegime;
  estimatedRevenue: string;
  incomeSources: string;
  numCollaborators: string;
  mainGoal: string;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
