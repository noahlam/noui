## 一个简单的移动端toast弹出组件
### 使用方法
1. #### 引入
##### 在入口的js文件（即webpack打包的那个入口，我的是index.js）引入
##### 这里的'./components/toast/toast'的位置要替换成你文件存放的位置
```
import VueToast from './components/toast/toast'
Vue.use(VueToast)
```

2. #### 使用
##### 在任何VUE页面里面使用
```
//  基础用法
this.$toast('我是弹出消息')

// 设置延迟时间 单位是毫秒ms
this.$toast('我是弹出消息', 3000)
```
