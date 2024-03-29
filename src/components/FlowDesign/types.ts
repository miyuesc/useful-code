// nodes types

// 基础节点
export type BaseNode = {
  id: string
  type: BaseNodeType
  name: string
  next: BaseNode | null
  prev: BaseNode | null
  businessData: Record<string, unknown>
}
// 任务（审批）节点
export type TaskNode = BaseNode
// 抄送节点
export type CCNode = BaseNode
// 条件节点
export type ExpressionNode = BaseNode & {
  expression: string
  parent?: ConditionNode
}
// 整个条件体节点
export type ConditionNode = BaseNode & {
  expressions: ExpressionNode[]
  default?: ExpressionNode
}
export type NodeTypes = TaskNode | CCNode | ConditionNode | ExpressionNode

// export type BaseNodeType = keyof NodeTypes
export type BaseNodeType = 'task' | 'cc' | 'condition' | 'expression'

export type BranchNodeList = {
  expression: ExpressionNode
  nextNodeList: BaseNode[]
}

// rules
export type CanRuleValidator = (node?: BaseNode) => boolean
export type CanRemove = boolean | CanRuleValidator
export type CanAdd = boolean | CanRuleValidator
export type CanMove = boolean | CanRuleValidator
export type UserSyncValidator = (node: BaseNode) => Promise<boolean>
