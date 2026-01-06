<script setup lang="ts">
interface Props{
    title: string;
    sticky?: boolean
}

const props = defineProps<Props>();
</script>

<template>
    <div class="border border-black relative">
        <header class="p-4 border-b border-black bg-white z-40" :class="sticky ? 'sticky top-14' : ''">
            <h2 class="font-black text-lg">{{ title }}</h2>
        </header>
        <div class="p-6">
            <slot/>
        </div>
    </div>
</template>