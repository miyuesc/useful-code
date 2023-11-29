<script setup lang="ts">
  import type { BaseNode, CanRemove } from '@/components/FlowDesign/types'
  import { type PropType, computed, toRef, watchEffect, ref } from 'vue'
  import { idGenerator } from '@/components/FlowDesign/utils'
  import TaskNode from '@/components/FlowDesign/ChildNodes/TaskNode.vue'
  import CcNode from '@/components/FlowDesign/ChildNodes/CcNode.vue'
  import ConditionNode from '@/components/FlowDesign/ChildNodes/ConditionNode.vue'
  import ExpressionNode from '@/components/FlowDesign/ChildNodes/ExpressionNode.vue'
  import { UserSyncValidator } from '@/components/FlowDesign/types'

  const emits = defineEmits(['update:flow-data', 'click'])

  const props = defineProps({
    flowData: {
      type: Object as PropType<BaseNode>,
      default: () => null
    },
    canRemove: {
      type: [Boolean, Function] as PropType<CanRemove>,
      default: true
    },
    canAdd: {
      type: [Boolean, Function] as PropType<CanRemove>,
      default: true
    },
    canMove: {
      type: [Boolean, Function] as PropType<CanRemove>,
      default: true
    },

    removeValidator: {
      type: Function as PropType<UserSyncValidator>,
      default: () => async () => true
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
    condition: ConditionNode,
    expression: ExpressionNode
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

  watchEffect(() => {
    emits('update:flow-data', startNode)
  })
</script>

<template>
  <div class="flow-design__wrapper">
    <div class="flow-design__container">
      <template v-for="(node, i) in nodeList" :key="node.id">
        <component
          :is="nodeTypeMaps[node.type]"
          v-model:node="nodeList[i]"
          :can-add="canAdd"
          :can-remove="i > 0 && canRemove"
          :can-move="i > 0 && canMove"
          :remove-validator="removeValidator"
          @click="emits('click', $event)"
        />
      </template>
      <div class="flow-end">结束</div>
    </div>
  </div>
</template>
