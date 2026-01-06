<template>
    <div class="mb-6">
        <label class="text-sm block mb-1.5">{{ label }}</label>
        <slot/>
        <div class="flex items-center">
            <p class="text-black/50 text-xs font-black text-right mt-0.5">{{ clue }}</p>
            <p class="text-black/50 text-xs font-black text-right mt-0.5 ml-auto">{{ help }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props{
    label: string,
    help?: string,
    clue?: string
}

const props = defineProps<Props>();
</script>