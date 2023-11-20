<script setup lang="ts">
  import type { BaseNode, CanAdd, CanMove, CanRemove } from '@/components/FlowDesign/types'
  import { computed, type PropType, ref, shallowRef, watch } from 'vue'
  import { NButton } from 'naive-ui'
  import { addNode, idGenerator, nodeGenerator, removeNode } from '@/components/FlowDesign/utils'
  import TaskNode from '@/components/FlowDesign/ChildNodes/TaskNode.vue'
  import CcNode from '@/components/FlowDesign/ChildNodes/CcNode.vue'

  const emit = defineEmits(['update:flow-data'])

  const props = defineProps({
    flowData: {
      type: Object as PropType<BaseNode>,
      default: () => null
    },
    canRemove: {
      type: Function as PropType<CanRemove>,
      default: () => true
    },
    canAdd: {
      type: Function as PropType<CanAdd>,
      default: () => true
    },
    canMove: {
      type: Function as PropType<CanMove>,
      default: () => true
    }
  })

  const startNode = ref<BaseNode>(
    props.flowData || {
      id: 'task-' + idGenerator(),
      type: 'task',
      name: '发起人',
      prev: null,
      next: null,
      businessData: {}
    }
  )
</script>

<template>
  <div class="flow-design__container">
    <task-node
      v-model:node="startNode"
      :can-remove="canRemove"
      :can-add="canAdd"
      :can-move="canMove"
    />
    <div class="flow-end">结束</div>
  </div>
</template>
