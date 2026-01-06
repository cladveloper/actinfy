<template>
    <UiAside
        :loading="loading || error ? true : false"

        :id="`${results?.id}`"
        :characterName="results?.body?.characterName"
        :relatedCharacters="results?.body?.relatedCharacters?.split(',')?.map((name: string) => name.trim())"
    />
    <div class="w-screen h-screen flex items-center justify-center" v-if="loading">
        <div class="pl-[300px] flex items-center flex-col">
            <Icon name="svg-spinners:pulse-ring" class="text-4xl mb-4"/>
            <p>Generando resultados...</p>
        </div>
    </div>
    <div class="w-screen h-screen flex items-center justify-center" v-else-if="error">
        <div class="pl-[300px] flex items-center flex-col">
            <Icon name="solar:skateboarding-round-broken" class="text-6xl mb-4"/>
            <p class="text-center max-w-sm">Ocurrió un error al cargar la web. El documento se pudo haber eliminado.</p>
        </div>
    </div>
    <div class="pt-14 pl-72 pb-12" v-else>
        <div class="p-6 space-y-6">
            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-8">
                    <UiCard title="Viaje emocional" sticky>
                        <ChartEmotional v-if="results" :data="results?.analisis_personaje?.viaje_emocional" />
                    </UiCard>
                </div>
                <UiCard title="Estructura" class="col-span-4 max-h-full overflow-hidden">
                    <div class="-m-6 max-h-[370px] p-6 overflow-y-auto">
                        <div v-for="result in results?.analisis_global.resumen_estructural" class="mb-9 border-b border-black pb-3">
                            <p class="bg-orange-400 inline p-1.5 font-black">{{ result.escena }}</p>
                            <p class="pt-1.5">{{ result.descripcion }}</p>
                            <ul class="text-black/50 text-sm mb-1.5 mt-3">
                                <li v-if="result.personajes">Personajes: {{ result.personajes.join(', ') }}</li>
                                <li v-if="result.lugar">Lugar: {{ result.lugar }}</li>
                            </ul>
                        </div>
                    </div>
                </UiCard>
            </div>

            <UiCard :title="`Cambios drásticos (${results?.analisis_personaje?.cambios_drasticos?.length})`" sticky>
                <div class="grid grid-cols-3 -m-6">
                    <div class="border-black border-r border-b p-6 -mr-px -mb-px" v-for="result in results?.analisis_personaje?.cambios_drasticos">
                        <div class="py-1 px-3 font-black bg-red-400 inline">{{ result.ubicacion }}</div>
                        <div class="text-black/50 pt-3 mb-3 text-sm">
                            <p class="font-black">ANTES ({{ result.emocion_detectada_antes }})</p>
                            <p>{{ result.snippet_antes }}</p>
                        </div>
                        <div class="mb-6 text-sm">
                            <p class="font-black">DESPUÉS ({{ result.emocion_detectada_despues }})</p>
                            <p>{{ result.snippet_despues }}</p>
                        </div>
                        <p class="text-xs bg-black/5 p-1.5">💡 {{ result.explicacion }}</p>
                    </div>
                </div>
            </UiCard>

            <div class="grid grid-cols-2 gap-6">
                <UiCard title="Arco de relaciones">
                    <ChartRelationships v-if="results" :relaciones="results?.relaciones || []" />
                </UiCard>
                <UiCard title="Resumen de vínculo" sticky>
                    <table class="text-sm -m-6">
                        <thead class="bg-black text-white text-center">
                            <tr>
                                <th class="py-4 px-2">Personaje</th>
                                <th class="py-4 px-2">Afinidad</th>
                                <th class="py-4 px-2 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-black" v-for="relacion in results?.relaciones">
                                <td class="text-center py-2 px-4">{{ relacion.nombre_otro }}</td>
                                <td class="py-2 px-4">
                                    <p class="flex justify-center">
                                        <span class="px-2" :class="relacion.resumen_score > 0 ? 'bg-green-200 text-green-700 ' : 'bg-red-200 text-red-700'">{{ relacion.resumen_score }}</span>
                                    </p>
                                </td>
                                <td class="py-4 px-2">{{ relacion.explicacion_score }}</td>
                            </tr>
                        </tbody>
                    </table>
                </UiCard>
            </div>

            <div class="grid grid-cols-12 gap-6">
                <div class="col-span-4">
                    <UiCard title="Emociones Predominantes">
                        <ChartEmotionsStack
                            v-if="results"
                            :data="results?.analisis_global?.emociones_por_acto"
                        />
                    </UiCard>
                </div>
                <div class="col-span-8 bg-indigo-900 text-white">
                    <header class="p-4 border-b bg-indigo-950 border-wite z-40 sticky top-14">
                        <h2 class="font-black text-lg">Análisis teórico Barrientos</h2>
                    </header>
                    <div class="p-6 space-y-6">
                        <div class="flex space-x-3">
                            <div class="pt-0.5">
                                <Icon name="solar:clock-circle-outline"/>
                            </div>
                            <div>
                                <h3 class="font-black mb-1.5 uppercase">Tiempo</h3>
                                <ul class="space-y-3">
                                    <li v-if="results?.analisis_barrientos?.tiempo?.orden"><b class="font-black">Orden: </b><span class="opacity-80">{{ results?.analisis_barrientos?.tiempo?.orden }}</span></li>
                                    <li v-if="results?.analisis_barrientos?.tiempo?.duracion"><b class="font-black">Duración: </b><span class="opacity-80">{{ results?.analisis_barrientos?.tiempo?.duracion }}</span></li>
                                    <li v-if="results?.analisis_barrientos?.tiempo?.frecuencia"><b class="font-black">Frecuencia</b> <span class="opacity-80">{{ results?.analisis_barrientos?.tiempo?.frecuencia }}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div v-if="results?.analisis_barrientos?.espacio">
                            <div class="flex space-x-3">
                                <div class="pt-0.5">
                                    <Icon name="solar:buildings-outline"/>
                                </div>
                                <div>
                                    <h3 class="font-black mb-1.5 uppercase">Espacio</h3>
                                    <p class="opacity-80">{{ results?.analisis_barrientos?.espacio }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="results?.analisis_barrientos?.recursos_multimodales">
                            <div class="flex space-x-3">
                                <div class="pt-0.5">
                                    <Icon name="solar:lightning-outline"/>
                                </div>
                                <div>
                                    <h3 class="font-black mb-1.5 uppercase">Recursos multimodales</h3>
                                    <p class="opacity-80">{{ results?.analisis_barrientos?.recursos_multimodales }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="results?.analisis_barrientos?.personaje_tecnica">
                            <div class="flex space-x-3">
                                <div class="pt-0.5">
                                    <Icon name="solar:user-circle-outline"/>
                                </div>
                                <div>
                                    <h3 class="font-black mb-1.5 uppercase">Construcción de personaje</h3>
                                    <p class="opacity-80">{{ results?.analisis_barrientos?.personaje_tecnica }}</p>
                                </div>
                            </div>
                        </div>
                        <!--<div v-for="i in 4" class="text-sm text-white/80">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt velit voluptas enim, dicta odit placeat rerum nam temporibus iure, ratione pariatur rem quam modi vel quaerat dolorum eveniet deleniti nemo.</div>-->
                    </div>
                </div>
            </div>

            <UiCard title="Desglose de acciones por escena">
                <div class="-m-6">
                    <div class="border-b border-black p-6" v-for="accion in results?.analisis_personaje.acciones">
                        <h3 class="font-black">Acto {{ accion.acto }}</h3>
                        <p class="text-black/60 text-sm mb-3">{{ accion.resumen_acto }}</p>
                        <ul v-for="escena in accion.escenas">
                            <li class="p-3 flex space-x-6 border-b border-black" :class="escena.presencia ? 'bg-black/5' : 'bg-yellow-100'">
                                <span>{{ escena.escena }}</span>
                                <span class="flex-1">{{ escena.accion }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </UiCard>
        </div>
    </div>
</template>

<script setup lang="ts">
const { params: {id} } = useRoute();
const { loading, error, results, getById } = useAnalysis();
onMounted(async () => {
    try{
        await getById(id as string);
    } catch(e){
        
    }
})
</script>