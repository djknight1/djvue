import parse from './index'
import drawRefresh from './util/drawRefresh'
import { setAttr } from "./util/util"
import '../style/base.styl'
const template = `
<div id="refresh-container" class="refresh-container">
      <div id="icon" class="refresh-icon">
        <canvas width="60" height="60" id="canvas"></canvas>
      </div>
    </div>
`
window.Refresh = class Refresh {
  /**
   *
   * @param selector 选择器
   * @param height 元素高度
   * @param width 元素宽度
   * @param position 元素位置 接受一个对象
   */
  constructor (selector, height, width, position) {
    this.el = document.querySelector(selector)
    this.height = height
    this.width = width
    this.position = position
    this.template = template
    this.isInit = false // 是否被创造出来了这个节点
  }

  /**
   * @param type 两种类型 一种是直接渲染完成, 一种是慢慢渲染
   * @param r 半径
   * @param lineColor 圆环颜色
   * @param lineWidth 圆环宽度
   * @param originalAlpha 圆环角度
   * @param h1 三角大小
   * @param h2 同上
   */
  renderRefresh(type, r, lineColor, lineWidth, originalAlpha = 0, h1, h2) {
    if (!this.isInit) {
      console.error('还未创造该元素！')
      return
    }
    let x = this.width / 2
    let y = this.height / 2
    if (type === 'move') {
      drawRefresh('canvas', x, y, r, lineColor, lineWidth, originalAlpha, h1, h2).renderWithMove()
    } else if (type === 'immediate') {
      drawRefresh('canvas', x, y, r, lineColor, lineWidth).renderImmediate()
    }
  }

  render () {
    let root = parse(this.template.trim())
    if (this.el) {
      let documentObj = root.render()
      this.el.appendChild(documentObj)
      this.setAttr()
      this.isInit = true
    }
    return this
  }

  setAttr () {
    if (!this.height && !this.width && !this.position) {
      console.error('缺少参数')
      return
    }
    let container = document.getElementById('refresh-container')
    let icon = document.getElementById('icon')
    let canvas = document.getElementById('canvas')
    icon.style.width = this.width + 'px'
    icon.style.height = this.height + 'px'
    setAttr(canvas, 'width', this.width)
    setAttr(canvas, 'height', this.height)
    for (let [key, value] of Object.entries(this.position)) {
      container.style[key] = value
    }
  }
}
