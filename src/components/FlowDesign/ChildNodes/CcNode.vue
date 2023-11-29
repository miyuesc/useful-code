<script setup lang="ts">
  import type { CCNode, CanAdd, BaseNodeType } from '@/components/FlowDesign/types'
  import { computed, ComputedRef, Ref, ref } from 'vue'
  import { NInput } from 'naive-ui'
  import { Send, XCircle } from 'lucide-vue-next'
  import {
    addNode,
    idGenerator,
    moveNode,
    nodeGenerator,
    removeNode,
    setDragData
  } from '@/components/FlowDesign/utils'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'
  import { BaseNode } from '@/components/FlowDesign/types'
  import PropsGenerator from '@/components/FlowDesign/commonProps'

  const emits = defineEmits(['update:node', 'click'])
  const props = defineProps(PropsGenerator<CCNode>())

  const defaultNodeData: () => CCNode = () => ({
    id: 'task-' + idGenerator(),
    type: 'task',
    next: null,
    prev: null,
    name: '审批',
    businessData: {}
  })

  const computedCcNode = computed<CCNode>({
    get: () => props.node || defaultNodeData(),
    set: (node: CCNode) => emits('update:node', node)
  })
  const nodeCanRemove = computed(() => {
    if (typeof props.canRemove === 'function') {
      return props.canRemove(computedCcNode.value)
    }
    return props.canRemove
  })
  const nodeCanMove = computed(() => {
    if (typeof props.canMove === 'function') {
      return props.canMove(computedCcNode.value)
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

    if (canAdd(computedCcNode.value)) {
      const newNode = ref(nodeGenerator(type))
      addNode(computedCcNode, newNode)
    }
  }
  const removeCurrentNode = async () => {
    const valid = await props.removeValidator(computedCcNode.value)
    if (valid) {
      removeNode(computedCcNode)
    }
  }

  const initDrag = (event: DragEvent) => {
    setDragData(event, computedCcNode)
  }
  const setDropNode = (node: ComputedRef<BaseNode> | Ref<BaseNode>) => {
    if (node.value.id === computedCcNode.value.id) {
      return
    }
    moveNode(computedCcNode, node)
  }

  const emitClick = () => {
    emits('click', computedCcNode.value)
  }
</script>

<template>
  <div class="flow-node__wrapper cc-node__wrapper">
    <div
      class="flow-node__content cc-node__content"
      :draggable="nodeCanMove"
      @dragstart.stop="initDrag"
      @click.stop="emitClick"
    >
      <div class="flow-node__header">
        <div class="flow-node__icon">
          <send :size="20" />
        </div>
        <div class="flow-node__name" @click.stop="onNameEditing = true">
          <n-input
            v-show="onNameEditing"
            v-model:value="computedCcNode.name"
            size="tiny"
            @blur="onNameEditing = false"
            @keyup.enter="onNameEditing = false"
          />
          <span v-show="!onNameEditing">{{ computedCcNode.name }}</span>
        </div>
      </div>

      <div v-if="nodeCanRemove" class="flow-node__remove">
        <x-circle :size="24" @click.stop="removeCurrentNode" />
      </div>

      <div class="flow-node__body">
        {{ computedCcNode.name }} + {{ computedCcNode.id }}
        <slot name="body"></slot>
      </div>
    </div>

    <node-behavior @click="addANode" @drop="setDropNode" />
  </div>
</template>
