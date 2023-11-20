// 演示的默认类型
type A = {
  1: undefined
  foo: number
  bar: string
  c: boolean
}

// 根据 T 中值为 F 的键生成类型
export type FilterValueRecord<T, F> = {
  [K in keyof T as T[K] extends F ? K : never]: T[K]
}
// example
type B1 = FilterValueRecord<A, string | boolean>
const b: B1 = {
  c: true,
  bar: '2'
}

// 根据 T 类型中键的类型为 F 生成新类型
export type FilterKeysRecord<T, F> = {
  [K in keyof T as K extends F ? K : never]: T[K]
}
// example
type B2 = FilterKeysRecord<A, 'foo' | 'bar'>
const b2: B2 = {
  foo: 1,
  bar: '1'
}

// 根据 T 类型重新生成一个新规则的键类型 U 的类型
export type PrefixRemap<T, S extends string | number> = {
  [K in keyof T as `${S}-${Extract<K, string | number>}`]: T[K]
}
// example
type B3 = PrefixRemap<A, 'string'>
const d: B3 = {
  'string-1': undefined,
  'string-foo': 1,
  'string-bar': '1',
  'string-c': true
}

// 根据 T 类型重新生成一个新规则的键类型 U 的类型
export type SuffixRemap<T, S extends string | number> = {
  [K in keyof T as `${Extract<K, string | number>}-${S}`]: T[K]
}
