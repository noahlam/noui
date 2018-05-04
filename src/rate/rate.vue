<template>
  <div style="position: relative">

    <!--设置分数开始-->
    <div class="btn_container" v-if="writeable">
      <input v-for="item in length" type="button" :style='btnStyle' @click="setValue(item)">
    </div>
    <!--设置分数结束-->
    <svg :width=" size * length*2" :height='size'>
      <defs>
        <path id="frontstar" :fill="frontColor" :d="d"/>
        <path id="backstar" :fill="backColor" :d="d"/>
      </defs>

      <!--底色的星星-->
      <g v-for="i in length">
        <use xlink:href="#backstar" :transform="'translate(' + size * --i +',0)'"/>
      </g>
      <!--底色的星星 结束-->
      <!--顶层显示的星星-->
      <g>
        <clipPath id="mask_layer">
          <rect id="range" :width=" value * size " :height='size' overflow="visible"/>
        </clipPath>
        <g v-for="i in length" clip-path="url(#mask_layer)">
          <use xlink:href="#frontstar" :transform="'translate(' + size * --i +',0)'"/>
        </g>
      </g>
      <!--顶层显示的星星 结束-->
    </svg>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        d: '',
      }
    },
    props: {
      value: {
        default: 5
      },
      size: {
        default: 25
      },
      length: {
        default: 5
      },
      frontColor: {
        type: String,
        default: '#F7BA2A'
      },
      backColor: {
        type: String,
        default: '#D3DCE6'
      },
      writeable: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      btnStyle () {
        return `width:${this.size}px;height:${this.size}px;`
      }
    },
    methods: {
      setValue (i) {
        this.$emit('input', i)
      },
      drawStar () {
        let s = this.size
        this.d = `M0,${0.382 * s}L${s},${0.382 * s}L${0.191 * s},${s}L${0.5 * s},0L${0.809 * s},${s}Z`
      }
    },
    mounted () {
      this.drawStar()
    },
  }
</script>
<style>
  .btn_container {
    position: absolute;
    left: 0;
    top: 0;
  }

  .btn_container input {
    display: block;
    background: none;
    padding: 0;
    margin: 0;
    border: none;
    float: left;
    outline: none;
  }
</style>