import type { AnalysisResponse } from '~/types';

export const useAnalysis = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const results = ref<AnalysisResponse | null>(null);
  
  const config = useRuntimeConfig();

  const analyze = async (form: { character: string; related: string; text: string }) => {
    loading.value = true;
    error.value = null;
    
    try {
      const data = await $fetch<AnalysisResponse>(`${config.public.apiBase}/api/create`, {
        method: 'POST',
        body: {
          characterName: form.character,
          relatedCharacters: form.related,
          playText: form.text
        }
      });
      results.value = data;
    } catch (e: any) {
      error.value = e.message || "Error al conectar con el servidor";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getById = async (id: string) => {
    loading.value = true;
    error.value = null;
    
    try {
      const data = await $fetch<AnalysisResponse>(`${config.public.apiBase}/api/${id}`, {
        method: 'GET',
      });
      results.value = data;
    } catch (e: any) {
      error.value = e.message || "Error al conectar con el servidor";
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, results, analyze, getById };
};