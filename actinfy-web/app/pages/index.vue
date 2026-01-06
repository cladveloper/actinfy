<script setup lang="ts">
const { loading, error, results, analyze } = useAnalysis();

const handleAnalyze = async (formData: any) => {
  loading.value = true;
  try{
    await analyze(formData);
    if(!error.value) navigateTo(`/${results.value?.id}`);
  } catch(e){} finally{
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-3xl mx-auto pt-14">
    <header class="py-12 text-center relative">
      <h1 class="text-2xl mb-1.5 font-black">Analizar dramaturgia</h1>
      <p class="text-black/60">Obtén un análisis completo llenando el formulario.</p>
    </header>
    <UiAnalysisInputSection 
      @submit="handleAnalyze"

      :loading="loading"
      :error="error"
    />

    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-slate-500">Analizando dramaturgia...</p>
    </div>

  </div>
</template>