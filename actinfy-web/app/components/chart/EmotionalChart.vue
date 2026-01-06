<script setup lang="ts">
import { Chart } from 'chart.js/auto';

const props = defineProps<{ data: any[] }>();
const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  if (!canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  if(!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(79, 70, 229, 0.5)');
  gradient.addColorStop(1, 'rgba(79, 70, 229, 0.0)');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map(v => v.ubicacion),
      datasets: [{
        label: 'Polaridad Emocional',
        data: props.data.map(v => v.polaridad),
        borderColor: '#4f46e5',
        backgroundColor: gradient,
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
});

onUnmounted(() => {
  if (chartInstance) chartInstance.destroy();
});
</script>

<template>
  <div class="relative h-80 w-full">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>