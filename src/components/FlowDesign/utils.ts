import {
  BaseNode,
  BaseNodeType,
  CCNode,
  ConditionNode,
  ExpressionNode,
  TaskNode
} from '@/components/FlowDesign/types'
import { toRaw } from 'vue'

let id = 0

export const idGenerator = () => {
  id = id + 1
  return id
}

export function nodeGenerator(type: 'condition', bo?: Record<string, unknown>): ConditionNode
export function nodeGenerator(type: 'expression', bo?: Record<string, unknown>): ExpressionNode
export function nodeGenerator(type: 'task', bo?: Record<string, unknown>): TaskNode
export function nodeGenerator(type: 'cc', bo?: Record<string, unknown>): CCNode
export function nodeGenerator(type: BaseNodeType, bo?: Record<string, unknown>) {
  switch (type) {
    case 'condition':
      const expressionNode1: ExpressionNode = nodeGenerator('expression')
      const expressionNode2: ExpressionNode = nodeGenerator('expression')
      expressionNode1.idx = 1
      expressionNode2.idx = 2
      return {
        id: 'condition-' + idGenerator(),
        type: 'condition',
        name: '条件',
        prev: null,
        next: null,
        businessData: bo || {},
        expressions: {
          '1': expressionNode1,
          '2': expressionNode2
        }
      } as ConditionNode
    case 'expression':
      return {
        expression: '',
        idx: 0,
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

export const addNode = (curNode: BaseNode, newNode: BaseNode): BaseNode => {
  const nextNode = newNode
  const next = curNode.next
  nextNode.prev = curNode
  if (next) {
    nextNode.next = next
  }
  curNode.next = nextNode
  return nextNode
}

export const removeNode = (curNode: BaseNode): BaseNode => {
  const prev = curNode.prev
  const next = curNode.next
  if (prev) {
    prev.next = next
  }
  if (next) {
    next.prev = prev
  }
  return curNode
}

export const moveNode = (curNode: BaseNode, nextNode: BaseNode): BaseNode => {
  const prev = curNode.prev
  const next = curNode.next
  if (prev) {
    prev.next = next
  }
  if (next) {
    next.prev = prev
  }
  curNode.prev = nextNode
  curNode.next = nextNode.next
  if (nextNode.next) {
    nextNode.next.prev = curNode
  }
  nextNode.next = curNode
  return curNode
}
