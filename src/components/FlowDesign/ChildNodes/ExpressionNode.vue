<script setup lang="ts">
  import type {
    ExpressionNode,
    CanRemove,
    CanAdd,
    CanMove,
    BaseNodeType
  } from '@/components/FlowDesign/types'
  import { computed, type PropType, ref } from 'vue'
  import { NInput } from 'naive-ui'
  import { addNode, nodeGenerator, removeNode } from '@/components/FlowDesign/utils'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'
  import LucideIcon from '@/components/LucideIcon/LucideIcon.vue'

  const emits = defineEmits(['update:node'])
  const props = defineProps({
    node: {
      type: Object as PropType<ExpressionNode>,
      default: () => null
    },
    idx: {
      type: Number as PropType<number>,
      default: 0
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

  const defaultNodeData: () => ExpressionNode = () => nodeGenerator('expression')
  const computedExpressionNode = computed<ExpressionNode>({
    get: () => props.node || defaultNodeData(),
    set: (node: ExpressionNode) => emits('update:node', { ...node })
  })
  const nodeCanRemove = computed(() => {
    return props.canRemove(computedExpressionNode.value)
  })

  const onNameEditing = ref<boolean>(false)

  const addANode = (type: BaseNodeType) => {
    let canAdd: CanAdd = () => true
    if (props.canAdd && typeof props.canAdd === 'function') {
      canAdd = props.canAdd
    }

    if (canAdd(computedExpressionNode.value)) {
      // @ts-ignore
      const newNode = nodeGenerator(type)
      addNode(computedExpressionNode.value, newNode)
    }
  }
  const removeCurrentNode = () => {
    const parent = computedExpressionNode.value.parent!

    if (parent.expressions.length > 1) {
      parent?.expressions.splice(props.idx, 1)
    } else {
      removeNode(parent)
    }
  }
</script>

<template>
  <div class="flow-node__wrapper expression-node__wrapper">
    <div class="flow-node__behavior small-behavior"></div>
    <div class="flow-node__content expression-node__content">
      <div class="flow-node__header">
        <div class="flow-node__icon">
          <lucide-icon name="GitMerge" :size="20" />
        </div>
        <div class="flow-node__name" @click.stop="onNameEditing = true">
          <n-input
            v-show="onNameEditing"
            v-model:value="computedExpressionNode.name"
            size="tiny"
            @blur="onNameEditing = false"
            @keyup.enter="onNameEditing = false"
          />
          <span v-show="!onNameEditing">{{ computedExpressionNode.name }}</span>
        </div>
      </div>

      <div v-if="nodeCanRemove" class="flow-node__remove">
        <lucide-icon name="XCircle" :size="24" @click="removeCurrentNode" />
      </div>

      <div class="flow-node__body">
        {{ computedExpressionNode.name }} + {{ computedExpressionNode.id }}
        <slot name="body"></slot>
      </div>
    </div>

    <node-behavior @click="addANode" />
  </div>
</template>
