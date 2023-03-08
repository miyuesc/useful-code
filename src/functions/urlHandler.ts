export function getRequestQuery(): Record<string, unknown> {
  const url = location.search //获取url中"?"符后的字串
  const theRequest: Record<string, unknown> = Object.create(null)

  if (url.indexOf('?') !== -1) {
    const str = url.substr(1)
    const strArr = str.split('&')
    for (let i = 0; i < strArr.length; i++) {
      theRequest[strArr[i].split('=')[0]] = decodeURI(strArr[i].split('=')[1])
    }
  }
  return theRequest
}

export function getQueryString(name: string): string | undefined {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.slice(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return undefined
}
