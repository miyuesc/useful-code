import { useMessage } from "naive-ui";


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
