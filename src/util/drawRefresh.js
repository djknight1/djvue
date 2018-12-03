/**
 * @param el canvas元素
 * @param x 圆环圆心位置
 * @param y 同上
 * @param r 半径
 * @param lineColor 圆环颜色
 * @param lineWidth 圆环宽度
 * @param originalAlpha 初始角度
 * @param h1 三角大小
 * @param h2 同上
 */
/* canvas宽高只有写在canvas标签里才是真正画布的宽高 写在css里的是拉伸过的宽高 */
export default function (el, x, y, r, lineColor, lineWidth, originalAlpha = 0, h1, h2) {
  let canvas = document.getElementById(el)
  let alpha = originalAlpha - Math.PI / 2
  let ctx = canvas.getContext('2d')
  let mW = canvas.width
  let mH = canvas.height
  let startAngle = -(1 / 2 * Math.PI) // 开始角度
  const renderWithMove = function () {
    ctx.clearRect(0, 0, mW, mH)
    // 画圈
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.arc(mW / 2, mH / 2, r, startAngle, alpha, false)
    ctx.stroke()
      let x1 = x + (r - h1) * Math.sin(originalAlpha)
      let y1 = y - (r - h1) * Math.cos(originalAlpha)
      let x2 = x + (r + h1) * Math.sin(originalAlpha)
      let y2 = y - (r + h1) * Math.cos(originalAlpha)
      let x0 = (x1 + x2) / 2 + h2 * Math.sin(originalAlpha + Math.PI / 2)
      let y0 = (y1 + y2) / 2 - h2 * Math.cos(originalAlpha + Math.PI / 2)
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.lineTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.fillStyle = lineColor
      ctx.closePath()
      ctx.fill()
  }
  const renderImmediate = function () {
    ctx.clearRect(0, 0, mW, mH)
    // 画圈
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.arc(mW / 2, mH / 2, r, startAngle, 1.2 * Math.PI, false)
    ctx.stroke()
    ctx.closePath()
  }
  return {
    renderWithMove,
    renderImmediate
  }
}
