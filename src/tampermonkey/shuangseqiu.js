/**
 * @desc shuangseqiu
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/10/11 14:04
 */

function exec() {
  let nums = new Array(32).fill(null).map((_, idx) => idx + 1)

  const result = []

  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * nums.length)
    result.push(nums[idx])
    nums.splice(idx, 1)
  }

  console.log(result.sort((a, b) => a - b))
}

exec()
exec()
exec()
exec()
exec()
exec()
exec()
