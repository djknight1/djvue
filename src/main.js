/**
 *
 * @param Vue
 * @param options -插件安装配置
 */
import markDown from './components/MarkDown'
import wave from './directive/wave/wave'
import holder from './directive/holder/holder'
import slideComponent from './components/slideComponent'
/* extend创建了一个子类,需要new 且挂载它 */
/* 创建全局方法, 在任何地方都可使用 */
// Vue.mixin是给所有的组件都添加方法,更相当于公共的方法

export default {
  install: function (Vue) {
    Vue.prototype.$initMarkDown = (query, ops) => {
      let MkComponent = Vue.extend(markDown)
      let mk = new MkComponent() // 创建了一个mk实例 那我们就可以访问mk里面的东西了 跟组件是一样的
      if (!Vue.prototype.$mk) {
        Vue.prototype.$mk = mk
      } else return
      if (ops) {
        for (let property in ops) {
          mk[property] = ops[property]
        }
      }
      document.querySelector(query).appendChild(mk.$mount().$el)
    }

    Vue.directive('wave', wave)
    Vue.directive('holder', holder)
    Vue.component('slide', slideComponent)
  }
}
