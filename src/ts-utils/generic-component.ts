import type { DefineComponent } from 'vue'

export type GenericComponentInstance<T> = T extends new (...args: any[]) => infer R
  ? R
  : T extends (...args: any[]) => infer R
  ? R extends { __ctx?: infer K }
    ? Exclude<K, void> extends { expose: (...args: infer K) => void }
      ? K[0] & InstanceType<DefineComponent>
      : any
    : any
  : any
