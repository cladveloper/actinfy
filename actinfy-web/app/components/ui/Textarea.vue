<template>
    <textarea class="w-full border border-black/30 h-48 focus:outline-none focus:border-black placeholder text-sm p-3" v-model="model" :placeholder="placeholder"/>
</template>

<script setup lang="ts">
interface Props{
    placeholder: string;
}

const model = defineModel<string>();

defineProps<Props>();
</script>