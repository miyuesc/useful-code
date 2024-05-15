// ==UserScript==
// @name         掘金一键导出
// @description  掘金 文章/小册/专栏/收藏集 一键导出
// @version      0.0.3
// @author       miyuefe
// @namespace    https://github.com/miyuesc
// @match        https://juejin.cn/post/*
// @match        https://juejin.cn/book/*
// @match        https://juejin.cn/column/*
// @match        https://juejin.cn/collection/*
// @grant        none
// @license      MIT
// ==/UserScript==

const svgDownloadBtn = `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <path d="M811 84c76.215 0 138 61.785 138 138v610c0 76.215-61.785 138-138 138H201c-76.215 0-138-61.785-138-138V222c0-76.215 61.785-138 138-138h610zM511.753 300.322c-16.522 0-29.917 13.394-29.917 29.917v350.578L346.453 546.069l-0.563-0.547c-11.748-11.105-30.275-10.879-41.746 0.646-11.656 11.71-11.611 30.653 0.1 42.309l161.317 160.56 0.761 0.746c25.276 24.354 65.511 24.01 90.365-0.96l158.007-160.567 0.543-0.566c11.039-11.81 10.707-30.336-0.883-41.741-11.777-11.589-30.718-11.437-42.307 0.34L541.67 678.777V330.239c0-16.523-13.394-29.917-29.917-29.917z" fill="#1E80FF" p-id="5206"></path>
</svg>`

let pageFlag = 'book' // book, column, collection, post

const baseUrl = 'https://api.juejin.cn'

// 请求
const post = async (url, data, config = {}) => {
  const response = await fetch(url, {
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
    method: 'POST',
    ...config
  })
  return await response.json()
}
// 通用终止轮询判断
const commonPollingOver = (responseData) => {
  return responseData.err_no !== 0 || !responseData.data || !responseData.data.length
}
const commonValuePick = (responseData) => {
  return responseData.data
}
// 通用轮询请求
const commonPollingRequest = async (
  url,
  requestBodyGenerator,
  overPolling = commonPollingOver,
  valuePick = commonValuePick
) => {
  const resList = []
  let idx = 0
  let badCount = 0
  let lastResponse = null
  console.log('循环请求开始~')
  console.log('请求地址：', url)
  console.log('requestBodyGenerator：', requestBodyGenerator)
  while (true) {
    const requestBody = requestBodyGenerator(idx, lastResponse)

    let res = await post(url, requestBody)

    // 有可能网络异常，数据请求不到，那就重复5次
    while ((!res || !res.data) && badCount < 5) {
      res = await post(url, requestBody)
      badCount++
    }

    // 五次之后还是有问题就抛出异常（事不过五）
    if (badCount >= 5) {
      throw new Error(url + ' 请求故障，请重试！')
    }

    if (overPolling(res)) {
      console.log('循环请求结束~')
      break
    }
    resList.push(...valuePick(res))

    lastResponse = res
    badCount = 0

    idx++
  }
  return resList
}

// 小册目录列表
const getSectionList = async () => {
  const booklet_id = $nuxt.context.params.id
  const { data } = await post(`${baseUrl}/booklet_api/v1/booklet/get`, { booklet_id })
  return data.sections
}
// 专栏文章列表
const getColumnsList = async () => {
  const column_id = $nuxt.context.params.id
  const url = `${baseUrl}/content_api/v1/column/articles_cursor`
  const requestBodyGenerator = (idx, lastResponse) => {
    return {
      column_id,
      limit: 20,
      cursor: lastResponse ? lastResponse.cursor : '0'
    }
  }
  return await commonPollingRequest(url, requestBodyGenerator)
}
// 收藏集文章列表
const getCollectionList = async () => {
  const collection_id = $nuxt.context.params.id
  const url = `${baseUrl}/interact_api/v2/collectionset/detail`
  const requestBodyGenerator = (idx, lastResponse) => {
    return {
      collection_id,
      limit: 20,
      cursor: lastResponse ? lastResponse.cursor : '0'
    }
  }
  const pollingOver = (response) => {
    return response.err_no !== 0 || !response.data || !response.data.articles.length
  }
  const valuePick = (response) => {
    return response.data.articles
  }
  return await commonPollingRequest(url, requestBodyGenerator, pollingOver, valuePick)
}
// 普通文章内容
const getArticleMarkdownContent = async (article_id) => {
  const { data } = await post(`${baseUrl}/content_api/v1/article/detail`, {
    article_id: article_id,
    need_theme: false
  })
  const { article_info } = data
  return { title: article_info.title, content: article_info.mark_content }
}
// 小册章节内容
const getBookMarkdownContent = async (section_id) => {
  const { data } = await post(
    `${baseUrl}/booklet_api/v1/section/get`,
    { section_id },
    { credentials: 'include' }
  )
  const { title, markdown_show } = data.section
  return { title, content: markdown_show }
}

// 文件保存
async function saveFile(index, name, content) {
  const blob = new Blob([content], { type: 'text/plain' })
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.download = index.toFixed(0).padStart(3, 0) + '.' + name + '.md'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const btnId = 'download-juejin-book-monkey'
const articlesGetterMap = {
  book: getSectionList,
  column: getColumnsList,
  collection: getCollectionList
}
const contentGetterMap = {
  book: getBookMarkdownContent,
  column: getArticleMarkdownContent,
  collection: getArticleMarkdownContent
}

function createCustomBtn() {
  const newBtn = document.createElement('a')
  newBtn.innerHTML = svgDownloadBtn.replace('%color', 'black')
  newBtn.className = 'custom-btn '
  newBtn.id = btnId
  newBtn.setAttribute('target', '_blank')
  newBtn.setAttribute('style', 'cursor: pointer;padding:8px;z-index: 999;')
  newBtn.onmouseenter = (e) => {
    newBtn.style.setProperty('filter', 'drop-shadow(0px 0px 10px deepskyblue)')
  }
  newBtn.onmouseleave = (e) => {
    newBtn.style.removeProperty('filter')
  }

  newBtn.setAttribute('title', 'Download')

  newBtn.addEventListener('click', async () => {
    if (pageFlag === 'post') {
      const { title, content } = await getArticleMarkdownContent($nuxt.context.params.id)
      await saveFile(0, title, content)
      return
    }

    const sections = await articlesGetterMap[pageFlag]()

    for (let i = 0; i < sections.length; i++) {
      const id = pageFlag === 'book' ? sections[i].section_id : sections[i].article_id

      const { title, content } = await contentGetterMap[pageFlag](id)

      await saveFile(i + 1, title, content)
    }
  })
  return newBtn
}

const timer = setInterval(() => {
  let title
  if (window.location.href.startsWith('https://juejin.cn/book/')) {
    pageFlag = 'book'
    title = document.querySelector('.book-content__header>div.title')
  } else if (window.location.href.startsWith('https://juejin.cn/column/')) {
    pageFlag = 'column'
    title = document.querySelector('.column-info>h1.title.web-title')
  } else if (window.location.href.startsWith('https://juejin.cn/collection/')) {
    pageFlag = 'collection'
    title = document.querySelector(
      '.collection-view>header.collection-header div.title div.content'
    )
  } else if (window.location.href.startsWith('https://juejin.cn/post/')) {
    pageFlag = 'post'
    title = document.querySelector('article.article > h1.article-title')
  }

  if (title && title.querySelector(`#${btnId}`)) {
    return clearInterval(timer)
  }
  if (!title) {
    return
  }

  const btn = createCustomBtn()
  title.appendChild(btn)
}, 1000)
