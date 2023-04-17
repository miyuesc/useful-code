<script lang="ts" setup>
  import CircleMenuButton from '@/components/CircleMenuButton'
  import { ref } from 'vue'

  const menus = ref([
    { icon: 'el-icon-question', name: '1' },
    { icon: 'el-icon-platform-eleme', name: '2' },
    { icon: 'el-icon-camera-solid', name: '3' },
    { icon: 'el-icon-info', name: '4' },
    { icon: 'el-icon-s-shop', name: '5' },
    { icon: 'el-icon-message-solid', name: '6' }
  ])
</script>

<template>
  <CircleMenuButton :menus="menus"></CircleMenuButton>
</template>
