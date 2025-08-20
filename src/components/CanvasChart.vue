<template>
  <div class="canvas-chart-container">
    <canvas
      ref="canvasRef"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="{ width: width + 'px', height: height + 'px' }"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

interface ChartData {
  label: string
  value: number
  color?: string
}

interface ChartOptions {
  title?: string
  showGrid?: boolean
  showAxis?: boolean
  showLabels?: boolean
  colors?: string[]
  padding?: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

interface Props {
  type: 'line' | 'bar'
  data: ChartData[]
  width?: number
  height?: number
  options?: ChartOptions
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 300,
  options: () => ({
    title: '',
    showGrid: true,
    showAxis: true,
    showLabels: true,
    colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
    padding: {
      top: 40,
      right: 20,
      bottom: 60,
      left: 60
    }
  })
})

const canvasRef = ref<HTMLCanvasElement>()
const canvasWidth = ref(props.width * 2) // 高DPI支持
const canvasHeight = ref(props.height * 2)

let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  initCanvas()
  drawChart()
})

watch(() => props.data, () => {
  nextTick(() => {
    drawChart()
  })
}, { deep: true })

watch(() => props.type, () => {
  nextTick(() => {
    drawChart()
  })
})

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  ctx = canvas.getContext('2d')
  if (!ctx) return
  
  // 高DPI支持
  ctx.scale(2, 2)
  ctx.imageSmoothingEnabled = true
}

function drawChart() {
  if (!ctx || !props.data.length) return
  
  // 清空画布
  ctx.clearRect(0, 0, props.width, props.height)
  
  const padding = props.options?.padding || { top: 40, right: 20, bottom: 60, left: 60 }
  const chartWidth = props.width - padding.left - padding.right
  const chartHeight = props.height - padding.top - padding.bottom
  
  // 绘制标题
  if (props.options?.title) {
    drawTitle(props.options.title)
  }
  
  // 绘制坐标轴
  if (props.options?.showAxis) {
    drawAxis(padding, chartWidth, chartHeight)
  }
  
  // 绘制网格
  if (props.options?.showGrid) {
    drawGrid(padding, chartWidth, chartHeight)
  }
  
  // 绘制图表
  if (props.type === 'line') {
    drawLineChart(padding, chartWidth, chartHeight)
  } else if (props.type === 'bar') {
    drawBarChart(padding, chartWidth, chartHeight)
  }
  
  // 绘制标签
  if (props.options?.showLabels) {
    drawLabels(padding, chartWidth, chartHeight)
  }
}

function drawTitle(title: string) {
  if (!ctx) return
  
  ctx.save()
  ctx.font = '16px Arial'
  ctx.fillStyle = '#333'
  ctx.textAlign = 'center'
  ctx.fillText(title, props.width / 2, 25)
  ctx.restore()
}

function drawAxis(padding: any, chartWidth: number, chartHeight: number) {
  if (!ctx) return
  
  ctx.save()
  ctx.strokeStyle = '#666'
  ctx.lineWidth = 1
  
  // Y轴
  ctx.beginPath()
  ctx.moveTo(padding.left, padding.top)
  ctx.lineTo(padding.left, padding.top + chartHeight)
  ctx.stroke()
  
  // X轴
  ctx.beginPath()
  ctx.moveTo(padding.left, padding.top + chartHeight)
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
  ctx.stroke()
  
  ctx.restore()
}

function drawGrid(padding: any, chartWidth: number, chartHeight: number) {
  if (!ctx) return
  
  ctx.save()
  ctx.strokeStyle = '#e5e5e5'
  ctx.lineWidth = 0.5
  
  const gridLines = 5
  
  // 水平网格线
  for (let i = 0; i <= gridLines; i++) {
    const y = padding.top + (chartHeight / gridLines) * i
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(padding.left + chartWidth, y)
    ctx.stroke()
  }
  
  // 垂直网格线
  const dataLength = props.data.length
  for (let i = 0; i <= dataLength; i++) {
    const x = padding.left + (chartWidth / dataLength) * i
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x, padding.top + chartHeight)
    ctx.stroke()
  }
  
  ctx.restore()
}

function drawLineChart(padding: any, chartWidth: number, chartHeight: number) {
  if (!ctx || !props.data.length) return
  
  const maxValue = Math.max(...props.data.map(d => d.value))
  const minValue = Math.min(...props.data.map(d => d.value))
  const valueRange = maxValue - minValue || 1
  
  ctx.save()
  ctx.strokeStyle = props.options?.colors?.[0] || '#3b82f6'
  ctx.fillStyle = props.options?.colors?.[0] || '#3b82f6'
  ctx.lineWidth = 2
  
  // 绘制折线
  ctx.beginPath()
  props.data.forEach((item, index) => {
    const x = padding.left + (chartWidth / (props.data.length - 1)) * index
    const y = padding.top + chartHeight - ((item.value - minValue) / valueRange) * chartHeight
    
    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
  
  // 绘制数据点
  props.data.forEach((item, index) => {
    const x = padding.left + (chartWidth / (props.data.length - 1)) * index
    const y = padding.top + chartHeight - ((item.value - minValue) / valueRange) * chartHeight
    
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
  })
  
  ctx.restore()
}

function drawBarChart(padding: any, chartWidth: number, chartHeight: number) {
  if (!ctx || !props.data.length) return
  
  const maxValue = Math.max(...props.data.map(d => d.value))
  const barWidth = chartWidth / props.data.length * 0.8
  const barSpacing = chartWidth / props.data.length * 0.2
  
  ctx.save()
  
  props.data.forEach((item, index) => {
    const color = item.color || props.options?.colors?.[index % (props.options?.colors?.length || 1)] || '#3b82f6'
    const barHeight = (item.value / maxValue) * chartHeight
    const x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2
    const y = padding.top + chartHeight - barHeight
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth, barHeight)
    
    // 绘制数值标签
    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5)
  })
  
  ctx.restore()
}

function drawLabels(padding: any, chartWidth: number, chartHeight: number) {
  if (!ctx) return
  
  ctx.save()
  ctx.fillStyle = '#666'
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  
  // X轴标签
  props.data.forEach((item, index) => {
    let x: number
    if (props.type === 'line') {
      x = padding.left + (chartWidth / (props.data.length - 1)) * index
    } else {
      const barWidth = chartWidth / props.data.length * 0.8
      const barSpacing = chartWidth / props.data.length * 0.2
      x = padding.left + index * (barWidth + barSpacing) + barSpacing / 2 + barWidth / 2
    }
    const y = padding.top + chartHeight + 20
    ctx.fillText(item.label, x, y)
  })
  
  // Y轴标签
  const maxValue = Math.max(...props.data.map(d => d.value))
  const gridLines = 5
  ctx.textAlign = 'right'
  
  for (let i = 0; i <= gridLines; i++) {
    const value = (maxValue / gridLines) * i
    const y = padding.top + chartHeight - (chartHeight / gridLines) * i + 4
    ctx.fillText(Math.round(value).toString(), padding.left - 10, y)
  }
  
  ctx.restore()
}

// 触摸事件处理（用于移动端交互）
function handleTouchStart(event: TouchEvent) {
  event.preventDefault()
}

function handleTouchMove(event: TouchEvent) {
  event.preventDefault()
}

function handleTouchEnd(event: TouchEvent) {
  event.preventDefault()
}
</script>

<style scoped>
.canvas-chart-container {
  display: inline-block;
  position: relative;
}

canvas {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
</style>