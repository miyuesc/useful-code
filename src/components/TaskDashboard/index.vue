<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Sortable, { MultiDrag } from 'sortablejs'
  import TaskPanel from './parts/TaskPanel.vue'

  import { TaskPanelIns } from './types'

  defineOptions({ name: 'TaskDashboard' })

  const listWrapper = ref<HTMLDivElement | null>()
  let sortableInstance: undefined | unknown

  const initSortableDom = () => {
    sortableInstance = new Sortable(listWrapper.value!, {
      /* multi options */
      multiDrag: true,
      multiDragKey: 'ctrl',
      selectedClass: 'is-selected',

      /* normal options */
      fallbackTolerance: 3,
      animation: 150,
      filter: 'is-fixed'
    })
  }

  const panelList = ref<TaskPanelIns[]>([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])

  Sortable.mount(new MultiDrag())

  onMounted(() => {
    initSortableDom()
  })
</script>

<template>
  <div class="task-dashboard__wrapper">
    <div class="task-board__container">
      <div ref="listWrapper" class="task-board__list-wrapper">
        <task-panel v-for="i in panelList" :key="i.id" :panel-info="i" />
        <div class="create-task-panel is-fixed">新建列表</div>
      </div>
    </div>
  </div>
</template>
