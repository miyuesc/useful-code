
<template>
  <div class="timeline-fragment-item" :style="computedStyles">
    <div
      v-if="fragment.children && fragment.children.length"
      class="fragment-expand-btn"
      @click="changeChildrenStatus"
    >
      <Icon
        type="ios-arrow-forward"
        :style="{ transform: `rotate(${showChildren ? '90' : '0'}deg)` }"
      />
    </div>
    <div
      class="item-title-box"
      :class="{ 'is-error': computedSpanError }"
      @click="changeDetailsStatus"
    >
      <Icon v-if="computedSpanError" type="ios-alert" />
      <span>{{ fragment.operationName }}</span>
      <span style="font-size: 12px; color: #ccc; margin-left: 20px">{{ computedProcessName }}</span>
    </div>
    <div class="item-timeline-box">
      <div class="timeline-inner" :style="computedInnerStyles">
        <span>{{ computedInnerText }}</span>
      </div>
    </div>
    <div
      class="item-cursor-box with-height-translation"
      :class="{ expand: showDetails }"
      @click="changeDetailsStatus"
    ></div>
    <div class="item-details-box with-height-translation" :class="{ expand: showDetails }">
      <div :class="['details-content', detailClasses]">
        <div class="details-header">
          <span>{{ computedProcessName }}</span>
          <span>Service：{{ fragment.operationName }}</span>
          <span>Duration：{{ computedInnerText }}</span>
          <span>Start Time：{{ computedStartTime }}</span>
        </div>
        <n-collapse>
          <n-collapse-item v-if="fragment.tags && fragment.tags.length">
            <template #header>
              <span class="details-tab-header">Tags</span>
            </template>
            <template #default>
              <div v-for="t in fragment.tags" :key="t.key" class="details-tab-item">
                <span class="tab-item-key">{{ t.key }}</span>
                <span class="tab-item-divider">=</span>
                <span class="tab-item-value">{{ t.value }}</span>
              </div>
            </template>
          </n-collapse-item>
          <n-collapse-item v-if="fragment.logs && fragment.logs.length">
            <template #header>
              <span class="details-tab-header">Logs</span>
            </template>
            <template #default>
              <n-collapse>
                <n-collapse-item
                  v-for="(log, idx) in fragment.logs"
                  :key="idx"
                  :name="`panel-${idx}`"
                >
                  <template #header>
                    <span class="details-tab-header">{{ computeLogTime(log.timestamp) }}</span>
                  </template>
                  <template #default>
                    <div v-for="i in log.fields || []" :key="i.key" class="details-tab-item">
                      <span class="tab-item-key">{{ i.key }}</span>
                      <span class="tab-item-divider">=</span>
                      <span class="tab-item-value">{{ i.value }}</span>
                    </div>
                  </template>
                </n-collapse-item>
              </n-collapse>
            </template>
          </n-collapse-item>
        </n-collapse>
      </div>
    </div>
    <transition v-for="frag in fragment.children" :key="frag.id" name="slide-up">
      <service-timeline-fragments-item
        v-show="showChildren"
        ref="childrenRefs"
        :gap="gap"
        :duration="duration"
        :processes="processes"
        :start-time="startTime"
        :level="level + 1"
        :fragment="frag"
        :left-width="leftWidth"
        :detail-max-height="detailMaxHeight"
        :detail-classes="detailClasses"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">import { ref, computed, onMounted, getCurrentInstance, nextTick, PropType } from 'vue'
// import { Icon } from 'view-design'
import { NCollapse, NCollapseItem } from 'naive-ui'
// 假设你有定义这些类型
import { Fragment, ProcessMap, Tag, Log } from './types'

// 定义属性
const props = defineProps({
  fragment: {
    type: Object as PropType<any>,
    default: () => ({ children: [] })
  },
  processes: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  level: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  startTime: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: ''
  },
  gap: {
    type: Number,
    required: true
  },
  leftWidth: {
    type: Number,
    required: true
  },
  detailMaxHeight: {
    type: Number,
    required: true
  },
  detailClasses: {
    type: String,
    default: ''
  }
})

// 定义引用
const childrenRefs = ref<InstanceType<typeof ServiceTimelineFragmentsItem>[]>([])
const showDetails = ref(false)
const showChildren = ref(true)
const tree = ref<any>(null)

// 获取当前组件实例
const instance = getCurrentInstance()

// 定义颜色数组
const colors = [
  '#A239FB',
  '#6325DF',
  '#5752FA',
  '#306FFC',
  '#038FF5',
  '#25ABE6',
  '#02D8FF',
  '#0eebeb',
  '#1DFFEE',
  '#08F4BD',
  '#12DBbE',
  '#13C565',
  '#1EDD51',
  '#A2E430',
  '#FFE922',
  '#FFC600'
]

// 计算属性
const computedStyles = computed(() => {
  const offsetLeft = props.gap + 1 // 边框占据1像素
  const leftGap = offsetLeft * props.level + props.gap // 累加左边距
  const color = props.color || props.fragment.color || colors[props.level % 16]
  const btnPos = props.level > 0 ? props.gap : 0
  return {
    '--main-color': color,
    '--bg-color': `${color}33`,
    '--detail-max-height': `${props.detailMaxHeight}px`,
    width: `calc(100% - ${btnPos}px)`,
    marginLeft: `${btnPos}px`, // 显示展开按钮
    gridTemplateColumns: `${props.leftWidth - leftGap}px 1fr`
  }
})

const computedInnerStyles = computed(() => {
  const { startTime, duration } = props.fragment
  const left = ((startTime - props.startTime) * 100) / props.duration
  const right = 100 - ((startTime + duration - props.startTime) * 100) / props.duration
  const needTransform = left > 80 || right > 80
  return {
    '--left': `${left}%`,
    '--right': `${100 - ((startTime + duration - props.startTime) * 100) / props.duration}%`,
    // eslint-disable-next-line no-nested-ternary
    '--text-left': left > 80 ? '-100%' : right > 80 ? '100%' : 0,
    '--text-color': needTransform ? '#fff' : '#000'
  }
})

const computedProcessName = computed(() => {
  if (!props.fragment || !props.processes) {
    return ''
  }
  const process = props.processes[props.fragment.processID]
  return process ? process.serviceName : ''
})

const computedSpanError = computed(() => {
  if (!props.fragment || !props.fragment.tags) {
    return false
  }
  return props.fragment.tags.some((tag: any) => tag.type === 'error')
})

const computedInnerText = computed(() => {
  let stepScale = props.fragment.duration
  let unit = ''
  if (stepScale / (1000 * 1000) > 1) {
    stepScale = stepScale / (1000 * 1000)
    unit = 's'
  } else if (stepScale / 1000 > 1) {
    stepScale = stepScale / 1000
    unit = 'ms'
  } else {
    unit = 'μs'
  }
  return stepScale.toFixed(2) + unit
})

const computedStartTime = computed(() => {
  let stepScale = props.fragment.startTime - props.startTime
  let unit = ''
  if (stepScale / (1000 * 1000) > 1) {
    stepScale = stepScale / (1000 * 1000)
    unit = 's'
  } else if (stepScale / 1000 > 1) {
    stepScale = stepScale / 1000
    unit = 'ms'
  } else {
    unit = 'μs'
  }
  return stepScale.toFixed(2) + unit
})

// 生命周期钩子
onMounted(() => {
  const parent = instance?.parent
  if (parent) {
    if ((parent as any).isTree) {
      tree.value = parent
    } else {
      tree.value = (parent as any).tree
    }
  }
})

// 方法定义
const computeLogTime = (timestamp: number) => {
  let stepScale = timestamp - props.fragment.startTime
  let unit = ''
  if (stepScale / (1000 * 1000) > 1) {
    stepScale = stepScale / (1000 * 1000)
    unit = 's'
  } else if (stepScale / 1000 > 1) {
    stepScale = stepScale / 1000
    unit = 'ms'
  } else {
    unit = 'μs'
  }
  return stepScale.toFixed(2) + unit
}

const changeDetailsStatus = () => {
  showDetails.value = !showDetails.value
  if (showDetails.value) {
    tree.value?.$emit('details-expanded', props.fragment, instance)
  } else {
    tree.value?.$emit('details-collapsed', props.fragment, instance)
  }
}

const changeChildrenStatus = () => {
  showChildren.value = !showChildren.value
  if (showChildren.value) {
    tree.value?.$emit('children-expanded', props.fragment, instance)
  } else {
    tree.value?.$emit('children-collapsed', props.fragment, instance)
  }
}

const expandAll = () => {
  expandAllChildren()
  expandAllDetails()
}

const collapseAll = () => {
  collapseAllChildren()
  collapseAllDetails()
}

const expandAllChildren = () => {
  showChildren.value = true
  nextTick(() => {
    if (childrenRefs.value && childrenRefs.value.length) {
      childrenRefs.value.forEach((child) => child.expandAllChildren())
    }
  })
}

const collapseAllChildren = () => {
  if (childrenRefs.value && childrenRefs.value.length) {
    childrenRefs.value.forEach((child) => child.collapseAllChildren())
  }
  showChildren.value = false
}

const expandAllDetails = () => {
  showDetails.value = true
  nextTick(() => {
    if (childrenRefs.value && childrenRefs.value.length) {
      childrenRefs.value.forEach((child) => child.expandAllDetails())
    }
  })
}

const collapseAllDetails = () => {
  if (childrenRefs.value && childrenRefs.value.length) {
    childrenRefs.value.forEach((child) => child.collapseAllDetails())
  }
  showDetails.value = false
}

// 暴露方法给父组件
defineExpose({
  expandAll,
  collapseAll,
  expandAllChildren,
  collapseAllChildren,
  expandAllDetails,
  collapseAllDetails
})
</script>

<!-- 样式部分保持不变 -->
<style lang="scss" scoped>/* 这里应该包含原始组件中的样式，保持不变 */
</style>
