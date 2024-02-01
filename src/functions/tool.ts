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
export function notEmpty(val: unknown): boolean {
  if (!notNull(val)) {
    return false
  }
  if (isArray(val)) {
    return !!val.length
  }
  if (isObject(val)) {
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
export const getRawType = (value: unknown): RawType => {
  return toTypeString(value).slice(8, -1).toLowerCase() as RawType
}

export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isArray =
  Array.isArray || ((val: unknown): val is unknown[] => getRawType(val) === 'array')
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'
export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'
export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
  )
}

// 首字母大写
export const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export function sleep<T>(second = 3000, data?: T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), second)
  })
}
