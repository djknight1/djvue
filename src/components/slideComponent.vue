<template>
  <div class="container" ref="container">
    <div class="item"
         ref="item"
         @touchstart="handleStart"
         @touchmove="handleMove"
         @touchend="handleEnd">
      <div class="content" ref="content">
        <slot>你的内容！</slot>
      </div>
      <div ref="buttonContainer" class="button-container" >
        <div class="button"
             v-for="(button, index) in buttonContent"
             :key="index"
             :style="{backgroundColor: button.color}">
          <span class="button-name">{{button.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from '../util/abilityDetect'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  name: 'home',
  props: {
    height: {
      type: String,
      default: '100px'
    },
    slideOffset: {
      type: Number,
      default: 120
    },
    buttonContent: {
      type: Array,
      default: () => [ { name: '删除', color: '#ea6f5a' }, { name: '修改', color: '#94b9dc' } ]
    }
  },
  data () {
    return {
      isShowMsg: false
    }
  },
  created () {
    this.touches = {}
  },
  mounted () {
    this.$nextTick(() => {
      this.initiated()
    })
    window.addEventListener('resize', () => {
      this.initiated()
    })
  },
  methods: {
    initiated () {
      let containerWidth = this.$refs.container.clientWidth
      this.$refs.item.style.width = containerWidth + this.slideOffset + 'px'
      this.$refs.content.style.width = containerWidth + 'px'
      this.$refs.buttonContainer.style.width = this.slideOffset + 'px'
      this.$refs.item.style.height = this.height
    },
    handleStart (e) {
      this.touches.initiated = true
      this.touches.firstTouchX = e.touches[0].pageX
      this.touches.firstTouchY = e.touches[0].pageY
    },
    handleMove (e) {
      if (this.touches.initiated) {
        let left // 如果没有left 在滑到最左边结束之后,再次滑动 slideWidth会大于0
        if (this.isShowMsg === false) {
          left = 0
        } else {
          left = -this.slideOffset
        }
        this.touches.finalTouchX = e.touches[0].pageX
        this.touches.finalTouchY = e.touches[0].pageY
        const deltaX = this.touches.finalTouchX - this.touches.firstTouchX
        const deltaY = this.touches.finalTouchY - this.touches.firstTouchY
        /* 防止上下滑动时触发左右滑动  */
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return
        }
        /* 左滑是负数,右滑是正数 */
        /* 限制滑动距离在(-50px - 0px) */
        const slideWidth = Math.min(Math.max(deltaX + left, -this.slideOffset), 0)
        this.$refs.item.style[transitionDuration] = ``
        this.$refs.item.style[transform] = `translate3d(${slideWidth}px,0,0)`
        /* 如果超过一定范围就直接滑动完成 */
        this.touches.percent = Math.abs(slideWidth / this.slideOffset)
      }
    },
    handleEnd () {
      let offWidth
      /* 向左滑,如果大于0.45就滑过去,小于就缩回去 */
      /* 如果已经滑到了就不影响 */
      if (!this.isShowMsg) {
        if (this.touches.percent > 0.45) {
          offWidth = -this.slideOffset
          this.isShowMsg = true
        } else {
          offWidth = 0
        }
      } else {
        /* 向右滑 */
        if (this.touches.percent < 0.9) {
          offWidth = 0
          this.isShowMsg = false
        } else {
          offWidth = -this.slideOffset
        }
      }
      this.$refs.item.style[transitionDuration] = '.5s'
      this.$refs.item.style[transform] = `translate3d(${offWidth}px,0,0)`
    }
  }
}
</script>
<style lang="stylus" scoped>
  .container
    display: flex
    flex-direction:column
    justify-content:center
    align-items:flex-start
    overflow: hidden
    margin: 0
    padding: 0
    .item
      display: flex
      background-color: #eee
      margin-top: 15px
      height: 100px
      width: 100%
      .content
        width: 100%
        height: 100%
      .button-container
        display: flex
        height: 100%
        background-color: #fff
        .button
          display: flex
          flex: 1
          color: #fff
          align-items:center
          justify-content:center
          .button-name
            font-size: 20px
</style>
