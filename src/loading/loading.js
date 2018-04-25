import Vue from 'vue'
// 引入组件
import Loading from './loading.vue'
// 返回一个“扩展实例构造器”
let LoadingConstructor = Vue.extend(Loading)
let loadingDom = new LoadingConstructor({
  // 将loading组件挂载到新创建的div上
  el: document.createElement('div')
})

// 打开 loading
function showLoading (txt = '加载中...') {
  // 传入要显示的文本参数
  loadingDom.message = txt
  loadingDom.showLoading = true
  setTimeout(() => { loadingDom.visible = true }, 0)
  // 把loading组件的dom添加到body里
  document.body.appendChild(loadingDom.$el)
}
// 关闭loading
function closeLoading () {
  loadingDom.visible = false
  setTimeout(() => { loadingDom.showLoading = false }, 200)
}

// 将组件注册到VUE的全局变量里
function _regist () {
  Vue.prototype.$loading = {open: showLoading, close: closeLoading}
}

export default _regist
