<script setup lang="ts">
  import type {
    TaskNode,
    CanRemove,
    CanAdd,
    CanMove,
    BaseNodeType
  } from '@/components/FlowDesign/types'
  import { computed, type PropType, ref } from 'vue'
  import { NInput } from 'naive-ui'
  import { ClipboardCheck, XCircle } from 'lucide-vue-next'
  import { addNode, idGenerator, nodeGenerator, removeNode } from '@/components/FlowDesign/utils'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'

  const emits = defineEmits(['update:node'])
  const props = defineProps({
    node: {
      type: Object as PropType<TaskNode>,
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

  const defaultNodeData: () => TaskNode = () => ({
    id: 'task-' + idGenerator(),
    type: 'task',
    next: null,
    prev: null,
    name: '审批',
    businessData: {}
  })

  const computedTaskNode = computed<TaskNode>({
    get: () => props.node || defaultNodeData(),
    set: (node: TaskNode) => emits('update:node', { ...node })
  })
  const nodeCanRemove = computed(() => {
    return props.canRemove(computedTaskNode.value)
  })

  const onNameEditing = ref<boolean>(false)

  const addANode = (type: BaseNodeType) => {
    let canAdd: CanAdd = () => true
    if (props.canAdd && typeof props.canAdd === 'function') {
      canAdd = props.canAdd
    }

    if (canAdd(computedTaskNode.value)) {
      const newNode = nodeGenerator(type)
      addNode(computedTaskNode.value, newNode)
    }
  }
  const removeCurrentNode = () => {
    removeNode(computedTaskNode.value)
  }
</script>

<template>
  <div class="flow-node__wrapper task-node__wrapper">
    <div class="flow-node__content task-node__content">
      <div class="flow-node__header">
        <div class="flow-node__icon">
          <clipboard-check :size="20" />
        </div>
        <div class="flow-node__name" @click.stop="onNameEditing = true">
          <n-input
            v-show="onNameEditing"
            v-model:value="computedTaskNode.name"
            size="tiny"
            @blur="onNameEditing = false"
            @keyup.enter="onNameEditing = false"
          />
          <span v-show="!onNameEditing">{{ computedTaskNode.name }}</span>
        </div>
      </div>

      <div v-if="nodeCanRemove" class="flow-node__remove">
        <x-circle :size="24" @click="removeCurrentNode" />
      </div>

      <div class="flow-node__body">
        {{ computedTaskNode.name }} + {{ computedTaskNode.id }}
        <slot name="body"></slot>
      </div>
    </div>

    <node-behavior @click="addANode" />
  </div>
</template>
