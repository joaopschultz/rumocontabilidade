
import { GoogleGenAI, Type } from "@google/genai";

export async function getSmartDiagnostic(data: {
  profession: string;
  revenue: string;
  sources: string;
}) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Aja como um consultor contábil especialista para a área da saúde no Brasil. 
    Analise o seguinte perfil e dê um feedback breve e encorajador sobre por que uma contabilidade especializada (como a RUMO) é essencial:
    Profissão: ${data.profession}
    Faturamento Estimado: R$ ${data.revenue}
    Fontes de Renda: ${data.sources}

    Destaque:
    1. O potencial de economia ao migrar de PF para PJ (se aplicável).
    2. A importância da organização de recibos e notas.
    3. Como isso libera tempo para o profissional.
    Mantenha o tom profissional, boutique e focado em gestão. Máximo 150 palavras.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    return response.text || "Não foi possível gerar o diagnóstico no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao processar seu diagnóstico. Entre em contato conosco diretamente.";
  }
}
