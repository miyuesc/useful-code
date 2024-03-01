import { ref } from 'vue'

export type ResponseData = {
  result?: unknown[]
  totalNum?: number
  msg?: string
}

export type DataRequest = (search?: unknown) => Promise<unknown>
export type ResponseDataTransfer = (response: unknown) => ResponseData
export type Page = {
  pageNo: number
  pageSize: number
}
export type ErrorHandling = (errorMsg?: string) => unknown

export default function (
  httpRequest: DataRequest,
  responseTransfer?: ResponseDataTransfer,
  errorHanding?: ErrorHandling
) {
  const tableData = ref<unknown[]>([])
  const page = ref<Page>({
    pageNo: 1,
    pageSize: 10
  })
  const total = ref<number>(0)

  const getTableData = async <T extends {}>(searchForm?: T) => {
    try {
      const data = await httpRequest({ ...searchForm, ...page.value })

      if (responseTransfer) {
        const { result, totalNum } = responseTransfer(data)

        if (result && result.length) {
          tableData.value = result
          total.value = totalNum || 0
        } else {
          emptyTableData()
        }
      } else {
        const { result, totalNum, msg } = data as ResponseData

        if (result && result.length) {
          tableData.value = result
          total.value = totalNum || 0
        } else {
          errorHanding && errorHanding(msg)
          emptyTableData()
        }
      }
    } catch (e) {
      console.error(e)
      emptyTableData()
    }
  }

  const currentPageChanged = (pageNo: number) => {
    page.value.pageNo = pageNo
    getTableData && getTableData()
  }
  const currentSizeChanged = (pageSize: number) => {
    page.value.pageSize = pageSize
    getTableData && getTableData()
  }
  const emptyTableData = () => {
    tableData.value = []
    total.value = 0
    page.value = {
      pageNo: 1,
      pageSize: 10
    }
  }

  return {
    tableData,
    page,
    total,
    getTableData,
    currentPageChanged,
    currentSizeChanged,
    emptyTableData
  } as const
}
