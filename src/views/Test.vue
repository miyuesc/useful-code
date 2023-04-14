<template>
  <div class="Test">
    <h1>{{ name }} Page</h1>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const name = ref<string | undefined>('Test')
</script>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Test',
    setup() {
      const name = ref<string | undefined>('Test')
      return {
        name
      }
    }
  })
</script>

<style lang="scss" scoped></style>
