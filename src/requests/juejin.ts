import { createFetch } from '@vueuse/core'

const JJBaseUrl = 'https://api.juejin.cn' as const

const useJJFetch = createFetch({
  // baseUrl: JJBaseUrl,
  options: {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        Cookie: `csrf_session_id=12a90d8fdc4c9a9d14d862d1ae1d6057; _tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227221030193568564768%2522%252C%2522user_unique_id%2522%253A%25227221030193568564768%2522%252C%2522timestamp%2522%253A1681277122377%257D; passport_csrf_token=2c32e8a619e6f627c0644d59c6645354; passport_csrf_token_default=2c32e8a619e6f627c0644d59c6645354; n_mh=B7_vBc-2XU_yVz25zdKbDp0WRp0eJctI-cS0VMrYTvc; sid_guard=4138ff53f9c3ae6fd063d1bbc0eee7af%7C1681277144%7C31536000%7CThu%2C+11-Apr-2024+05%3A25%3A44+GMT; uid_tt=65a184712d40d89bce28b8a4fda65e4a; uid_tt_ss=65a184712d40d89bce28b8a4fda65e4a; sid_tt=4138ff53f9c3ae6fd063d1bbc0eee7af; sessionid=4138ff53f9c3ae6fd063d1bbc0eee7af; sessionid_ss=4138ff53f9c3ae6fd063d1bbc0eee7af; sid_ucp_v1=1.0.0-KDg5MzdiZmM3NDI1Njg1MGQ2NTc0OTVlNDdiZDdkNTA1MTlmMjdkNzcKFwjHs7DA_fWpARDYgdmhBhiwFDgCQO8HGgJsZiIgNDEzOGZmNTNmOWMzYWU2ZmQwNjNkMWJiYzBlZWU3YWY; ssid_ucp_v1=1.0.0-KDg5MzdiZmM3NDI1Njg1MGQ2NTc0OTVlNDdiZDdkNTA1MTlmMjdkNzcKFwjHs7DA_fWpARDYgdmhBhiwFDgCQO8HGgJsZiIgNDEzOGZmNTNmOWMzYWU2ZmQwNjNkMWJiYzBlZWU3YWY; store-region=cn-cq; store-region-src=uid`
      }
      return { options }
    }
  },
  fetchOptions: {
    mode: 'cors',
    credentials: 'include'
  }
})

export const getCreatorDailyCards = () => {
  return fetch(
    JJBaseUrl +
      '/content_api/v1/author_center/data/card?aid=2608&uuid=7222635036939896380&spider=0',
    {
      method: 'POST',
      body: JSON.stringify({
        datas: [
          'all_article',
          'all_article_display',
          'all_article_view',
          'all_article_digg',
          'all_article_comment',
          'all_article_collect',
          'all_column',
          'all_column_follow',
          'all_follower',
          'incr_active_follower',
          'incr_do_follower',
          'incr_undo_follower',
          'incr_follower'
        ],
        user_id: '747323639208391'
      }),
      headers: {
        'User-agent': window.navigator.userAgent,
        'content-type': 'application/json',

        Host: 'api.juejin.cn',
        accept: '*/*',
        'accept-language': 'zh-cn',
        origin: 'https://juejin.cn',
        referer: 'https://juejin.cn/'
      }
    }
  )
  // return useJJFetch(
  //   '/JJ/content_api/v1/author_center/data/card?aid=2608&uuid=7222635036939896380&spider=0',
  //   {
  //     beforeFetch(ctx) {
  //       ctx.options.method = 'POST'
  //       ctx.options.body = JSON.stringify({
  //         datas: [
  //           'all_article',
  //           'all_article_display',
  //           'all_article_view',
  //           'all_article_digg',
  //           'all_article_comment',
  //           'all_article_collect',
  //           'all_column',
  //           'all_column_follow',
  //           'all_follower',
  //           'incr_active_follower',
  //           'incr_do_follower',
  //           'incr_undo_follower',
  //           'incr_follower'
  //         ],
  //         user_id: '747323639208391'
  //       })
  //       return ctx
  //     }
  //   }
  // )
}
