import request from './axios'

const JJBaseUrl = '/JJ' as const
// const JJBaseUrl = 'https://api.juejin.cn' as const

const dataCard =
  JJBaseUrl + '/content_api/v1/author_center/data/card?aid=2608&uuid=7222635036939896380&spider=0'
const dataCardBody = {
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
}

export const getCreatorDailyCards = () => {
  return request(dataCard, {
    method: 'POST',
    data: JSON.stringify(dataCardBody)
  })
}
