<script lang="ts" setup>
interface Props{
    loading: boolean;
    error?: any;
}

const props = defineProps<Props>();

const state = reactive({
    character: '',
    related: '',
    text: ''
});

const emit = defineEmits(['submit'])
</script>

<template>        
    <form @submit.prevent="emit('submit', state)" id="inputSection" class="border p-12 border-black">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ui-form-field label="Tu personaje principal">
                <ui-input placeholder="Ej: Hamlet" v-model.trim="state.character"/>
            </ui-form-field>
            <ui-form-field label="Personajes relacionados" help="Puedes separar los personajes por coma.">
                <ui-input placeholder="Ej: Ofelia, Claudio, Gertrudis" v-model.trim="state.related"/>
            </ui-form-field>
        </div>

        <ui-form-field label="Texto de la obra" help="Formato recomendado: ACTO X, ESCENA y, NOMBRE: Diálogo" clue="Soporta +40.000 palabras.">
            <ui-textarea placeholder="Pega aquí el texto completo... [ACTO 1] ESCENA 1" v-model="state.text"/>
        </ui-form-field>

        <UiButton type="submit">Iniciar análisis profundo</UiButton>
    </form>

    <div v-if="loading" class="fixed inset-0 w-screen h-screen z-50 bg-white/80 flex items-center justify-center">
        <div class="flex flex-col items-center justify-center py-20 animate-fade-in">
            <Icon name="svg-spinners:pulse-ring" class="text-9xl mb-8"/>
            <h3 class="text-2xl font-bold text-slate-800 mb-2">Leyendo la obra...</h3>
            <p class="text-slate-500 text-center max-w-md">La IA está procesando el viaje emocional, las relaciones y la estructura dramática. Esto puede tomar unos minutos.</p>
        </div>
    </div>

    <div id="errorMessage" v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg shadow-sm" role="alert">
        <p class="font-bold text-red-700">Ocurrió un error</p>
        <p id="errorText" class="text-red-600 text-sm"></p>
    </div>
</template>