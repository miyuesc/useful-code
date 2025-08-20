# Canvas 图表组件

基于 Canvas 实现的轻量级图表组件，支持折线图和柱状图，兼容 Vue 3 和 uni-app。

## 特性

- 🎨 支持折线图和柱状图
- 📱 完全响应式，支持移动端
- 🎯 高性能 Canvas 渲染
- 🛠 高度可定制化
- 📦 零依赖，轻量级
- 🔧 TypeScript 支持
- 📱 uni-app 兼容

## 组件说明

### CanvasChart.vue
适用于 Vue 3 项目的图表组件

### UniAppChart.vue  
适用于 uni-app 项目的图表组件

## 基础用法

### Vue 3 项目

```vue
<template>
  <CanvasChart
    type="line"
    :data="chartData"
    :width="400"
    :height="300"
    :options="chartOptions"
  />
</template>

<script setup>
import CanvasChart from '@/components/CanvasChart.vue'

const chartData = [
  { label: '1月', value: 120 },
  { label: '2月', value: 200 },
  { label: '3月', value: 150 },
  { label: '4月', value: 300 }
]

const chartOptions = {
  title: '月度销售趋势',
  showGrid: true,
  showAxis: true,
  showLabels: true,
  colors: ['#3b82f6']
}
</script>
```

### uni-app 项目

```vue
<template>
  <view>
    <UniAppChart
      type="bar"
      :data="chartData"
      :width="350"
      :height="250"
      :options="chartOptions"
    />
  </view>
</template>

<script>
import UniAppChart from '@/components/UniAppChart.vue'

export default {
  components: {
    UniAppChart
  },
  data() {
    return {
      chartData: [
        { label: '产品A', value: 85, color: '#007AFF' },
        { label: '产品B', value: 120, color: '#FF3B30' },
        { label: '产品C', value: 95, color: '#34C759' }
      ],
      chartOptions: {
        title: '产品销量对比',
        showGrid: true,
        showAxis: true,
        showLabels: true
      }
    }
  }
}
</script>
```

## API 文档

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | String | 'line' | 图表类型：'line' \| 'bar' |
| data | Array | [] | 图表数据 |
| width | Number | 400 | 画布宽度 |
| height | Number | 300 | 画布高度 |
| options | Object | {} | 图表配置选项 |

### 数据格式

```typescript
interface ChartDataItem {
  label: string    // 标签
  value: number    // 数值
  color?: string   // 自定义颜色（可选）
}
```

### 配置选项

```typescript
interface ChartOptions {
  title?: string           // 图表标题
  showGrid?: boolean       // 显示网格
  showAxis?: boolean       // 显示坐标轴
  showLabels?: boolean     // 显示标签
  colors?: string[]        // 颜色配置
  padding?: {              // 内边距
    top: number
    right: number
    bottom: number
    left: number
  }
}
```

## 高级用法

### 自定义颜色

```javascript
const chartOptions = {
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
}
```

### 自定义内边距

```javascript
const chartOptions = {
  padding: {
    top: 60,
    right: 40,
    bottom: 80,
    left: 80
  }
}
```

### 动态更新数据

```javascript
// Vue 3
const updateData = () => {
  chartData.value = chartData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 400) + 50
  }))
}

// uni-app
updateData() {
  this.chartData = this.chartData.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 400) + 50
  }))
}
```

## uni-app 特有功能

### 导出图片

```javascript
// 导出为临时文件
const imagePath = await this.$refs.chart.exportImage()

// 保存到相册
uni.saveImageToPhotosAlbum({
  filePath: imagePath,
  success: () => {
    uni.showToast({ title: '已保存到相册' })
  }
})
```

### 手动更新图表

```javascript
this.$refs.chart.updateChart()
```

## 工具类使用

```javascript
import { ChartUtils } from '@/utils/chartUtils'

// 生成模拟数据
const mockData = ChartUtils.generateMockData(5, 0, 100)

// 生成时间序列数据
const timeData = ChartUtils.generateTimeSeriesData(7, 100, 20)

// 数据排序
const sortedData = ChartUtils.sortData(data, 'desc')

// 格式化数值
const formattedValue = ChartUtils.formatValue(1234) // "1.2K"

// 获取数据统计
const stats = ChartUtils.getDataStats(data)
console.log(stats) // { min, max, sum, avg, count }
```

## 注意事项

1. **性能优化**：大数据量时建议使用数据采样或分页
2. **响应式**：组件会自动适配容器大小
3. **触摸事件**：移动端支持触摸交互
4. **高DPI**：自动适配高分辨率屏幕
5. **uni-app兼容**：使用 uni-app 的 canvas API

## 浏览器兼容性

- Chrome 4+
- Firefox 2+
- Safari 3.1+
- IE 9+
- 所有现代移动浏览器

## 示例项目

查看 `ChartDemo.vue` 和 `UniAppChartDemo.vue` 获取完整示例。