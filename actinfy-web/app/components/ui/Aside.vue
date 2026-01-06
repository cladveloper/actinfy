<script setup lang="ts">
interface Props{
    id: string;
    characterName: string;
    relatedCharacters: string[];
    loading: boolean;
}

const props = defineProps<Props>();

const copiarEnlace = async (url: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(url);
    message.value = 'Enlace copiado al portapapeles';
  } catch (err) {
    message.value = 'Error al copiar';
  } finally{
    setTimeout(() => {
        message.value = '';
    }, 2000)
  }
};

const message = ref('');
</script>

<template>
    <aside v-if="loading" class="fixed h-screen inset-0 w-72 border-r border-black pt-14 flex flex-col bg-white"></aside>
    <aside v-else class="fixed h-screen inset-0 w-72 border-r border-black pt-14 flex flex-col bg-white">
        <h2 class="px-4 pt-4 font-black">Datos analizados</h2>
        <form class="p-4">
            <UiFormField label="Nombre personaje a interpretar">
                <div class="flex items-center h-10 bg-black/10 px-3">{{ characterName }}</div>
            </UiFormField>

            <UiFormField label="Personajes relacionados">
                <div class="flex items-center h-10 border-b border-black/50" v-for="name in relatedCharacters">{{ name }}</div>
            </UiFormField>

            <UiFormField label="Texto de la obra">
                <NuxtLink :to="`/${id}/text`" class="underline p-0.5 hover:bg-black hover:text-white inline-flex items-center">
                    <Icon name="solar:document-text-outline" class="mr-1.5"/>
                    <span class="text-sm">Ver texto</span>
                </NuxtLink>
            </UiFormField>
        </form>

        <div class="border-t border-black p-4">
            <h2 class="font-black mb-6">Acciones</h2>
            <UiFormField label="Link para compartir">
                <div class="flex items-center h-8 bg-black/10 px-1.5 text-xs overflow-hidden text-ellipsis">https://actinfy.web.app/{{ id }}</div>
                <button class="text-white bg-black/60 hover:bg-black h-8 w-full flex items-center justify-center text-xs" @click="copiarEnlace(`https://actinfy.web.app/${id}`)">
                    <span class="mr-1.5">Copiar</span>
                    <Icon name="solar:copy-outline"/>
                </button>
                <p class="uppercase font-black text-sm pt-3 text-center text-black/60">{{ message }}</p>
            </UiFormField>

        </div>
        <div class="mt-auto mb-14 p-2">
            <NuxtLink to="/">
                <UiButton>Analizar otro texto</UiButton>
            </NuxtLink>
        </div>
    </aside>
</template>