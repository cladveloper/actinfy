<template>
    <div class="pt-14 pb-14">
        <header class="fixed top-14 w-full border-b border-black h-10 bg-white px-6">
            <NuxtLink :to="`/${id}`" class="flex items-center h-full underline">
                <Icon name="solar:arrow-left-linear"/>
                <span>Volver</span>
            </NuxtLink>
        </header>
        <div class="w-screen h-screen flex items-center justify-center" v-if="loading">
            <div class="flex items-center flex-col">
                <Icon name="svg-spinners:pulse-ring" class="text-4xl mb-4"/>
                <p>Trayendo texto...</p>
            </div>
        </div>
        <div class="w-screen h-screen flex items-center justify-center" v-else-if="error">
            <div class="flex items-center flex-col">
                <Icon name="solar:skateboarding-round-broken" class="text-6xl mb-4"/>
                <p class="text-center max-w-sm">Ocurrió un error al cargar la web. El documento se pudo haber eliminado.</p>
            </div>
        </div>
        <div class="w-full px-6 pb-6 pt-16" v-else>
            <pre class="mb-4">{{ results?.body.playText }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
const { params: {id} } = useRoute();
const { loading, error, results, getById } = useAnalysis();
onMounted(async () => {
    await getById(id as string)
})
</script>