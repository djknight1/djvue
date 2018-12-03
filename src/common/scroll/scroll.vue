<!-- 封装一个scroll组件 这样之后就可以直接套用了 -->
<template>
  <div ref="wrapper" class="wrapper">
    <slot>

    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import Bscroll from 'better-scroll'

export default {
  props: {
    /* 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */

    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    /* 组件的数据会实时变化,而变化的东西卸载data里面,每次变化需要重新刷新betterscroll */
    /* 这个是列表的数据 */
    data: {
      type: Array,
      default: null
    },
    /* 是否要监听滚动事件,以达到左右两边联动的效果 */
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      if (!this.scroll) {
        this.initBscroll()
      } else {
        this.refresh()
      }
    }, 20)
  },
  /* 当你的data变化时要重新调用refresh方法 */
  watch: {
    data () {
      /* data变化的时候不会马上就用到dom上去 需要一个tick 大约17ms */
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  methods: {
    initBscroll () {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullDownRefresh: this.pullDownRefresh
      })
      if (this.listenScroll) {
        /* 把实时滚动的位置暴露出来 */
        let me = this
        /* 当probeType为1的时候不会实时派发scroll,只有再滚动结束的时候才会派发滚动事件 */
        this.scroll.on('scroll', (pos) => {
          /* 子组件向父组件进行通信用派发事件的方法,即emit */
          me.$emit('scroll', pos)
        })
      }
      if (this.pullDownRefresh) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown')
        })
      }
    },
    /* 代理scroll的方法 */
    refresh () {
      if (this.scroll) {
        this.scroll.refresh()
      }
    },
    finishPullDown () {
      if (this.scroll) {
        this.scroll.finishPullDown()
      }
    },
    enable () {
      if (this.scroll) {
        this.scroll.enable()
      }
    },
    disable () {
      if (this.scroll) {
        this.scroll.disable()
      }
    },

    scrollTo (offsetX, offsetY, time) {
      if (this.scroll) {
        this.scroll.scrollTo(offsetX, offsetY, time)
      }
    },

    scrollToElement (el, time) {
      if (this.scroll) {
        this.scroll.scrollToElement(el, time)
      }
    }
  }
}
</script>

<style lang="stylus" scoped type="text/stylus">
.wrapper
  height: 100%
  overflow: hidden
</style>
