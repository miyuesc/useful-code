// @ts-ignore
import { Message, MessageBox } from 'element-ui'

export type RawType =
  | 'string'
  | 'array'
  | 'boolean'
  | 'number'
  | 'object'
  | 'function'
  | 'regexp'
  | 'date'
export type Page = {
  pageNo?: number
  pageSize?: number
}

/* 空函数 */
export function noop(): void {}

/**
 * 校验非空
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

export function notNull(val: any): boolean {
  return val !== undefined && val !== null
}

/**
 * 返回数据原始类型
 * @param value
 * @return { RawType } type
 */
export function getRawType(value: any): RawType {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
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
  msg && Message.error(typeof msg === 'string' ? msg : msg.toString())
  return 0 // 作为 total 的返回
}

/**
 * 通用二次确认窗
 * @param { string } message 提示信息
 * @param { string } title 标题
 * @param { string } type 类型
 * @return { Promise } function
 */
export function confirmBox(message: string, title = '警告', type = 'warning'): void {
  return MessageBox.confirm(message, title, {
    type,
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
}
