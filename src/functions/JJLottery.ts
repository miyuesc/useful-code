/*************** 掘金抽奖代码 ******************/
// 评论列表
export function getCommentList(): string[] {
  return [
    ...document
      .querySelectorAll('.comment-list.comment-list .comment-main>.user-box .name')
      // @ts-ignore
      .values()
  ].map((i) => i.innerText)
}
// 点赞列表
export function getLikeList(): string[] {
  if (!document.getElementsByClassName('user-list')) {
    throw Error('请先打开点赞列表')
  }
  // @ts-ignore
  return [...document.querySelectorAll('.user-list .item .info-box .name').values()].map(
    (i) => i.innerText
  )
}

// 获取参与沸点评论的掘友
const getLuckyBoys = function (onlyLike = false): string[] {
  const lickList = getLikeList()
  const commentList = onlyLike ? [] : getCommentList()

  const luckyBoys: Set<string> = new Set()
  for (let i = 0; i < commentList.length; i++) {
    luckyBoys.add(commentList[i])
  }
  for (let i = 0; i < lickList.length; i++) {
    luckyBoys.add(lickList[i])
  }
  // 去重
  return Array.from(luckyBoys)
}

const FYShuffle_luckyest = function (): number {
  // 乱序算法
  const nums = []
  for (let i = 1, len = getLuckyBoys().length; i <= len; i++) {
    nums.push(i)
  }
  const randomNums = nums.slice(0)
  let len = randomNums.length

  while (len > 1) {
    const rand = Math.floor(Math.random() * len)
    len--
    const temp = randomNums[len]
    randomNums[len] = randomNums[rand]
    randomNums[rand] = temp
  }
  return randomNums[0] // 中奖序号
}

// 进行抽奖
export default function JJLottery() {
  console.log('参赛选手:', getLuckyBoys())
  console.log('最终得奖:', getLuckyBoys()[FYShuffle_luckyest() - 1])
  console.log(new Date())
}
