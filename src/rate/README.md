# Rate
a simple vue rate component /一个简单的vue-rate评分组件
# 用法
### 直接下载rate.vue 到项目的任意目录（建议放在components目录下）
### 然后在需要引入的页面使用

#### js代码
     //注意：这里的'./components/rate'要替换成你实际存放的位置
     import rate from './components/rate'   

#### HTML简单代码
     //什么参数都不加，全部使用默认参数 
     //星星数：五颗
     //尺寸：25px
     //评分：5分
     //背景颜色：灰色
     //前景颜色：橙色
     //写入权限：可写
     
     <rate/>

#### 其他用法
     <rate v-model="'3'" :size="30" :length="6" frontColor="#f00" backColor="#ccc" :writeable="false"/>

#### 参数说明

|    参数名  |  默认值  |                           说明                          |        示例       |
|-----------|---------|--------------------------------------------------------|-------------------|
| value     | 5       |默认前景星星的个数（即评分分数，可以为小数，使用v-model绑定）    | v-model="'3.5'"   |
| size      | 25      |星星的尺寸 （单位px,使用时不要加单位，纯数字）                 | :size="30"        |
| length    | 5       |星星的个数（即 评分的总分数）                                | :length="6"       |
| frontColor| #F7BA2A |前景颜色 (即 已评分的星星颜色 )                              | frontColor="#f00" |
| backColor | #D3DCE6 |背后景颜色 (即 未评分的星星颜色 )                            | backColor="#ccc"  |
| writeable | false   |评分是否可以更改(为true时可点击更改评分，false时不能更改，纯展示)|:writeable="true"  |
