import { useMessage } from 'naive-ui'

export type RawType =
  | 'string'
  | 'array'
  | 'boolean'
  | 'number'
  | 'object'
  | 'function'
  | 'regexp'
  | 'date'
  | 'symbol'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'

export const NOOP = (): void => {}

/**
 * Always return false.
 */
export const NO = (): false => false

/**
 * 变量、对象、数组 简易非空校验
 * @param {*} val
 * @return boolean
 */
export function notEmpty(val: any): boolean {
  if (!notNull(val)) {
    return false
  }
  if (getRawType(val) === 'array') {
    return !!val.length
  }
  if (getRawType(val) === 'object') {
    return !!Object.keys(val).length
  }
  return true
}

/**
 * 非空判断
 * @param {*} val
 * @return boolean
 */
export function notNull(val: unknown): boolean {
  return val !== undefined && val !== null
}

export const toTypeString = (value: unknown): string => Object.prototype.toString.call(value)
export const getRawType = (value: any): RawType => {
  return toTypeString(value).slice(8, -1).toLowerCase() as RawType
}

export const isArray = Array.isArray || ((arg: unknown) => getRawType(arg) === 'array')
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
export const isPlainObject = (val: unknown): val is object => getRawType(val) === 'object'
export const isDate = (val: unknown): val is Date => getRawType(val) === 'date'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

// 首字母大写
export const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export type Page = {
  pageNo?: number
  pageSize?: number
}
/**
 * 重置一个空表格
 * @param tableCallback 处理表格为空
 * @param page 分页数据的引用地址
 * @param { string | Error } msg 错误信息
 * @return { number } total 返回数据总数，总是返回 0
 */
export function emptyTable(tableCallback?: () => unknown, page?: Page, msg?: string | Error): 0 {
  tableCallback && tableCallback()
  page && page.pageNo && (page.pageNo = 1)
  msg && useMessage().error(typeof msg === 'string' ? msg : msg.toString())
  return 0 // 作为 total 的返回
}

export function sleep<T>(second = 3000, data?: T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), second)
  })
}
