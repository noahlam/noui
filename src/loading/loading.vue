<template>
  <div v-if="showLoading" class="_loading_wrap_">
    <transition name='fade'>
      <div class='_loading_div_class_' v-show='visible'>
        <div class="spanner">
          <div class="spin_line" :style="`transform: rotate(${i * 45}deg);`" v-for="i in 8" :key="i"></div>
        </div>
        <i class="txt">{{message}}</i>
      </div>
    </transition>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        visible: false,
        message: '',
        showLoading: false
      }
    },
    mounted () {
    }
  }
</script>


<style scoped>
  ._loading_wrap_ {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  ._loading_div_class_ {
    word-wrap: break-word;
    padding: .5rem .75rem;
    text-align: center;
    z-index: 9999;
    font-size: .6rem;
    max-width: 60%;
    color: #fff;
    border-radius: .25rem;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .spanner {
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    position: relative;
    animation: rotate 1s linear infinite;
    transform-origin: center center;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(-360deg)
    }
  }

  .spin_line {
    position: absolute;
    left: 0.45rem;
    top: 0;
    width: 0.1rem;
    height: 0.5rem;
    border-radius: 0.05rem;
    transform-origin: bottom;
    background-image: linear-gradient(#fff 60%, rgba(225, 255, 255, 0) 50%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .2s linear;
  }

  .fade-enter, .fade-leave-active {
    background: rgba(0, 0, 0, 0);
  }

  .txt {
    padding-top: 0.5rem;
  }
</style>
