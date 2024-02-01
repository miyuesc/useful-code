<script setup lang="ts">
  import { PropType } from 'vue'
  import { TaskPanelIns } from '@/components/TaskDashboard/types'

  const props = defineProps({
    panelInfo: {
      type: Object as PropType<TaskPanelIns>,
      default: null
    }
  })
</script>

<template>
  <div class="task-board__panel">
    {{ panelInfo?.id || '11111' }}
  </div>
</template>
