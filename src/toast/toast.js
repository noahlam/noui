import Vue from 'vue'
// 引入组件
import Toast from './toast.vue'
// 返回一个“扩展实例构造器”
let ToastConstructor = Vue.extend(Toast)

// 定 义toast
function _toast (txt = '', delay = 2000) {
  let toastDom = new ToastConstructor({
    // 将toast组件挂载到新创建的div上
    el: document.createElement('div')
  })

  // 传入要显示的文本参数
  toastDom.message = txt
  toastDom.showToast = true
  // 把toast组件的dom添加到body里
  document.body.appendChild(toastDom.$el)

  // delay时间过后，移除实例
  setTimeout(function () {
    toastDom.visible = false
    setTimeout(function () {
      toastDom.showToast = false
    }, 200)
  }, delay)
}

// 将组件注册到VUE的全局变量里
function _regist () {
  Vue.prototype.$toast = _toast
}

export default _regist
