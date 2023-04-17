<template>
  <div class="component">
    <h1>{{ name }}</h1>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { getCreatorDailyCards } from '@/requests/juejin'

  const name = ref<string | undefined>('JuejinMainPage')

  onMounted(async () => {
    // const data = await getCreatorDailyCards()
    //
    // console.log(data)
  })
</script>

<style lang="scss"></style>
