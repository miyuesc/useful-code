<script setup lang="ts">
  import { ref, toRaw, watchEffect } from 'vue'
  import FlowDesign from '@/components/FlowDesign/FlowDesign.vue'
  import { BaseNode } from '@/components/FlowDesign/types'

  const flowData = ref<BaseNode | undefined>()

  watchEffect(() => console.log(toRaw(flowData).value))
</script>

<template>
  <div class="flow-design-container">
    <flow-design v-model:flow-data="flowData" />
  </div>
</template>

<style scoped lang="scss">
  .flow-design-container {
    overflow: hidden;
  }
</style>
