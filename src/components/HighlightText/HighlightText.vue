<script setup lang="ts">
  import { computed, type PropType } from 'vue'

  const props = defineProps({
    text: {
      type: [String, Number] as PropType<string | number>,
      default: ''
    },
    color: {
      type: String as PropType<string>,
      default: '#010101' // #BCE3FF
    },
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 12
    },
    separator: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    bolder: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    lighting: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    unit: {
      type: String as PropType<string>,
      default: ''
    }
  })

  const computedText = computed(() => {
    if (typeof props.text === 'number' && props.separator) {
      return props.text.toLocaleString()
    }
    return props.text
  })
  const computedStyle = computed(() => {
    let fontSize: string = props.size as string
    let fontWeight = 'normal'
    const color = props.color
    if (typeof props.size === 'number') {
      fontSize += 'px'
    }
    if (props.bolder) {
      fontWeight = 'bold'
    }
    return { fontSize, fontWeight, color, lineHeight: fontSize }
  })
</script>

<template>
  <span
    :class="['highlight-text', { 'with-unit': !!unit, lighting: lighting }]"
    v-bind="{ 'data-attr-unit': !!text && unit }"
    :style="computedStyle"
    >{{ computedText }}</span
  >
</template>

<style lang="scss" scoped>
  .highlight-text {
    font-family: Akrobat-Black, Akrobat, sans-serif;
    user-select: none;
    word-break: break-word;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.lighting {
      text-shadow: 0 0 6px;
    }
    &.with-unit {
      &::after {
        content: attr(data-attr-unit);
        display: inline-block;
        transform: scale(0.4);
        transform-origin: bottom left;
      }
    }
  }
</style>
