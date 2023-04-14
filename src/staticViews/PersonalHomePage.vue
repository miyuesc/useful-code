<template>
  <div class="personalHomePage">
    <h1>{{ name }} Page</h1>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const name = ref<string | undefined>('personalHomePage')
</script>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'PersonalHomePage',
    setup() {
      const name = ref<string | undefined>('personalHomePage')
      return {
        name
      }
    }
  })
</script>

<style lang="scss" scoped></style>
