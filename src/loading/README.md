## 一个简单的移动端loading组件
### 使用方法
1. #### 引入
##### 在入口的js文件（即webpack打包的那个入口，我的是index.js）引入
##### 这里的'./components/loading/loading.js'的位置要替换成你文件存放的位置
```
import VueLoading from './components/loading/loading.js'
Vue.use(VueLoading)
```

2. #### 使用
##### 在任何VUE页面里面使用
```
//  打开loading
this.$loading.open()  //显示 加载中...

// 自定义显示文字
this.$loading.open('请稍后')  //显示 请稍后

// 关闭
this.$loading.close()
```
