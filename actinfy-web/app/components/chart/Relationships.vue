<script setup lang="ts">
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import type { Relacion } from '~/types';

const props = defineProps<{
  relaciones: Relacion[]
}>()

const colors = ['#e11d48', '#d97706', '#059669', '#7c3aed', '#0891b2']

const chartData = computed<ChartData<'line'>>(() => {
  const allLocations = new Set<string>()
  props.relaciones?.forEach(rel => 
    rel?.arco_emocional?.forEach(arco => allLocations.add(arco.ubicacion))
  )
  const labels = Array.from(allLocations)

  const datasets = props.relaciones?.map((rel, index) => {
    const dataMap = new Map(rel?.arco_emocional?.map(i => [i.ubicacion, i.valor]))
    
    const alignedData = labels?.map(label => dataMap.get(label) || null)
    const color = colors[index % colors.length]

    return {
      label: rel.nombre_otro,
      data: alignedData as number[],
      borderColor: color,
      backgroundColor: color,
      borderWidth: 2,
      tension: 0.4,
      spanGaps: true,
      pointRadius: 3
    }
  })

  return { labels, datasets }
})

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { min: -1.1, max: 1.1 } },
  interaction: { mode: 'index', intersect: false }
}
</script>

<template>
  <div class="relative h-72 w-full">
    <Line :data="chartData" :options="options" />
  </div>
</template>