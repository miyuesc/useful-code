import { notNull } from './tool'

/**
 * 简单合并对象一级属性，只有target 属性为 null或者undefined 时使用 source 中的对象的属性
 */
export function objectMerge<T extends Record<string, unknown>>(target: T, ...source: T[]) {
  const newObject: Record<string, unknown> = {}

  const getValue = (key: string): unknown | null => {
    const findRes = source.find((item) => notNull(item[key]))
    return findRes ? findRes[key] || null : null
  }
  for (const key of Object.keys(target)) {
    newObject[key] = notNull(target[key]) ? target[key] : getValue(key)
  }
  return newObject
}

/**
 * 对象转化为数组
 */
export function map2keyArr(source: Record<string, unknown>): unknown[] {
  const arr = []
  for (const key of Object.keys(source)) {
    arr.push(source[key])
  }
  return arr
}
