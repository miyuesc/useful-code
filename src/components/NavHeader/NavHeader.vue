<template>
  <div class="nav-header" :style="navStyles">
    <div class="nav-header_logo">
      <slot name="logo"></slot>
      <div v-if="!$slots.logo" class="nav-header_logo-img"></div>
    </div>
    <div v-if="navs" class="nav-header_btns">
      <div
        v-for="nav in navs"
        :key="nav.path"
        :class="{ 'nav-header_btn': true, 'active-header_btn': activeNav === nav.name }"
        @click="$emit('nav-click', nav)"
      >
        <span class="nav-header_btn-text">{{ nav.meta?.translateName || nav.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type PropType, computed } from 'vue'
  import type { NavAlign, NavHeight, NavItem } from '@/components/types'

  const props = defineProps({
    navs: {
      type: Array as PropType<NavItem[]>,
      default: (): NavItem[] => []
    },
    activeNav: {
      type: String as PropType<string>,
      default: ''
    },
    logo: {
      type: String as PropType<string>,
      default: undefined
    },
    align: {
      type: String as PropType<NavAlign>,
      default: 'end'
    },
    height: {
      type: [Number, String] as PropType<NavHeight>,
      default: 64
    }
  })

  defineEmits(['nav-click'])

  const navStyles = computed((): Record<string, any> => {
    const styles: Record<string, any> = {}
    if (typeof props.height === 'string') {
      styles['--header-height'] = props.height as `${number}px`
    } else if (typeof props.height === 'number' && props.height > 0) {
      styles['--header-height'] = props.height + 'px'
    }
    styles['--header-btn-align'] = `flex-${props.align}`
    return styles
  })
</script>

<style lang="scss">
  @import './index';
</style>
