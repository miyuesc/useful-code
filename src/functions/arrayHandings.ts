import { getRawType, isArray, notEmpty, notNull } from './tool'

export type TreeNode = Record<string, any>

export type FlatProps = {
  key?: string
  children?: string
}
/**
 * 获取一个树节点的所有子节点数组 ( 场景：将一个组织的 code 与该组织的子组织 code 合并到一个数组 )
 * @param { Object } node 包含子节点的数据对象
 * @param { ?{children?: string, key?: string}} props 默认关键字
 * @return { Array[string] } 关键字数组
 */
export function getFlatNodeKey(
  node: TreeNode,
  props: FlatProps = { key: 'id', children: 'children' }
): string[] {
  const { key = 'id', children = 'children' } = props
  const result: string[] = []

  node[key] && result.push(<string>node[key])

  if (notEmpty(node[children])) {
    ;(node[children] as TreeNode[]).reduce((target: string[], child: TreeNode) => {
      if (notEmpty(child[children])) {
        target.push(...getFlatNodeKey(child, props))
      } else {
        child[key] && result.push(child[key] as string)
      }
      return result
    }, result)
  }

  return result
}

export type TreeNodeProps = {
  key?: string
  label?: string
  children?: string
}
/**
 * 获取一个数据在树形数组中对应的名称 ( 场景：根据code在组织树中查询对应的组织名称 )
 * @param { array } tree 包含子节点的数据对象
 * @param { * } value 当前查询的值, 一般是字符串或者数字
 * @param {{key?: string, label?: string, children?: string}} props 默认关键字(key: 查询值键名，label: 名称键名)
 * @param { ?boolean } splice 是否拼接
 * @return { string } 名称
 */
export function getTreeNodeLabel(
  tree: TreeNode[],
  value: unknown,
  props: TreeNodeProps = {},
  splice = false
): unknown | undefined {
  const { key = 'code', label = 'label', children = 'children' } = props
  for (const node of tree) {
    if (node[key] === value) {
      return node[label]
    }
    if (notEmpty(node[children])) {
      const res = getTreeNodeLabel(node[children] as TreeNode[], value, props, splice)
      if (res) {
        return splice ? `${node[label]}/${res}` : res
      }
    }
  }
  return undefined
}

export type Arr2MapProps = {
  label?: string
  value?: string
}

/**
 * 一维对象数组转对象，用于 校验 或者 formatter
 * @param {*[]} arr 对象数组
 * @param {{label: string, value: string}} props 参数配置
 * @return {{[string]:string|boolean}}
 */
export function arr2map(
  arr: TreeNode[] = [],
  props: Arr2MapProps = {}
): Record<string, TreeNode | boolean> {
  if (getRawType(arr) !== 'array') {
    return {}
  }
  const { label = 'label', value = 'value' } = props
  const result: Record<string, TreeNode | boolean> = {}

  arr.reduce((mMap, item) => {
    if (item[value] && typeof item[value] === 'string') {
      mMap[item[value] as string] = notNull(label) ? item[label] : true
    }
    return mMap
  }, result)

  return result
}

export type CascadeArr2MapProps = Arr2MapProps & {
  children?: string
  cascadeKey?: boolean
  separator?: string
}
/**
 * 级联对象数组转对象，用于 校验 或者 formatter
 * 例如 [{label: '123', value: 1, children: [{label: '124', value: 2}]}] 转换为 {1: '123', 2: '124'} 或者 {1: '123', '1-2': '124'}
 * @param { TreeNode[] } [arr] 对象数组
 * @param { CascadeArr2MapProps } [props] 参数配置 分隔符
 * @param { string } [props.label] 作为返回对象对应的键名的属性值
 * @param { string } [props.value] 作为返回对象的键的值
 * @param { boolean } [props.cascadeKey] 是否拼接
 * @param { string } [props.separator] 拼接符
 * @param { string } [prefix] 前缀
 * @return {{[string]:string|boolean}}
 */
export function cascadeArr2map(
  arr: TreeNode[] = [],
  props: CascadeArr2MapProps = {},
  prefix = ''
): Record<string, TreeNode | boolean> {
  if (getRawType(arr) !== 'array') {
    return {}
  }
  const {
    label = 'label',
    value = 'value',
    children = 'children',
    cascadeKey = false,
    separator = '-'
  } = props || {}

  const result: Record<string, TreeNode | boolean> = {}

  arr.reduce((mMap, item) => {
    const prefixKey: string = cascadeKey
      ? `${prefix}${separator}${item[value]}`
      : (item[value] as string)
    mMap[prefixKey] = notNull(item[label]) ? item[label] : true

    if (notEmpty(item[children])) {
      const childPrefixKey = cascadeKey ? prefixKey : prefix
      const childMap = cascadeArr2map(item[children] as TreeNode[], props, childPrefixKey)
      for (const key of Object.keys(childMap)) {
        mMap[key] = childMap[key]
      }
    }

    return mMap
  }, result)

  return result
}

/**
 * 根据条件函数删除元素，返回新数组
 * @param { unknown } arr
 * @param { Function } fn
 * @param { ?boolean } modifyMemory 修改内存地址
 * @returns { undefined | unknown[] }
 */
export function removeArrayItem(
  arr: unknown,
  fn: (...args: any) => boolean,
  modifyMemory?: boolean
): unknown[] | undefined {
  if (!arr || !isArray(arr)) {
    return
  }
  if (modifyMemory) {
    return arr.filter((...args) => !fn(...args))
  }
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      arr.splice(i, 1)
    }
  }
  return arr
}
