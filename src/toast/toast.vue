<template>
  <div v-if="showToast" class="_toast_wrap_">
    <transition name='fade'>
      <div class='_toast_div_class_' v-show='visible'>
        <i>{{message}}</i>
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
        showToast: false
      }
    },
    mounted () {
      setTimeout(() => {
        this.visible = true
      }, 0)
    }
  }
</script>


<style scoped>
  ._toast_wrap_ {
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

  ._toast_div_class_ {
    word-wrap: break-word;
    padding: .5rem .75rem;
    text-align: center;
    z-index: 9999;
    font-size: .75rem;
    max-width: 80%;
    color: #fff;
    border-radius: .25rem;
    background: rgba(0,0,0,0.6);
  }
  .fade-enter-active,.fade-leave-active {
    transition: all .2s linear;
  }
  .fade-enter,.fade-leave-active {
    background: rgba(0,0,0,0);
  }

</style>
