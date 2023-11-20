<script setup lang="ts">
  import { ref } from 'vue'
  import FlowDesign from '@/components/FlowDesign/FlowDesign.vue'
  import { BaseNode } from '@/components/FlowDesign/types'

  const flowData = ref<BaseNode | undefined>()
</script>

<template>
  <flow-design v-model:flow-data="flowData" />
</template>

<style scoped lang="scss"></style>
