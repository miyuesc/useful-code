<script setup lang="ts">
  import WeightedCylinder from '@/components/WeightedCylinder'
  import { onMounted, ref } from 'vue'

  const nums = ref([0.67, 0.82, 0.24, 0.14])

  const updateData = () => {
    nums.value = nums.value.map(() => +Math.random().toFixed(2))
    setTimeout(updateData, 1 * 1000)
  }

  const numberFixed = (num: number): string => (num * 100).toFixed(2)

  onMounted(updateData)
</script>

<template>
  <div class="demo-page-container">
    <div class="demos-content">
      <WeightedCylinder :data="nums[0]" title="权重"></WeightedCylinder>
    </div>
    <div class="demos-content">
      <WeightedCylinder
        :data="nums[1]"
        :format="numberFixed"
        title="占比"
        unit="%"
      ></WeightedCylinder>
    </div>
    <div class="demos-content">
      <WeightedCylinder :data="nums[2]" title="哈哈" reverse></WeightedCylinder>
    </div>
    <div class="demos-content">
      <WeightedCylinder :data="nums[3]" title="哈哈">
        <div style="z-index: 10">这是 slot</div>
      </WeightedCylinder>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .demo-page-container {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .demos-content {
    margin: 100px auto;
    width: 100px;
    height: 240px;
  }
</style>
