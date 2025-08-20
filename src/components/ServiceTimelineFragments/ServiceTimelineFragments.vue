
<template>
  <div class="timeline-fragments" :style="computedStyles">
    <div class="timeline-fragments-header">
      <div class="fragments-header-content">
        <span class="fragments-header-title-text">{{ title }}</span>
        <slot name="header"></slot>
      </div>
    </div>
    <div class="timeline-steps-box">
      <div
        v-for="line in computedSteps"
        :key="line.key"
        class="timeline-step"
        :style="{ left: line.left }"
      >
        <span class="timeline-step-scale">{{ line.scale }}</span>
      </div>
    </div>
    <div class="timeline-fragments-list">
      <transition v-for="frag in fragments" :key="frag.id" name="slide-up">
        <service-timeline-fragments-item
          ref="childrenRefs"
          :duration="duration"
          :start-time="startTime"
          :processes="processes"
          :gap="gap"
          :level="0"
          :fragment="frag"
          :left-width="leftWidth"
          :detail-max-height="detailMaxHeight"
          :detail-classes="detailClasses"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, PropType } from 'vue'
import ServiceTimelineFragmentsItem from './ServiceTimelineFragmentsItem.vue'

// 定义属性
const props = defineProps({
  fragments: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  processes: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  },
  startTime: {
    type: Number,
    default: 0
  },
  gap: {
    type: Number,
    default: 24
  },
  leftWidth: {
    type: Number,
    default: 400
  },
  headerHeight: {
    type: Number,
    default: 40
  },
  detailMaxHeight: {
    type: Number,
    default: 240
  },
  detailClasses: {
    type: String,
    default: ''
  },
  stepNum: {
    type: Number,
    default: 4
  },
  warningColor: {
    type: String,
    default: '#FC3452'
  }
})

// 定义引用
const childrenRefs = ref<InstanceType<typeof ServiceTimelineFragmentsItem>[]>([])

// 定义计算属性
const computedStyles = computed(() => {
  return {
    '--warning-color': props.warningColor,
    '--label-width': `${props.leftWidth}px`,
    '--header-height': `${props.headerHeight}px`,
    '--gap-width': `${props.gap}px`
  }
})

const computedSteps = computed(() => {
  const len = Math.floor(props.stepNum) + 1
  if (len < 2) {
    return []
  }
  const steps = []
  const stepItem = 100 / len
  let stepScale = props.duration / len
  let unit = ''
  if (props.duration / (1000 * 1000) > 1) {
    stepScale = stepScale / (1000 * 1000)
    unit = 's'
  } else if (props.duration / 1000 > 1) {
    stepScale = stepScale / 1000
    unit = 'ms'
  } else {
    unit = 'μs'
  }
  for (let i = 0; i <= len; i++) {
    steps.push({
      key: i,
      left: `${stepItem * i}%`,
      scale: `${(stepScale * i).toFixed(2)}${unit}`
    })
  }
  return steps
})

// 定义方法
const expandAll = () => {
  expandAllChildren()
  expandAllDetails()
}

const collapseAll = () => {
  collapseAllChildren()
  collapseAllDetails()
}

const expandAllChildren = () => {
  if (childrenRefs.value && childrenRefs.value.length) {
    childrenRefs.value.forEach((child) => child.expandAllChildren())
  }
}

const collapseAllChildren = () => {
  if (childrenRefs.value && childrenRefs.value.length) {
    childrenRefs.value.forEach((child) => child.collapseAllChildren())
  }
}

const expandAllDetails = () => {
  if (childrenRefs.value && childrenRefs.value.length) {
    childrenRefs.value.forEach((child) => child.expandAllDetails())
  }
}

const collapseAllDetails = () => {
  if (childrenRefs.value && childrenRefs.value.length) {
    childrenRefs.value.forEach((child) => child.collapseAllDetails())
  }
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

<style lang="scss">/* 样式部分保持不变 */
.timeline-fragments {
  --warning-color: #fc3452;
  --label-width: 400px;
  --header-height: 40px;
  --gap-width: 24px;
  --left: 0%;
  --right: 0%;
  --text-left: 80;
  --text-color: #000;

  position: relative;
  border-top: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  width: 100%;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    left: var(--label-width);
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #dcdcdc;
  }
  * {
    box-sizing: border-box;
  }

  .timeline-steps-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: var(--label-width);
  }
  .timeline-step {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 1px solid #dcdcdc;
    line-height: var(--header-height);
    .timeline-step-scale {
      display: inline-block;
      margin-left: 2px;
      font-size: 12px;
    }
    &:last-child {
      .timeline-step-scale {
        transform: translateX(calc(-100% - 4px)); // 包含 margin
      }
    }
  }
}
.timeline-fragments-header {
  height: var(--header-height);
  line-height: var(--header-height);
  padding: 0 8px;
  background-color: #eeeeee;
  .fragments-header-content {
    width: var(--label-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: var(--gap-width);
  }
  .fragments-header-title-text {
    flex: 1;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.timeline-fragments-list {
  position: relative;
  padding-left: 24px;
}

.timeline-fragment-item {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  grid-template-rows: 36px min-content auto;
  box-sizing: border-box;
  border-left: 1px solid #dcdcdc;
  position: relative;
  transition: all ease 0.2s;
  .fragment-expand-btn {
    position: absolute;
    left: -24px;
    top: 0;
    width: 20px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    i {
      transition: all ease 0.2s;
    }
  }

  .item-title-box,
  .item-timeline-box,
  .item-cursor-box,
  .item-details-box {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .item-title-box,
  .item-cursor-box {
    position: relative;
    line-height: 36px;
    cursor: pointer;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: var(--main-color);
    }
  }
  .item-title-box {
    padding-left: 8px;
    &.is-error {
      color: var(--warning-color);
    }
    //border-bottom: 1px solid #dcdcdc;
  }
  .item-timeline-box {
    width: 100%;
    height: 100%;
    position: relative;
    .timeline-inner {
      height: 16px;
      position: absolute;
      top: 10px;
      border-radius: 4px;
      background-color: var(--main-color);
      font-size: 12px;
      color: var(--text-color);
      //color: #000000;
      text-align: center;
      left: var(--left);
      right: var(--right);
      span {
        filter: grayscale(1) contrast(999) invert(1);
        display: inline-block;
        transform: translateX(var(--text-left));
      }
    }
  }
  .item-cursor-box.item-cursor-box {
    background-color: var(--bg-color);
  }
  .item-details-box {
    border-top: 0 solid var(--main-color);
    border-bottom: 0 solid #dcdcdc;
    //transition-delay: 0s;
    background-color: #fefefe;
    &.expand {
      border-top-width: 4px;
      border-bottom-width: 1px;
      //transition-delay: 0.2s;
    }
  }

  .item-timeline-box {
    //border-bottom: 1px solid #dcdcdc;
  }

  //  动画部分
  .item-cursor-box,
  .item-details-box {
    //transition: border ease 0.2s, max-height ease 0.4s;
    overflow: hidden;
    &.with-height-translation {
      max-height: 0;
    }
    &.with-height-translation.expand {
      height: auto;
      max-height: unset;
      //max-height: var(--detail-max-height);
    }
  }

  .details-content {
    //height: calc(var(--detail-max-height) - 4px);
    height: max-content;
    box-sizing: border-box;
    padding: 8px;
    overflow-y: auto;
    background-color: rgb(245, 245, 245);
  }
  .details-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #333333;
    span {
      font-size: 14px;
      &:first-child {
        flex: 1;
        font-size: 16px;
        font-weight: bold;
      }
      & + span {
        margin-left: 10px;
      }
    }
  }
  .details-tab {
    margin-top: 8px;
    padding-bottom: 8px;
  }
  .details-tab.tags-tab {
    border-bottom: 1px solid #333333;
  }
  .details-tab,
  .details-tab-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .details-tab-header {
    width: 100%;
    font-weight: bold;
    font-size: 14px;
  }
  .details-tab-item {
    display: grid;
    grid-template-columns: min-content 24px auto;
    .tab-item-key {
      white-space: nowrap;
    }
    .tab-item-divider {
      text-align: center;
    }
    .tab-item-value {
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: auto;
    }
  }
}

.timeline-fragment-item + .timeline-fragment-item {
  padding-top: 4px;
}
</style>
