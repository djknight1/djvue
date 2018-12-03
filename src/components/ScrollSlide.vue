<template>
  <div class="home">
    <div ref="mainContainer" class="scroll-container">
      <scroll ref="scroll"
              :listenScroll="true"
              :data="dataCopy">
        <div class="content item-container">
          <slide ref="closeTarget"
                 class="item"
                 :key="num.id"
                 v-for="(num, index) in dataCopy"
                 :position="num.id"
                 :height="'150px'"
                 :slideOffset="150"
                 @transitionend.native="closeTarget(index, $event)"
                 @delete="close"
                 @change="handleChange">
            <slot></slot>
          </slide>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from '@/common/scroll/scroll'
import slide from '@/components/slideComponent.vue'
export default {
  name: 'home',
  props: {
    data: {
      type: Array,
      /* 期待数据如下
         *  [{
         *    id: xxx // 必须是独一无二的,用于绑定每一个slideComponent
         *    // 用于绑定你想要的button 里面需要有button的id button的title button的name button的颜色
         *    buttonContent: {
         *      id: 13, // 用来标识每一个button
         *      title: '删除', // 用来在button上显示的名字
         *      name: 'delete', // 用于回调函数返回的name
         *      color: '#ea6f5a'
         *    }
         *  }，...]
         * */
      default: () => [
        {
          id: 1
        },
        {
          id: 2
        }, {
          id: 3
        }, {
          id: 5
        }, {
          id: 6
        }, {
          id: 12
        }, {
          id: 53
        }, {
          id: 51
        }, {
          id: 19
        }, {
          id: 10
        }]
    }
  },
  data () {
    return {
      pullDownRefresh: {
        threshold: 50, // 下拉距离 超过这个距离就执行函数
        stop: 70 // 回弹停留在距离顶部20px的位置
      },
      dataCopy: [],
      isShow: true
    }
  },
  created () {
    this.touches = {}
    this.dataCopy = this.data
  },
  methods: {
    handleChange (obj) {
      console.log(obj)
    },
    findIndexById (id) {
      let Element = this.dataCopy.findIndex((item) => {
        return item.id === id
      })
      return Element
    },
    closeTarget (index, e) {
      // transitionend在有多个属性变化的时候会触发两次 所以我们需要下面这样做
      if (e.propertyName === 'height') {
        this.dataCopy.splice(index, 1)
      }
    },
    close (obj) {
      let Element = this.findIndexById(obj.position)
      this.$refs.closeTarget[Element].$el.className = 'container item active'
    }
  },
  components: {
    slide,
    Scroll
  }
}
</script>
<style lang="stylus" scoped>
  .scroll-container
    height: 100%
    .item-container
      .item
        height: 150px
        border-radius: 15px
        margin: 0 15px 20px 15px
        background: #fff
        transition:all .88s
        &.active
          height: 0
          margin: 0 15px
          opacity: 0
        .close
          height: 100%
          width: 50px
          float: right
          background: red
</style>
