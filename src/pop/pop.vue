<template>
  <div class="popMask" id="popMask" @click="closeModal">
    <div @click.prevent="prevent">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        show: false
      }
    },
    mounted () {
      this.show = this.value
      this.show ? this.openModal() : this.closeModal()
    },
    methods: {
      prevent (event) {
        event.preventDefault()
        event.stopPropagation()
        return false
      },
      ModalHelper (bodyCls) {
        var scrollTop
        return {
          afterOpen: function () {
            scrollTop = document.scrollingElement.scrollTop
            document.body.classList.add(bodyCls)
            document.body.style.top = -scrollTop + 'px'
          },
          beforeClose: function () {
            document.body.classList.remove(bodyCls)
            document.scrollingElement.scrollTop = scrollTop
          }
        }
      },
      openModal () {
        document.getElementById('popMask').style.display = 'flex'
        this.ModalHelper('modal-open').afterOpen()
      },
      closeModal () {
        this.ModalHelper('modal-open').beforeClose()
        document.getElementById('popMask').style.display = 'none'
        this.$emit('input', false)
      }
    }
  }
</script>
<style scoped>
  .popMask {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    z-index: 99999;
    justify-content: center;
    align-items: center;
  }
</style>

<style>
  body.modal-open {
    position: fixed;
    width: 100%;
  }
</style>
