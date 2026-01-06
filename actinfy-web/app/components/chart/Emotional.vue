<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  type ChartData,
  type ChartOptions
} from 'chart.js'

const props = defineProps<{
  data: Array<{ ubicacion: string; polaridad: number }>
}>()

const chartData = computed<ChartData<'line'>>(() => {
  return {
    labels: props.data?.map(v => v.ubicacion),
    datasets: [
      {
        label: 'Estado Emocional',
        data: props.data?.map(v => v.polaridad),
        borderColor: '#000',
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }
})

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: -1.2,
      max: 1.2,
      ticks: { callback: (value) => (value === 0 ? 'Neutro' : value) }
    },
    x: { grid: { display: false } }
  },
  plugins: { legend: { display: false } }
}
</script>

<template>
  <div class="relative h-80 w-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>