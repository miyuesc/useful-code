// 图表工具类
export interface ChartDataItem {
  label: string
  value: number
  color?: string
}

export interface ChartOptions {
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
  animation?: boolean
  animationDuration?: number
}

export class ChartUtils {
  // 默认颜色配置
  static readonly DEFAULT_COLORS = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1'
  ]

  // 默认配置
  static readonly DEFAULT_OPTIONS: ChartOptions = {
    title: '',
    showGrid: true,
    showAxis: true,
    showLabels: true,
    colors: ChartUtils.DEFAULT_COLORS,
    padding: {
      top: 40,
      right: 20,
      bottom: 60,
      left: 60
    },
    animation: false,
    animationDuration: 1000
  }

  /**
   * 合并配置选项
   */
  static mergeOptions(userOptions: Partial<ChartOptions> = {}): ChartOptions {
    return {
      ...ChartUtils.DEFAULT_OPTIONS,
      ...userOptions,
      padding: {
        ...ChartUtils.DEFAULT_OPTIONS.padding,
        ...userOptions.padding
      }
    }
  }

  /**
   * 验证数据格式
   */
  static validateData(data: ChartDataItem[]): boolean {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn('Chart data should be a non-empty array')
      return false
    }

    for (const item of data) {
      if (!item.label || typeof item.value !== 'number') {
        console.warn('Each data item should have label (string) and value (number)')
        return false
      }
    }

    return true
  }

  /**
   * 格式化数值
   */
  static formatValue(value: number, precision: number = 0): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(precision) + 'M'
    } else if (value >= 1000) {
      return (value / 1000).toFixed(precision) + 'K'
    }
    return value.toFixed(precision)
  }

  /**
   * 计算数据统计信息
   */
  static getDataStats(data: ChartDataItem[]) {
    const values = data.map(item => item.value)
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      sum: values.reduce((a, b) => a + b, 0),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      count: values.length
    }
  }

  /**
   * 生成渐变色
   */
  static generateGradientColors(startColor: string, endColor: string, steps: number): string[] {
    const colors: string[] = []
    
    // 简单的颜色插值（这里使用基础实现，实际项目中可以使用更复杂的颜色库）
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1)
      colors.push(this.interpolateColor(startColor, endColor, ratio))
    }
    
    return colors
  }

  /**
   * 颜色插值
   */
  private static interpolateColor(color1: string, color2: string, ratio: number): string {
    // 简单的RGB插值实现
    const hex1 = color1.replace('#', '')
    const hex2 = color2.replace('#', '')
    
    const r1 = parseInt(hex1.substr(0, 2), 16)
    const g1 = parseInt(hex1.substr(2, 2), 16)
    const b1 = parseInt(hex1.substr(4, 2), 16)
    
    const r2 = parseInt(hex2.substr(0, 2), 16)
    const g2 = parseInt(hex2.substr(2, 2), 16)
    const b2 = parseInt(hex2.substr(4, 2), 16)
    
    const r = Math.round(r1 + (r2 - r1) * ratio)
    const g = Math.round(g1 + (g2 - g1) * ratio)
    const b = Math.round(b1 + (b2 - b1) * ratio)
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  /**
   * 生成模拟数据
   */
  static generateMockData(count: number, minValue: number = 0, maxValue: number = 100): ChartDataItem[] {
    const data: ChartDataItem[] = []
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    
    for (let i = 0; i < count; i++) {
      data.push({
        label: labels[i] || `Item ${i + 1}`,
        value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue,
        color: ChartUtils.DEFAULT_COLORS[i % ChartUtils.DEFAULT_COLORS.length]
      })
    }
    
    return data
  }

  /**
   * 生成时间序列数据
   */
  static generateTimeSeriesData(days: number, baseValue: number = 100, variance: number = 20): ChartDataItem[] {
    const data: ChartDataItem[] = []
    const today = new Date()
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (days - 1 - i))
      
      const value = baseValue + (Math.random() - 0.5) * variance * 2
      
      data.push({
        label: `${date.getMonth() + 1}/${date.getDate()}`,
        value: Math.max(0, Math.round(value))
      })
    }
    
    return data
  }

  /**
   * 数据排序
   */
  static sortData(data: ChartDataItem[], order: 'asc' | 'desc' = 'desc'): ChartDataItem[] {
    return [...data].sort((a, b) => {
      return order === 'asc' ? a.value - b.value : b.value - a.value
    })
  }

  /**
   * 数据过滤
   */
  static filterData(data: ChartDataItem[], minValue?: number, maxValue?: number): ChartDataItem[] {
    return data.filter(item => {
      if (minValue !== undefined && item.value < minValue) return false
      if (maxValue !== undefined && item.value > maxValue) return false
      return true
    })
  }

  /**
   * 计算合适的Y轴刻度
   */
  static calculateYAxisTicks(minValue: number, maxValue: number, tickCount: number = 5): number[] {
    const range = maxValue - minValue
    const step = range / (tickCount - 1)
    const ticks: number[] = []
    
    for (let i = 0; i < tickCount; i++) {
      ticks.push(Math.round((minValue + step * i) * 100) / 100)
    }
    
    return ticks
  }

  /**
   * 获取响应式尺寸
   */
  static getResponsiveSize(containerWidth: number, containerHeight: number, aspectRatio: number = 16/9) {
    let width = containerWidth
    let height = containerHeight
    
    if (width / height > aspectRatio) {
      width = height * aspectRatio
    } else {
      height = width / aspectRatio
    }
    
    return { width: Math.floor(width), height: Math.floor(height) }
  }
}
