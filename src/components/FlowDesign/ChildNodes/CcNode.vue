<script setup lang="ts">
  import type {
    BaseNode,
    CCNode,
    CanRemove,
    CanAdd,
    CanMove,
    BaseNodeType
  } from '@/components/FlowDesign/types'
  import { computed, type PropType, ref } from 'vue'
  import { NInput } from 'naive-ui'
  import { addNode, idGenerator, nodeGenerator, removeNode } from '@/components/FlowDesign/utils'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'
  import LucideIcon from '@/components/LucideIcon/LucideIcon.vue'
  import TaskNode from '@/components/FlowDesign/ChildNodes/TaskNode.vue'

  const props = defineProps({
    node: {
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
  const emit = defineEmits(['update:node'])

  const defaultNodeData: CCNode = {
    id: 'cc-' + idGenerator(),
    type: 'cc',
    next: null,
    prev: null,
    name: '抄送',
    businessData: {}
  }

  const nodeBack = computed<BaseNode>(() => ({ ...defaultNodeData, ...(props.node || {}) }))

  const onNameEditing = ref<boolean>(false)

  const nodeCanRemove = computed(() => {
    if (!nodeBack.value.prev || nodeBack.value.type === 'expression') {
      return false
    }
    if (!props.canRemove || typeof props.canRemove !== 'function') {
      return true
    }
    return props.canRemove(nodeBack.value)
  })

  const addANode = (type: BaseNodeType) => {
    let canAdd: CanAdd = () => true
    if (props.canAdd && typeof props.canAdd === 'function') {
      canAdd = props.canAdd
    }

    if (canAdd(nodeBack.value)) {
      const curNode: CCNode = { ...nodeBack.value }
      // @ts-ignore
      const newNode = nodeGenerator(type)
      addNode(curNode, newNode)
      emit('update:node', { ...curNode })
    }
  }
  const removeCurrentNode = () => {
    const curNode: CCNode = { ...nodeBack.value }
    removeNode(curNode)
    emit('update:node', { ...curNode })
  }
</script>

<template>
  <div class="flow-node__wrapper task-node__wrapper">
    <div class="flow-node__content task-node__content">
      <div class="flow-node__header">
        <div class="flow-node__icon">
          <lucide-icon name="Send" :size="20" />
        </div>
        <div class="flow-node__name" @click.stop="onNameEditing = true">
          <n-input
            v-show="onNameEditing"
            v-model:value="nodeBack.name"
            size="tiny"
            @blur="onNameEditing = false"
            @keyup.enter="onNameEditing = false"
          />
          <span v-show="!onNameEditing">{{ nodeBack.name }}</span>
        </div>
      </div>

      <div v-if="nodeCanRemove" class="flow-node__remove">
        <lucide-icon name="XCircle" :size="24" @click="removeCurrentNode" />
      </div>

      <div class="flow-node__body">
        {{ nodeBack.name }} + {{ nodeBack.id }}
        <slot name="body"></slot>
      </div>
    </div>

    <node-behavior @click="addANode" />

    <task-node
      v-if="nodeBack.next?.type === 'task'"
      v-model:node="nodeBack.next"
      :can-remove="canRemove"
      :can-add="canAdd"
      :can-move="canMove"
    />
    <cc-node
      v-if="nodeBack.next?.type === 'cc'"
      v-model:node="nodeBack.next"
      :can-remove="canRemove"
      :can-add="canAdd"
      :can-move="canMove"
    />
  </div>
</template>
