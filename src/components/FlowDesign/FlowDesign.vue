<script setup lang="ts">
  import type { BaseNode, CanAdd, CanMove, CanRemove } from '@/components/FlowDesign/types'
  import { type PropType, computed, toRef, watchEffect, ref } from 'vue'
  import { idGenerator } from '@/components/FlowDesign/utils'
  import TaskNode from '@/components/FlowDesign/ChildNodes/TaskNode.vue'
  import CcNode from '@/components/FlowDesign/ChildNodes/CcNode.vue'
  import ConditionNode from '@/components/FlowDesign/ChildNodes/ConditionNode.vue'

  const emits = defineEmits(['update:flow-data'])

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

  const defaultFlowData: () => BaseNode = () => ({
    id: 'task-' + idGenerator(),
    type: 'task',
    name: '发起人',
    prev: null,
    next: null,
    businessData: {}
  })
  const nodeTypeMaps = {
    task: TaskNode,
    cc: CcNode,
    condition: ConditionNode
  }

  const startNode = props.flowData ? toRef(props, 'flowData') : ref(defaultFlowData())

  const nodeList = computed<BaseNode[]>(() => {
    const list: BaseNode[] = []
    let nextNode: BaseNode | null = startNode.value
    while (nextNode) {
      list.push(nextNode)
      nextNode = nextNode.next
    }
    return list
  })

  watchEffect(() => emits('update:flow-data', startNode.value))
</script>

<template>
  <div class="flow-design__container">
    <template v-for="(node, i) in nodeList" :key="node.id">
      <component
        :is="nodeTypeMaps[node.type]"
        v-model:node="nodeList[i]"
        :can-remove="canRemove"
        :can-add="canAdd"
        :can-move="canMove"
      />
    </template>
    <div class="flow-end">结束</div>
  </div>
</template>
