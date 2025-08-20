<template>
  <div class="chart-demo">
    <h1>Canvas 图表组件演示</h1>
    
    <div class="demo-section">
      <h2>折线图</h2>
      <div class="chart-container">
        <CanvasChart
          type="line"
          :data="lineChartData"
          :width="400"
          :height="300"
          :options="lineChartOptions"
        />
      </div>
      
      <div class="controls">
        <button @click="updateLineData">更新数据</button>
        <button @click="addLineDataPoint">添加数据点</button>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>柱状图</h2>
      <div class="chart-container">
        <CanvasChart
          type="bar"
          :data="barChartData"
          :width="400"
          :height="300"
          :options="barChartOptions"
        />
      </div>
      
      <div class="controls">
        <button @click="updateBarData">更新数据</button>
        <button @click="addBarDataPoint">添加数据点</button>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>自定义样式图表</h2>
      <div class="chart-container">
        <CanvasChart
          type="bar"
          :data="customChartData"
          :width="500"
          :height="350"
          :options="customChartOptions"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CanvasChart from '@/components/CanvasChart.vue'

// 折线图数据
const lineChartData = ref([
  { label: '1月', value: 120 },
  { label: '2月', value: 200 },
  { label: '3月', value: 150 },
  { label: '4月', value: 300 },
  { label: '5月', value: 250 },
  { label: '6月', value: 400 }
])

const lineChartOptions = reactive({
  title: '月度销售趋势',
  showGrid: true,
  showAxis: true,
  showLabels: true,
  colors: ['#3b82f6'],
  padding: {
    top: 50,
    right: 30,
    bottom: 70,
    left: 70
  }
})

// 柱状图数据
const barChartData = ref([
  { label: '产品A', value: 85, color: '#3b82f6' },
  { label: '产品B', value: 120, color: '#ef4444' },
  { label: '产品C', value: 95, color: '#10b981' },
  { label: '产品D', value: 160, color: '#f59e0b' },
  { label: '产品E', value: 75, color: '#8b5cf6' }
])

const barChartOptions = reactive({
  title: '产品销量对比',
  showGrid: true,
  showAxis: true,
  showLabels: true,
  colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
  padding: {
    top: 50,
    right: 30,
    bottom: 70,
    left: 70
  }
})

// 自定义样式图表数据
const customChartData = ref([
  { label: 'Q1', value: 2500, color: '#ff6b6b' },
  { label: 'Q2', value: 3200, color: '#4ecdc4' },
  { label: 'Q3', value: 2800, color: '#45b7d1' },
  { label: 'Q4', value: 3800, color: '#96ceb4' }
])

const customChartOptions = reactive({
  title: '季度营收统计（万元）',
  showGrid: true,
  showAxis: true,
  showLabels: true,
  colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
  padding: {
    top: 60,
    right: 40,
    bottom: 80,
    left: 80
  }
})

// 更新折线图数据
function updateLineData() {
  lineChartData.value = lineChartData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 400) + 50
  }))
}

// 添加折线图数据点
function addLineDataPoint() {
  const months = ['7月', '8月', '9月', '10月', '11月', '12月']
  const currentLength = lineChartData.value.length
  
  if (currentLength < 12) {
    lineChartData.value.push({
      label: months[currentLength - 6] || `${currentLength + 1}月`,
      value: Math.floor(Math.random() * 400) + 50
    })
  }
}

// 更新柱状图数据
function updateBarData() {
  barChartData.value = barChartData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 200) + 50
  }))
}

// 添加柱状图数据点
function addBarDataPoint() {
  const products = ['产品F', '产品G', '产品H', '产品I', '产品J']
  const colors = ['#ff9f43', '#00d2d3', '#ff6b6b', '#5f27cd', '#00a8ff']
  const currentLength = barChartData.value.length
  
  if (currentLength < 10) {
    barChartData.value.push({
      label: products[currentLength - 5] || `产品${String.fromCharCode(65 + currentLength)}`,
      value: Math.floor(Math.random() * 200) + 50,
      color: colors[currentLength % colors.length]
    })
  }
}
</script>

<style scoped>
.chart-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

.demo-section {
  margin-bottom: 60px;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fafafa;
}

.demo-section h2 {
  color: #555;
  margin-bottom: 20px;
}

.chart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.controls button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.controls button:hover {
  background: #2563eb;
}

.controls button:active {
  background: #1d4ed8;
}
</style>