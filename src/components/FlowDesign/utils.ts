import {
  BaseNode,
  BaseNodeType,
  CCNode,
  ConditionNode,
  ExpressionNode,
  NodeTypes,
  TaskNode
} from '@/components/FlowDesign/types'
import { ComputedRef, isRef, Ref } from 'vue'

let id = 0

export const idGenerator = () => {
  id = id + 1
  return id
}

export function nodeGenerator(type: 'condition', bo?: Record<string, unknown>): ConditionNode
export function nodeGenerator(type: 'expression', bo?: Record<string, unknown>): ExpressionNode
export function nodeGenerator(type: 'task', bo?: Record<string, unknown>): TaskNode
export function nodeGenerator(type: 'cc', bo?: Record<string, unknown>): CCNode
export function nodeGenerator(type: BaseNodeType, bo?: Record<string, unknown>): NodeTypes
export function nodeGenerator(type: BaseNodeType, bo?: Record<string, unknown>): NodeTypes {
  switch (type) {
    case 'condition':
      const conditionNode: ConditionNode = {
        id: 'condition-' + idGenerator(),
        type: 'condition',
        name: '条件',
        prev: null,
        next: null,
        businessData: bo || {},
        expressions: []
      }
      const expressionNode1: ExpressionNode = nodeGenerator('expression')
      const expressionNode2: ExpressionNode = nodeGenerator('expression')
      expressionNode1.parent = conditionNode
      expressionNode2.parent = conditionNode
      conditionNode.expressions = [expressionNode1, expressionNode2]
      return conditionNode
    case 'expression':
      return {
        expression: '',
        id: `${type}-${idGenerator()}`,
        type: 'expression',
        name: '条件分支',
        prev: null,
        next: null,
        businessData: bo || {}
      } as ExpressionNode
    case 'cc':
      return {
        id: `${type}-${idGenerator()}`,
        type: 'cc',
        name: '抄送',
        prev: null,
        next: null,
        businessData: bo || {}
      } as CCNode
    case 'task':
      return {
        id: `${type}-${idGenerator()}`,
        type: 'task',
        name: '审批',
        prev: null,
        next: null,
        businessData: bo || {}
      } as TaskNode
    default:
      throw new Error('node type error')
  }
}

// 已有节点处理
export const nodeMaps: Record<BaseNode['id'], ComputedRef<BaseNode> | Ref<BaseNode>> = {}
export const setNodeInMap = (node: ComputedRef<BaseNode> | Ref<BaseNode>) => {
  nodeMaps[node.value.id] = node
}
export const getNodeInMap = (id: BaseNode['id']) => {
  return nodeMaps[id]
}
export const removeNodeInMap = (id: BaseNode['id']) => {
  const node = nodeMaps[id]
  delete nodeMaps[id]
  return node
}

// 节点增删改
export const addNode = (
  curNode: ComputedRef<BaseNode> | Ref<BaseNode>,
  newNode: ComputedRef<BaseNode> | Ref<BaseNode>
): ComputedRef<BaseNode> | Ref<BaseNode> => {
  const nextNode = curNode.value.next

  curNode.value.next = newNode.value
  newNode.value.prev = curNode.value

  if (nextNode) {
    nextNode.prev = newNode.value
    newNode.value.next = nextNode
  }

  setNodeInMap(newNode)

  return newNode
}
export const removeNode = (curNode: ComputedRef<BaseNode> | Ref<BaseNode> | BaseNode): BaseNode => {
  if (isRef(curNode)) {
    curNode = curNode.value
  }

  const prev = curNode.prev
  const next = curNode.next
  if (prev) {
    prev.next = next
  }
  if (next) {
    next.prev = prev
  }

  curNode.prev = null
  curNode.next = null

  removeNodeInMap(curNode.id)

  return curNode
}
export const moveNode = (
  targetNode: ComputedRef<BaseNode> | Ref<BaseNode>,
  node: ComputedRef<BaseNode> | Ref<BaseNode>
): ComputedRef<BaseNode> | Ref<BaseNode> => {
  removeNode(node)
  return addNode(targetNode, node)
}

// 节点拖动
export const setDragData = (event: DragEvent, node: Ref<BaseNode>) => {
  event.dataTransfer?.setData('text', node.value.id)
}
export const getDragData = (event: DragEvent) => {
  event.preventDefault()
  const id = event.dataTransfer?.getData('text')

  if (!id) {
    return
  }
  return getNodeInMap(id)
}
