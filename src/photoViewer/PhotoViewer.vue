<!--图片浏览器组件-->
<template>
  <div class="photoViewMask" v-if="showViewer" @click="closePhotoViewer">
    <div class="closeBtn" @click.stop="closePhotoViewer"></div>
    <img :src="data[currentIndex - 1]" alt="" class="img" ref="img" @click.stop="preventEvent">
    <div class="pageIndex">{{currentIndex}} / {{data.length}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        default: 1
      },
      data: {
        type: Array,
        default: []
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showViewer: true,
        currentIndex: 0,    // 当前图片
        touchStartTime: 0,  // 记录开始滑动的时间
        touchStartPoint: 0, // 记录开始滑动的位置
        touchEndPoint: 0    // 记录停止滑动的位置
      }
    },
    methods: {
      preventEvent (event) {
        event.preventDefault()
        event.stopPropagation()
        return false
      },
      closePhotoViewer (event) {
        this.showViewer = false
        this.$emit('input', false)
        event.preventDefault()
        event.stopPropagation()
        return false
      },
      listenEvent () {
        let img = this.$refs['img']
        img.addEventListener('touchstart', (e) => {
          this.touchStartTime = e.timeStamp
          this.touchStartPoint = e.targetTouches[0].pageX
        }, false)
        img.addEventListener('touchmove', (e) => {
          this.touchEndPoint = e.targetTouches[0].pageX
        }, false)
        img.addEventListener('touchend', (e) => {
          if (!this.touchEndPoint) { return }  // 如果没有滑动,就直接退出
          let time = e.timeStamp - this.touchStartTime
          let distance = this.touchEndPoint - this.touchStartPoint
          let distanceABS = Math.abs(distance)
          // 快速滑动的情况 || 慢速滑动的情况
          if ((time < 300 && distanceABS > 50) || (time > 300 && distanceABS > 200)) {
            if (distance > 0) {
              this.currentIndex--
              if (this.currentIndex < 1) { this.currentIndex = this.data.length }
            } else {
              this.currentIndex++
              if (this.currentIndex > this.data.length) { this.currentIndex = 1 }
            }
          }
          this.touchStartPoint = 0
          this.touchEndPoint = 0
        }, false)
      }
    },
    created () {
      this.showViewer = this.value
      this.currentIndex = this.index + 1
    },
    mounted () {
      this.listenEvent()
    }
  }
</script>

<style scoped>
  .photoViewMask{
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,.86);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .closeBtn{
    background: rgba(51,51,51,.4);
    border-radius: 50%;
    border: 1px solid #e6e6e6;
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    width: calc(1.2rem + 2px);
    height: calc(1.2rem + 2px);
    transform: rotate(45deg);
  }
  .closeBtn:before{
    content: '';
    top:-1px;
    left:0;
    width: 1.2rem;
    position: absolute;
    height: 2px;
    background: #fff;
    transform: translate(0, 0.6rem) scale(0.75);
  }
  .closeBtn:after{
    content: '';
    top:0;
    left:-1px;
    width: 2px;
    position: absolute;
    height: 1.2rem;
    background: #fff;
    transform: translate(0.6rem, 0) scale(0.75);
  }
  .img{
    max-width: 100%;
    max-height: 100vh;
    background: #fff;
  }
  .pageIndex{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 2rem;
    text-align: center;
    color:#fff;
    background: rgba(51,51,51,.4);
  }
</style>
