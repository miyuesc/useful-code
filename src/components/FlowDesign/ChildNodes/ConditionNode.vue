<script setup lang="ts">
  import { computed, ComputedRef, Ref, ref } from 'vue'
  import { NButton } from 'naive-ui'
  import {
    BaseNode,
    BaseNodeType,
    CanAdd,
    ConditionNode as ConditionNodeType,
    BranchNodeList
  } from '@/components/FlowDesign/types'
  import { addNode, moveNode, nodeGenerator } from '@/components/FlowDesign/utils'
  import PropsGenerator from '@/components/FlowDesign/commonProps'
  import NodeBehavior from '@/components/FlowDesign/ChildNodes/NodeBehavior.vue'
  import TaskNode from '@/components/FlowDesign/ChildNodes/TaskNode.vue'
  import CcNode from '@/components/FlowDesign/ChildNodes/CcNode.vue'
  import ExpressionNode from '@/components/FlowDesign/ChildNodes/ExpressionNode.vue'
  import ConditionNode from '@/components/FlowDesign/ChildNodes/ConditionNode.vue'

  const emits = defineEmits(['update:node', 'click'])
  const props = defineProps(PropsGenerator<ConditionNodeType>())

  const defaultNodeData: () => ConditionNodeType = () => nodeGenerator('condition')
  const nodeTypeMaps = {
    task: TaskNode,
    cc: CcNode,
    condition: ConditionNode,
    expression: ExpressionNode
  }

  const computedConditionNode = computed<ConditionNodeType>({
    get: () => props.node || defaultNodeData(),
    set: (node: ConditionNodeType) => emits('update:node', node)
  })

  const nextNodeTraversal = (node: BaseNode | null): BaseNode[] => {
    if (!node) {
      return []
    }
    const list: BaseNode[] = []
    let curNode: BaseNode | null = node
    while (curNode) {
      list.push(curNode)
      curNode = curNode.next
    }
    return list
  }
  const branchesNodeList = computed<BranchNodeList[]>(() => {
    const branches: BranchNodeList[] = []
    const expressions = computedConditionNode.value.expressions
    for (const ex of expressions) {
      branches.push({
        expression: ex,
        nextNodeList: nextNodeTraversal(ex.next)
      })
    }
    return branches
  })

  const addExpression = () => {
    const newExpression = nodeGenerator('expression')
    newExpression.parent = computedConditionNode.value
    computedConditionNode.value.expressions.push(newExpression)
  }

  const addANode = (type: BaseNodeType) => {
    let canAdd: CanAdd
    if (typeof props.canAdd === 'function') {
      canAdd = props.canAdd
    } else {
      canAdd = () => props.canAdd as boolean
    }

    if (canAdd(computedConditionNode.value)) {
      const newNode = ref(nodeGenerator(type))
      addNode(computedConditionNode, newNode)
    }
  }

  const setDropNode = (node: ComputedRef<BaseNode> | Ref<BaseNode>) => {
    if (node.value.id === computedConditionNode.value.id) {
      return
    }
    moveNode(computedConditionNode, node)
  }
</script>

<template>
  <div class="flow-node__wrapper condition-node__wrapper">
    <div class="flow-node__content condition-node__content">
      <div class="condition-node__branch">
        <n-button round type="info" @click="addExpression">添加条件</n-button>
      </div>

      <div class="condition-node__branches">
        <div
          v-for="(branch, bi) in branchesNodeList"
          :key="branch.expression.id"
          class="branch-col"
        >
          <expression-node
            v-model:node="branchesNodeList[bi].expression"
            :idx="bi"
            :can-remove="props.canRemove"
            :can-add="props.canAdd"
            :can-move="props.canMove"
            :remove-validator="props.removeValidator"
            @click="emits('click', $event)"
          />
          <template v-for="(nextNode, i) in branch.nextNodeList" :key="nextNode.id">
            <component
              :is="nodeTypeMaps[nextNode.type]"
              v-model:node="branch.nextNodeList[i]"
              :can-remove="props.canRemove"
              :can-add="props.canAdd"
              :can-move="props.canMove"
              :remove-validator="props.removeValidator"
              @click="emits('click', $event)"
            />
          </template>
        </div>
      </div>
    </div>

    <node-behavior @click="addANode" @drop="setDropNode" />
  </div>
</template>
