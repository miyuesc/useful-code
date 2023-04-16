<template>
  <div class="TestImport">
    <h1>{{ name }} Page</h1>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const name = ref<string | undefined>('TestImport')
</script>

<style lang="scss" scoped></style>
