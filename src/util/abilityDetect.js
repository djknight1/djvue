/* 对js里面css的前缀补全的操作 */
let elementStyle = document.createElement('div').style
/* 创建一个元素,检查这个浏览器都支持什么类型 */
/* 进行能力检测 */

/* 这个一个立即执行函数!! */
/* 立即执行函数: 即在函数表达式后面直接加() 如同function aaa(){xxx}()这样的函数在定义后会立即调用
 * 后面()里面的参数作为函数参数使用
 * 由于js中没有私有作用域,用这种方法可以起到私有作用域的方法,防止变量被污染 */
let vender = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if(elementStyle[transformNames[key]] !== undefined){
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vender === false) {
    return false
  }
  if (vender === 'standard') {
    return style
  }
  /* 如果输入transform 则会输出webkitTransform ransform是substring出来的 */
  return vender + style.charAt(0).toUpperCase() +style.substring(1)
}
