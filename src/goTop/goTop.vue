<template>
  <div class="gotop-box" v-show="status" :style="boxstyle" @click="gotoTop">
    <div :style="tristyle"></div>
  </div>
</template>
<script>
  var pxrem = 0.02133333
  export default {
    name: 'goTop',
    props: {
      size: {type: Number, default: 70},     // 尺寸
      bottom: {type: Number, default: 125},  // 底部的距离
      right: {type: Number, default: 25},    // 右边的距离
      speed: {type: Number, default: 10},    // 每次滚动的间隔
      step: {type: Number, default: 50},     // 每次滚动的步长
      element: {type: String, default: ''}
    },
    data () {
      return {
        boxstyle: {
          width: `${this.size * pxrem}rem`,
          height: `${this.size * pxrem}rem`,
          bottom: `${this.bottom * pxrem}rem`,
          right: `${this.right * pxrem}rem`
        },
        tristyle: {
          width: `${this.size * pxrem * 0.4}rem`,
          height: `${this.size * pxrem * 0.4}rem`,
          border: 'none',
          borderTop: `${this.size * pxrem * 0.07}rem solid #fff`,
          borderRight: `${this.size * pxrem * 0.07}rem solid #fff`,
          transform: `translate(0rem,${this.size * pxrem * 0.125}rem) rotate(-45deg)`
        },
        status: false,
        scrollTop: 0,
        timer: null,
        el: {}
      }
    },
    mounted () {
      if (this.element != '') {
        this.el = document.querySelector(this.element)
      } else {
        this.el = window
      }
      this.el.className = this.el.className ? this.el.className += ' scrollWrap' : 'scrollWrap'

      if (!this.el) {
        console.error('GoTop报错: 没有获取到元素，请确认传入正确的element值')
      }
      const _this = this
      this.el.addEventListener('scroll', () => {
        _this.scrollTop = _this.el.scrollTop ? _this.el.scrollTop : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : null
        _this.status = _this.scrollTop && _this.scrollTop > 500
      }, false)
    },
    methods: {
      gotoTop () {
        this.timer = setInterval(() => {
          this.scrollTop -= this.step
          if (this.scrollTop < 100) {
            this.scrollTop = 0
            this.status = false
            clearInterval(this.timer)
          }
          try {
            this.el.scrollTo(0, this.scrollTop)
          } catch (e) {
            this.el.scrollTop = 0
          }
        }, this.speed)
      }
    },
    destroyed () {
      clearInterval(this.timer)
    }
  }
</script>
<style scoped>
  .gotop-box {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .5;
    border-radius: 50%;
    color: #fff;
    background: #000;
    z-index: 999;
  }
</style>

<style>
  .scrollWrap {
    transition: all 200ms;
    -webkit-overflow-scrolling: touch;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: scroll;
  }

  .scrollWrap::-webkit-scrollbar {
    display: none;
  }
</style>
