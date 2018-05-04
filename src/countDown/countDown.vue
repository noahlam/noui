<template>
  <span>{{t}}</span>
</template>

<script>
  export default {
    props: {'value': ''},
    data () {
      return {
        v: '',
        t: '',
        f: ''
      }
    },
    methods: {
      down () {
        let t = parseInt(this.v / 1000)
        let m = parseInt(t / 60) % 60
        let h = parseInt(t / 3600)
        let s = t % 60
        if (t > 0) {
          this.v -= 1000
          if (t >= 3600) {
            this.t = `${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`
          } else if (t > 0) {
            this.t = `${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`
          }
          this.f = setTimeout(this.down, 1000)
        }
      }
    },
    mounted () {
      this.v = this.value
      this.down()
    },
    beforeDestroy () {
      clearTimeout(this.f)
    }
  }
</script>
