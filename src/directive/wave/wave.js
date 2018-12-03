import './waves.styl'
export default{
  /* 水波纹的思路是创建一个宽和高都为点击元素的宽和高的最大值的span元素,将其插入到点击元素后 */
  /* 点击元素之后,让这个元素从点击位置创建span元素 然后让它的颜色扩散 */
  /* 点击的位置需要始终位于span元素的中心 */
  /* 用户需要自定义水波纹的条件,用binding.value来取 */
  /* 格式为 {color: xxxx} */
  bind (el, binding) {
    el.addEventListener('click', (e) => {
      /* customOps: 用户自定的选项 */
      const customOps = Object.assign({}, binding.value)
      /* ops: 最终的选项,同时设置默认值 */
      const ops = Object.assign({
        bindEle: el,
        type: 'touch',
        color: 'rgba(0, 0, 0, 0.15)'
      }, customOps)

      if (ops.bindEle) {
        let target = ops.bindEle
        target.style.position = 'relative'
        target.style.overflow = 'hidden'

        const rect = target.getBoundingClientRect() // 这里用这个函数的原因是因为方便。。。
        let ripple = target.querySelector('.ripple')
        /* 无ripple 说明第一次点击 */
        if (!ripple) {
          ripple = document.createElement('span')
          ripple.className = 'ripple'
          /* 这句话是为了让span元素大于点击元素 */
          ripple.style.height = ripple.style.width = `${Math.max(rect.width, rect.height)}px`
          target.appendChild(ripple)
        } else {
          ripple.className = 'ripple'
        }
        /* 两种方式 一种从中间扩散,计算公式可看手稿 */
        switch (ops.type) {
          case 'center':
            ripple.style.top = `${rect.height / 2 - ripple.offsetHeight / 2}px`
            ripple.style.left = `${rect.width / 2 - ripple.offsetWidth / 2}px`
            break
          /* 另外一种从点击位置扩散, 创建以点击位置为中心的正方形 */
          /* PageY相对的是文档的位置 所以你还需要减去scrollTop的值 即滚动条的值 */
          default:
            ripple.style.top = `${e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop}px`
            ripple.style.left = `${e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft}px`
        }
        ripple.style.backgroundColor = ops.color
        ripple.className = 'ripple active'
      }
    })
  }
}
