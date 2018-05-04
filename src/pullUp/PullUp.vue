<!--上拉刷新组件-->
<template>
      <div class="pull-wrap" ref="pull-up-wrap">
        <slot></slot>
        <div class="pull-up-text" :style="`height:${bottomBlank * pxrem }rem`">
          {{getText}}
        </div>
      </div>
</template>

<script>
  export default {
    props: {
      cb: {type: Function, default: undefined},
      limited: {type: Boolean, default: false}
    },
    data () {
      return {
        pxrem: 0.02133333,  // px转rem系数
        bottomBlank: 40,     // 到底部距离
        isLoading: false,   // 判断是否有正在加载，避免重复加载
        begin_y: 0,         // 记录第一次手指按下去的Y轴位置
        scrollheight: 0,    // 滚动条的高度
        scrolltop: 0,       // 滚动了多少像素
        scrolltopLast: 0,   // 记住最后一次滚动的高度
        offsetheight: 0,    // 偏移的高度
        minPullHeight: 6 * 50,  // 最小上拉高度 单位是像素
        maxPullHeight: 12 * 50  // 最大上拉高度 单位是像素
      }
    },
    computed: {
      // 计算 底部提示文字
      getText () {
        if (this.limited) {
          this.bottomBlank = 40
          return '已经到底了哦~'
        }
        if (this.isLoading) {
          return '加载中...'
        }
        if (this.bottomBlank < this.minPullHeight) {
          return '上拉加载更多'
        } else {
          return '放掉加载更多'
        }
      }
    },
    methods: {
      // 异步函数执行完毕后的回调
      done () {
        this.bottomBlank = 40
        let wrap = this.$refs['pull-up-wrap']
        wrap.scrollTop = this.scrolltopLast
        this.isLoading = false
      },
      // 主函数 监听各种事件 判断是否上拉 是否放掉 上拉位置是否够等等
      pullup_load () {
        let wrap = this.$refs['pull-up-wrap']
        wrap.addEventListener('scroll', (e) => {
          if (this.isLoading || this.limited) return
          this.scrollheight = wrap.scrollHeight // 滚动条的高度
          this.scrolltop = wrap.scrollTop    // 滚动了多少像素
          this.offsetheight = wrap.offsetHeight // 偏移的高度
        })
        wrap.addEventListener('touchmove', (e) => {
          if (this.isLoading) return
          // 记录拖动的高度 来决定要不要执行异步操作
          let x = this.begin_y - e.targetTouches[0].clientY
          x = x > this.maxPullHeight ? this.maxPullHeight : x
          this.bottomBlank += x
          if (x > 0) {
            wrap.scrollTop = this.scrolltopLast + this.bottomBlank
          }
        }, false)
        wrap.addEventListener('touchstart', (e) => {
          if (this.isLoading) return
          let wrap = this.$refs['pull-up-wrap']
          // 记录页面滚动之前的位置(方便加载完毕后恢复)
          this.scrolltopLast = wrap.scrollTop
          // 手指按下去的时候，记录当前的位置
          this.begin_y = e.targetTouches[0].clientY
        }, false)
        wrap.addEventListener('touchend', (e) => {
          let wrap = this.$refs['pull-up-wrap']
          // 如果上一次还没加载完，就直接退出
          if (this.isLoading) {
            return
          }
          // 判断有没有拉到指定高度
          if (wrap.scrollTop + wrap.offsetHeight < wrap.scrollHeight - 100) {
            // this.done()
            return
          }
          // 如果上拉不到200px 则取消事件 不执行异步加载操作
          if ((this.bottomBlank < this.minPullHeight) || this.limited) {
            // wrap.scrollTop -= this.bottomBlank
            this.bottomBlank = 40
            // this.done()
            return
          }
          // 鼠标放掉的时候，先让提示文字的容器高度缩回去，只留100px高来显示 【加载中...】
          wrap.scrollTop -= this.bottomBlank
          this.isLoading = true
          this.bottomBlank = 40
          // 开始执行回调函数 如果函数执行完毕，调用参数里面的done,让页面恢复原状
          this.cb(this.done)
        }, false)
      }
    },
    created () {
    },
    mounted () {
      this.pullup_load()
    }
  }
</script>

<style scoped>
  .pull-wrap{
    /*background:#f5f5f5;*/
    font-size: 0;
    overflow-y: scroll;
    /*-webkit-overflow-scrolling: touch;*/
    padding: 0;
    margin: 0;
    border: none;
    width: 100%;
    height: 100%;
  }
  /*去除滚动条，并且保持内容能滚动*/
  .pull-wrap::-webkit-scrollbar {display:none}
  .pull-up-text{
    width: 100%;
    font-size: 0.6rem;
    color:#999;
    text-align: center;
    min-height: 40px;
    line-height: 40px;
    /*background: #f7c02a;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
</style>
