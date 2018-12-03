export default {
  /* 使用holder之前必须指定好img-container的大小 否则无法占位 */
  /* 推荐使用width和padding-top百分比的方式定义 */
  inserted (el, binding) {
    /* 十六位进制数的颜色整数部分最多到999999 */
    if (!binding.value) {
      throw new Error('v-holder必须传入url值！')
    }
    let color = Math.floor(Math.random() * 1000000)
    el.style.backgroundColor = `#${color}`

    /* 获得传入指令的图片url */
    let img = document.createElement('img')
    img.src = binding.value
    isOnload(img).then(() => {
      el.style.backgroundColor = ``
      el.appendChild(img)
    }).catch((err) => {
      el.innerHTML = err
    })
  }
}

function isOnload (img) {
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve()
    }
    img.onerror = () => {
      /* reject需要一个error对象！ */
      reject(new Error('加载失败！'))
    }
  })
}
