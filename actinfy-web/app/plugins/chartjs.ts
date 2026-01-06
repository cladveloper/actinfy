// plugins/chartjs.ts
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler // Importante para el área sombreada (fill: true)
} from 'chart.js'

export default defineNuxtPlugin(() => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
  )
  
  // Configuración global estética (tu "Look & Feel" oscuro/inter)
  ChartJS.defaults.font.family = "'Inter', sans-serif"
  ChartJS.defaults.color = '#64748b'
  ChartJS.defaults.scale.grid.color = '#f1f5f9'
  ChartJS.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.9)'
  ChartJS.defaults.plugins.tooltip.padding = 12
  ChartJS.defaults.plugins.tooltip.cornerRadius = 8
})