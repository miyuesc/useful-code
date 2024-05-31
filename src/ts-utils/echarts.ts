// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { graphic } from 'echarts/core'
import { isNull, isObject, isUndefined, notNull } from '@/functions/tool'

interface GradientColorStop {
  offset: number
  color: string
}

// 线性渐变
export function eLinearGradient(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colors?: GradientColorStop[] | string[],
  cord?: boolean
) {
  const newColors: GradientColorStop[] | undefined = colorStepsHelper(colors)
  return new graphic.LinearGradient(x1, y1, x2, y2, newColors, cord)
}
// 径向渐变
export function eRadialGradient(
  x: number,
  y: number,
  r: number,
  colors?: GradientColorStop[] | string[],
  cord?: boolean
) {
  const newColors: GradientColorStop[] | undefined = colorStepsHelper(colors)
  return new graphic.RadialGradient(x, y, r, newColors, cord)
}

// 辅助函数 1. 渐变色梯度
export function colorStepsHelper(
  colors?: GradientColorStop[] | string[]
): GradientColorStop[] | undefined {
  if (!colors || !colors.length) {
    return undefined
  }
  if (isObject(colors[0])) {
    return colors as GradientColorStop[]
  }
  const newColors: GradientColorStop[] = []
  const offsetStep = 1 / (colors.length - 1)
  for (let i = 0; i < colors.length; i++) {
    newColors.push({ offset: i * offsetStep, color: (colors as string[])[i] })
  }
  return newColors
}

// mock 函数 1. 连续月份生成
export function generateMonthData(length: number, separator = '-'): string[] {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const result: string[] = []
  for (let i = 0; i < length; i++) {
    const month = currentMonth + i
    const formattedMonth = month < 10 ? `0${month}` : `${month}`
    result.push(`${year}${separator}${formattedMonth}`)
  }
  return result
}
// mock 函数 2. 随机范围数据
export function generateRandomNumberArray(
  length: number,
  minValue?: number,
  maxValue?: number,
  shouldRound = false
): number[] {
  const push = (arr: number[], item: number) => {
    arr.push(shouldRound ? Math.round(item) : item)
  }

  const result: number[] = []

  if (notNull(minValue) && notNull(maxValue)) {
    const distance = maxValue! - minValue!
    for (let i = 0; i < length; i++) {
      push(result, Math.random() * distance + minValue!)
    }
    return result
  }
  if (isUndefined(minValue) || isNull(minValue)) {
    for (let i = 0; i < length; i++) {
      push(result, Math.random() * (maxValue || 1))
    }
    return result
  }

  for (let i = 0; i < length; i++) {
    push(result, Math.random() + minValue)
  }
  return result
}
