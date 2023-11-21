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
  import { Send } from 'lucide-vue-next'
  import { addNode, idGenerator, nodeGenerator, removeNode } from '@/components/FlowDesign/utils'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'

  const emits = defineEmits(['update:node'])
  const props = defineProps({
    node: {
      type: Object as PropType<CCNode>,
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
    set: (node: CCNode) => emits('update:node', { ...node })
  })
  const nodeCanRemove = computed(() => {
    return props.canRemove(computedCcNode.value)
  })

  const onNameEditing = ref<boolean>(false)

  const addANode = (type: BaseNodeType) => {
    let canAdd: CanAdd = () => true
    if (props.canAdd && typeof props.canAdd === 'function') {
      canAdd = props.canAdd
    }

    if (canAdd(computedCcNode.value)) {
      const newNode = nodeGenerator(type)
      addNode(computedCcNode.value, newNode)
    }
  }
  const removeCurrentNode = () => {
    removeNode(computedCcNode.value)
  }
</script>

<template>
  <div class="flow-node__wrapper cc-node__wrapper">
    <div class="flow-node__content cc-node__content">
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
        <lucide-icon name="XCircle" :size="24" @click="removeCurrentNode" />
      </div>

      <div class="flow-node__body">
        {{ computedCcNode.name }} + {{ computedCcNode.id }}
        <slot name="body"></slot>
      </div>
    </div>

    <node-behavior @click="addANode" />
  </div>
</template>
