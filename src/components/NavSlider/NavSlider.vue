<template>
  <div class="nav-slider">
    <div v-if="childNavs" class="nav-slider_list">
      <div
        v-for="nav in childNavs"
        :key="nav.path"
        :class="{ 'nav-slider_btn': true, 'active-slider_btn': activeNav === nav.name }"
        @click="$emit('slider-click', nav)"
      >
        <span class="nav-slider_btn-text">{{ nav.meta?.translateName || nav.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { type PropType } from 'vue'
  import type { NavItem } from '@/components/types'

  const props = defineProps({
    childNavs: {
      type: Array as PropType<NavItem[]>,
      default: (): NavItem[] => []
    },
    activeNav: {
      type: String as PropType<string>,
      default: ''
    }
  })

  defineEmits(['slider-click'])
</script>

<style lang="scss">
  @import './index';
</style>
