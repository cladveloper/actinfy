export interface AnalyzeRequest {
  characterName: string;
  relatedCharacters: string;
  playText: string;
}

// Aquí irían las interfaces completas de la respuesta (AnalysisResponse, etc.)
// simplificado para el ejemplo:

export interface Relacion {
  nombre_otro: string;
  arco_emocional: Array<{ ubicacion: string; valor: number }> | undefined;
  resumen_score: number;
  explicacion_score: string;
}

export interface AnalysisResponse {
  id: string;
  analisis_personaje: any;
  analisis_barrientos: any;
  relaciones: Relacion[];
  analisis_global: any;
  analisis_barrientos: any;
  body: any;
}