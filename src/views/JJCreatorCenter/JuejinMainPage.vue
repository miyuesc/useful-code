<template>
  <div class="component">
    <h1>{{ name }}</h1>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const name = ref<string | undefined>('JuejinMainPage')
</script>

<style lang="scss"></style>
