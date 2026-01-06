<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  type ChartData,
  type ChartOptions
} from 'chart.js'

interface EmocionesPorActo {
  acto: string | number
  emociones: Record<string, number> 
}

const props = defineProps<{
  data: EmocionesPorActo[]
}>()

const palette = [
  '#f472b6', // Pink
  '#fbbf24', // Amber
  '#34d399', // Emerald
  '#60a5fa', // Blue
  '#a78bfa', // Violet
  '#f87171', // Red
  '#2dd4bf'  // Teal
]

const chartData = computed<ChartData<'bar'>>(() => {
  const labels = props.data.map(d => `Acto ${d.acto}`)

  const allEmotions = new Set<string>()
  props.data.forEach(item => {
    Object.keys(item.emociones).forEach(emo => allEmotions.add(emo))
  })
  const emotionList = Array.from(allEmotions)

  const datasets = emotionList.map((emotionName, index) => {
    const dataValues = props.data.map(item => item.emociones[emotionName] || 0)

    return {
      label: emotionName,
      data: dataValues,
      backgroundColor: palette[index % palette.length],
      borderRadius: 4,
      borderSkipped: false, 
      barThickness: 40
    }
  })

  return { labels, datasets }
})

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { usePointStyle: true, boxWidth: 8 }
    },
    tooltip: {
      mode: 'index',
      intersect: false, 
      callbacks: {
        footer: (tooltipItems) => {
          const total = tooltipItems.reduce((a, e) => a + (e.raw as number), 0)
          return 'Total Intensidad: ' + total
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      border: { display: false }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      grid: { color: '#f1f5f9' },
      border: { display: false }
    }
  }
}
</script>

<template>
  <div class="relative h-64 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>