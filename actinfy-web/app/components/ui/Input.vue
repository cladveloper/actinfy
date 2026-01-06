<template>
    <input class="w-full border border-black/30 h-10 focus:outline-none focus:border-black placeholder text-sm px-3" v-model="model" :placeholder="placeholder"/>
</template>

<script setup lang="ts">
interface Props{
    placeholder: string;
}

const model = defineModel<string>();

defineProps<Props>();
</script>