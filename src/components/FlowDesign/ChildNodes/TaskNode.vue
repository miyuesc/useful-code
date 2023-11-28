<script setup lang="ts">
  import type { TaskNode, CanAdd, BaseNodeType, BaseNode } from '@/components/FlowDesign/types'
  import { computed, ref } from 'vue'
  import { NInput } from 'naive-ui'
  import { ClipboardCheck, XCircle } from 'lucide-vue-next'
  import {
    addNode,
    idGenerator,
    moveNode,
    nodeGenerator,
    removeNode,
    setDragData
  } from '@/components/FlowDesign/utils'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'
  import PropsGenerator from '@/components/FlowDesign/commonProps'

  const emits = defineEmits(['update:node', 'click'])
  const props = defineProps(PropsGenerator<TaskNode>())

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
    if (typeof props.canRemove === 'function') {
      return props.canRemove(computedTaskNode.value)
    }
    return props.canRemove
  })
  const nodeCanMove = computed(() => {
    if (typeof props.canMove === 'function') {
      return props.canMove(computedTaskNode.value)
    }
    return props.canMove
  })

  const onNameEditing = ref<boolean>(false)

  const addANode = (type: BaseNodeType) => {
    let canAdd: CanAdd
    if (typeof props.canAdd === 'function') {
      canAdd = props.canAdd
    } else {
      canAdd = () => props.canAdd as boolean
    }

    if (canAdd(computedTaskNode.value)) {
      const newNode = nodeGenerator(type)
      addNode(computedTaskNode.value, newNode)
    }
  }
  const removeCurrentNode = () => {
    removeNode(computedTaskNode.value)
  }

  const initDrag = (event: DragEvent) => {
    setDragData(event, computedTaskNode.value)
  }
  const setDropNode = (node: BaseNode) => {
    moveNode(computedTaskNode.value, node)
  }

  const emitClick = () => {
    emits('click', computedTaskNode.value)
  }
</script>

<template>
  <div class="flow-node__wrapper task-node__wrapper">
    <div
      class="flow-node__content task-node__content"
      :draggable="nodeCanMove"
      @dragstart.stop="initDrag"
      @click.stop="emitClick"
    >
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

    <node-behavior @click="addANode" @drop="setDropNode" />
  </div>
</template>
