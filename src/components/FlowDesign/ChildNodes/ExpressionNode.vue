<script setup lang="ts">
  import type { ExpressionNode, CanAdd, BaseNodeType } from '@/components/FlowDesign/types'
  import { computed, ComputedRef, type PropType, Ref, ref } from 'vue'
  import { NInput } from 'naive-ui'
  import { GitMerge, XCircle } from 'lucide-vue-next'
  import { addNode, moveNode, nodeGenerator, removeNode } from '@/components/FlowDesign/utils'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'
  import { BaseNode } from '@/components/FlowDesign/types'
  import PropsGenerator from '@/components/FlowDesign/commonProps'

  const emits = defineEmits(['update:node', 'click'])
  const props = defineProps({
    idx: {
      type: Number as PropType<number>,
      default: 0
    },
    ...PropsGenerator<ExpressionNode>()
  })

  const defaultNodeData: () => ExpressionNode = () => nodeGenerator('expression')
  const computedExpressionNode = computed<ExpressionNode>({
    get: () => props.node || defaultNodeData(),
    set: (node: ExpressionNode) => emits('update:node', node)
  })
  const nodeCanRemove = computed(() => {
    if (typeof props.canRemove === 'function') {
      return props.canRemove(computedExpressionNode.value)
    }
    return props.canRemove
  })

  const onNameEditing = ref<boolean>(false)

  const addANode = (type: BaseNodeType) => {
    let canAdd: CanAdd
    if (typeof props.canAdd === 'function') {
      canAdd = props.canAdd
    } else {
      canAdd = () => props.canAdd as boolean
    }

    if (canAdd(computedExpressionNode.value)) {
      const newNode = ref(nodeGenerator(type))
      addNode(computedExpressionNode, newNode)
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

  const setDropNode = (node: ComputedRef<BaseNode> | Ref<BaseNode>) => {
    if (node.value.id === computedExpressionNode.value.id) {
      return
    }
    moveNode(computedExpressionNode, node)
  }

  const emitClick = () => {
    emits('click', computedExpressionNode.value)
  }
</script>

<template>
  <div class="flow-node__wrapper expression-node__wrapper">
    <div class="flow-node__behavior small-behavior"></div>
    <div class="flow-node__content expression-node__content" @click.stop="emitClick">
      <div class="flow-node__header">
        <div class="flow-node__icon">
          <git-merge :size="20" />
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
        <x-circle :size="24" @click="removeCurrentNode" />
      </div>

      <div class="flow-node__body">
        {{ computedExpressionNode.name }} + {{ computedExpressionNode.id }}
        <slot name="body"></slot>
      </div>
    </div>

    <node-behavior @click="addANode" @drop="setDropNode" />
  </div>
</template>
