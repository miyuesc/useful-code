<script setup lang="ts">
  import { NDivider, NInput, NInputGroup, NButton } from 'naive-ui'
  import CronCard from '@/components/CronCard/index.vue'
  import { ComponentInstance, ref } from 'vue'

  const exp = ref<string>()
  const cronCardRef = ref<ComponentInstance<typeof CronCard>>()

  const updateExp = () => {
    cronCardRef.value!.initCronExpression(exp.value || '')
    // cronCardRef.value!.update(exp.value || '')
  }
</script>

<template>
  <div class="page-container">
    <div style="display: flex">
      <NInputGroup>
        <NInput v-model:value="exp" />
        <NButton type="info" @click="updateExp">更新到 CRON Card</NButton>
      </NInputGroup>
    </div>
    <NDivider />
    <CronCard ref="cronCardRef" />
  </div>
</template>

<style lang="scss" scoped></style>
