<template>
    <div style="position: relative">

        <!--设置分数开始-->
        <div class="btn_container" v-if="writeable">
            <input v-for="i in stars" type="button" :style='btnStyle' @click="setValue(i)">
        </div>
        <!--设置分数结束-->
        <svg :width=" size * length*2" :height='size'>
            <defs>
                <path id="frontstar" :fill="frontColor" :d="d" :transform="'scale('+size/25+','+size/25+')'"/>
                <path id="backstar" :fill="backColor" :d="d" :transform="'scale('+size/25+','+size/25+')'"/>
            </defs>

            <!--底色的星星-->
            <g v-for="i in stars">
                <use xlink:href="#backstar" :transform="'translate(' + size * i +',0)'"/>
            </g>

            <!--顶层显示的星星-->
            <g>
                <clipPath id="mask_layer">
                    <rect id="range" :width=" value * size " :height='size' overflow="visible"/>
                </clipPath>
                <g v-for="i in stars" clip-path="url(#mask_layer)">
                    <use xlink:href="#frontstar" :transform="'translate(' + size * i +',0)'"/>
                </g>

            </g>
        </svg>
    </div>
</template>
<script>
  export default{
    data(){
      return {
        starsValue: '',
        btnStyle: '',
        stars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        d: `M12.5,1.087l2.833,8.719H24.5l-7.417,5.389l2.834,8.719L12.5,18.524l-7.417,
            5.389l2.833-8.719L0.5,9.806 h9.168L12.5,1.087z`,
      }
    },
    props: {
      'value': {
        default: 5
      },
      'size': {
        default: 25
      },
      'length': {
        default: 5
      },
      'frontColor': {
        default: '#F7BA2A'
      },
      'backColor': {
        default: '#D3DCE6'
      },
      'writeable': {
        type: Boolean,
        default: false
      },
      'form': {
        default: 'star'
      },
    },
    methods: {
      setValue(i){
        this.starsValue = i + 1;
        this.$emit('valueChange', i + 1)
      }
    },
    mounted: function () {

      this.stars = this.stars.slice(0, this.length)
      if (this.value > this.length) {
        this.value = this.length
      }
      this.btnStyle = `width:${this.size}px;height:${this.size}px;`
    },
    computed: {
      starsValue: function (oldValue, newValue) {
        this.value = newValue
      }
    }
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