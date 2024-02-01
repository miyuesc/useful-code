<script setup lang="ts">
  import { PropType } from 'vue'
  import { NButton } from 'naive-ui'

  defineOptions({ name: 'ForText' })

  const props = defineProps({
    msg: {
      type: String as PropType<string>
    }
  })
</script>

<template>
  <NButton @click="msg = '123'"> 测试1: msg = 123 </NButton>
  <NButton @click="props.msg = '123'"> 测试2: props.msg = 1234 </NButton>
  <div>child Message: {{ msg }}</div>
  <div>child Prop Message: {{ props.msg }}</div>
</template>

<style scoped lang="scss"></style>
