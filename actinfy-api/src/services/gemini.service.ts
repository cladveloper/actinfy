import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/env';
import { SYSTEM_PROMPT } from '../prompts/system.prompt';
import { AnalyzeRequest, AnalysisResponse } from '../types';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", // Usamos 1.5 Pro por contexto
    generationConfig: { responseMimeType: "application/json" }
});

export const analyzePlayScript = async (data: AnalyzeRequest): Promise<AnalysisResponse> => {
    const userPrompt = `
    PERSONAJE PRINCIPAL A ANALIZAR: "${data.characterName}"
    PERSONAJES RELACIONADOS: "${data.relatedCharacters}"
    TEXTO COMPLETO DE LA OBRA:
    ${data.playText}
    `;

    try {
        const result = await model.generateContent([SYSTEM_PROMPT, userPrompt]);
        const response = await result.response;
        const text = response.text();
        
        // Limpieza y parseo
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '');
        return JSON.parse(cleanedText) as AnalysisResponse;
    } catch (error) {
        console.error("Gemini Service Error:", error);
        throw new Error("Falló el análisis de la IA");
    }
};