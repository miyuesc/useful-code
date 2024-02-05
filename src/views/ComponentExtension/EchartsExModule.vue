<script setup lang="ts">
  // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
  import * as echarts from 'echarts/core'
  import type { ComposeOption } from 'echarts/core'
  // 引入不同的图表插件
  import { BarChart, LineChart, PictorialBarChart, PieChart, GaugeChart } from 'echarts/charts'
  import type {
    BarSeriesOption,
    LineSeriesOption,
    PictorialBarSeriesOption,
    GaugeSeriesOption,
    PieSeriesOption
  } from 'echarts'
  // 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
  import {
    TitleComponent, // 标题
    TooltipComponent, // 提示框
    GridComponent, // 网格边界
    LegendComponent, // 图例
    PolarComponent,
    GraphicComponent
  } from 'echarts/components'
  import type {
    TitleComponentOption,
    TooltipComponentOption,
    GridComponentOption,
    LegendComponentOption,
    PolarComponentOption,
    GraphicComponentOption
  } from 'echarts/components'
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features'
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers'
  import { onMounted, shallowRef } from 'vue'
  import {
    eLinearGradient,
    eRadialGradient,
    generateMonthData,
    generateRandomNumberArray
  } from '@/ts-utils/echarts'
  import useWaterPoloChart from '@/hooks/echarts/useWaterPoloChart'
  import useLinearLineChart from '@/hooks/echarts/useLinearLineChart'
  import useLinearBarChart from '@/hooks/echarts/useLinearBarChart'
  import useStackingBarChart from '@/hooks/echarts/useStackingBarChart'
  import useSplittingBarChart from '@/hooks/echarts/useSplittingBarChart'

  // 注册必须的组件
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    PolarComponent,
    GraphicComponent,

    BarChart,
    PictorialBarChart,
    LineChart,
    PieChart,
    GaugeChart,

    LabelLayout,
    UniversalTransition,
    CanvasRenderer
  ])

  // 公共样式部分
  const globalTooltip: TooltipComponentOption = {
    show: true,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'rgba(0,0,0,0.75)',
    textStyle: { color: '#fff' }
  }

  // 水球图
  const waterPolo = shallowRef<null | HTMLDivElement>(null)
  useWaterPoloChart(waterPolo, 0.45)

  // 模拟数据部分
  const dataLength = 6
  const xData = generateMonthData(dataLength)
  const seriesData = [
    { name: '计划完成比例', data: generateRandomNumberArray(dataLength, 120, 400, true) },
    { name: '实际完成比例', data: generateRandomNumberArray(dataLength, 160, 320, true) }
  ]
  const seriesData2 = [
    { name: '苹果', data: generateRandomNumberArray(dataLength, 120, 400, true) },
    { name: '梨子', data: generateRandomNumberArray(dataLength, 200, 320, true) },
    { name: '橙子', data: generateRandomNumberArray(dataLength, 180, 240, true) }
  ]

  // 渐变折线图
  let linearLine = shallowRef<null | HTMLDivElement>(null)
  useLinearLineChart(linearLine, xData, seriesData, true)

  // 渐变柱状图
  let linearBar = shallowRef<null | HTMLDivElement>(null)
  useLinearBarChart(linearBar, xData, seriesData, true)

  // 渐变分割柱状图
  let linearSplitBar = shallowRef<null | HTMLDivElement>(null)
  useSplittingBarChart(linearSplitBar, xData, seriesData2, true)

  // 堆叠柱状图
  let stackingBarChart = null
  let stackingBar = shallowRef<null | HTMLDivElement>(null)
  useStackingBarChart(stackingBar, xData, seriesData2, true)

  // 仪表盘 1
  let gaugeChart1 = null
  let gauge1 = shallowRef<null | HTMLDivElement>(null)
  const initialGaugeChart1 = () => {
    let data = 84
    let rate = '♥♥♥♥♥'
    const commonOptions: ComposeOption<
      PieSeriesOption | GaugeSeriesOption | BarSeriesOption | TitleComponentOption
    > = {
      animation: false,
      cursor: 'auto',
      data: [{ value: 100 }]
    }
    const option: ComposeOption<
      | PieSeriesOption
      | GaugeSeriesOption
      | BarSeriesOption
      | TitleComponentOption
      | PolarComponentOption
    > = {
      //backgroundColor: 'transparent',
      backgroundColor: '#00111b',
      title: [
        {
          text: '身心能量指数\n' + rate,
          left: 'center',
          top: '52%',
          textStyle: {
            color: '#be8c3c',
            fontSize: 12,
            fontWeight: 'lighter'
          }
        },
        {
          text: data.toString(),
          left: 'center',
          top: '45%',
          textStyle: {
            fontSize: 20,
            color: '#be8c3c',
            fontFamily: 'SimHei',
            fontStyle: 'oblique',
            fontWeight: 'bold'
          }
        }
      ],
      // 极坐标系
      polar: {
        radius: ['40%', '50%'],
        center: ['50%', '50%']
      },
      // 极坐标系：角度轴
      angleAxis: {
        max: (100 * 360) / 270,
        show: false,
        type: 'value',
        startAngle: 225
      },
      // 极坐标系：径向轴
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        // 第二层：数据以进度条的形式展示
        {
          type: 'bar',
          data: [{ value: data }],
          itemStyle: {
            color: eLinearGradient(0, 0.5, 1, 0, ['#8ac4d4', '#ec5e26'])
          },
          barGap: '-100%',
          coordinateSystem: 'polar',
          roundCap: true,
          cursor: 'auto',
          z: 2
        },
        // 第二层：进度条背景
        {
          type: 'bar',
          itemStyle: { color: '#013f72' },
          barGap: '-100%',
          data: [{ value: 100 }],
          coordinateSystem: 'polar',
          roundCap: true,
          cursor: 'auto',
          emphasis: { itemStyle: { color: '#013f72' } },
          z: 1
        },
        // 第一层：中心文字展示区
        {
          type: 'pie',
          radius: ['0%', '32%'],
          center: ['50%', '50%'],
          labelLine: { show: false },
          itemStyle: {
            color: eRadialGradient(0.5, 0.5, 0.5, ['#174869', '#08385c'])
          },
          animation: false,
          cursor: 'auto',
          data: [{ value: 100 }],
          z: 2
        },
        // 第三层；仪表盘：只显示刻度
        {
          type: 'gauge',
          title: { show: false },
          radius: '60%',
          startAngle: 225,
          endAngle: -45,
          splitNumber: 10,
          center: ['50%', '50%'],
          min: 0,
          max: 100,
          pointer: { show: false },
          detail: { show: false },
          data: [{ value: 100 }],
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [0, '#5fa7ca'],
                [1, '#5fa7ca']
              ],
              opacity: 0
            }
          },
          axisTick: { length: 14, lineStyle: { color: 'auto' } },
          splitLine: { show: false },
          axisLabel: {
            show: true,
            distance: 18, //距离刻度的距离
            lineHeight: -50,
            formatter: function (value): string {
              return value % 100 === 0 ? value + '' : ''
            }
          }
        },
        // 第四层；背景圆：带阴影
        {
          type: 'pie',
          radius: ['0%', '60%'],
          center: ['50%', '50%'],
          itemStyle: {
            color: eRadialGradient(0.5, 0.5, 0.5, [
              { offset: 0, color: '#002e50' },
              { offset: 0.9, color: '#002e50' },
              { offset: 1, color: '#134568' }
            ])
          },
          ...commonOptions,
          labelLine: { show: false },
          z: -1
        },
        // 第五层：视觉上类似于边框，带阴影
        {
          type: 'pie',
          radius: ['0', '60.4%'],
          center: ['50%', '50%'],
          itemStyle: {
            color: '#146a90',
            shadowBlur: 50,
            shadowColor: '#146a90'
          },
          ...commonOptions,
          labelLine: { show: false },
          emphasis: {
            itemStyle: { color: '#146a90' }
          },
          z: -2
        },
        // 第六层：看着类似一个边框，不细看，看不出来，此项目的在于突出立体感
        {
          type: 'pie',
          radius: ['64.7%', '65%'],
          center: ['50%', '50%'],
          itemStyle: {
            color: '#07223b'
          },
          ...commonOptions,
          labelLine: { show: false },
          emphasis: {
            itemStyle: {
              color: '#07223b'
            }
          },
          z: -2
        },
        // 第七层：
        {
          type: 'pie',
          radius: ['65%', '74%'],
          center: ['50%', '50%'],
          itemStyle: { color: '#00182d' },
          ...commonOptions,
          labelLine: { show: false },
          emphasis: {
            itemStyle: { color: '#00182d' }
          },
          z: -2
        },
        // 第八层：
        {
          type: 'pie',
          radius: ['74%', '90%'],
          center: ['50%', '50%'],
          itemStyle: {
            color: '#011422'
          },
          ...commonOptions,
          labelLine: { show: false },
          emphasis: { itemStyle: { color: '#011422' } },
          z: -2
        }
      ]
    }
    gaugeChart1 = echarts.init(gauge1.value!)
    gaugeChart1.setOption(option)
  }

  onMounted(() => {
    // initialLinearSplitBarChart()
    initialGaugeChart1()
  })
</script>

<template>
  <div>
    <div class="page-desc">部分复杂 Echarts 图表演示</div>
    <div class="chart-grid-container">
      <div class="chart-item">
        <div class="chart-name">水球图</div>
        <div ref="waterPolo" class="chart-content"></div>
      </div>
      <div class="chart-item">
        <div class="chart-name">渐变折线图</div>
        <div ref="linearLine" class="chart-content"></div>
      </div>
      <div class="chart-item">
        <div class="chart-name">渐变柱状图</div>
        <div ref="linearBar" class="chart-content"></div>
      </div>
      <div class="chart-item">
        <div class="chart-name">渐变分割柱状图</div>
        <div ref="linearSplitBar" class="chart-content"></div>
      </div>
      <div class="chart-item">
        <div class="chart-name">堆叠柱状图</div>
        <div ref="stackingBar" class="chart-content"></div>
      </div>
      <div class="chart-item">
        <div class="chart-name">仪表盘1</div>
        <div ref="gauge1" class="chart-content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .chart-grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    padding-bottom: var(--main-padding);
    .chart-item {
      display: flex;
      flex-direction: column;
      height: 440px;
      overflow: hidden;
      border: 1px solid #eeeeee;
    }
    .chart-name {
      line-height: 40px;
      text-align: center;
    }
    .chart-content {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
