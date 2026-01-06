export interface AnalyzeRequest {
  characterName: string;
  relatedCharacters: string;
  playText: string;
}

// Aquí irían las interfaces completas de la respuesta (AnalysisResponse, etc.)
// simplificado para el ejemplo:
export interface AnalysisResponse {
  analisis_personaje: any;
  relaciones: any[];
  analisis_global: any;
  analisis_barrientos: any;
}