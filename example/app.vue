<template>
  <div class="wrap">
    <rate v-model="vstar" size="30" :writeable="true" />
    <!--<toast></toast>-->
  </div>
</template>

<script>
  import rate from "../src/rate/rate"
  import toast from "../src/vtoast/toast"
  export default {
    data() {
      return {
        vstar: 4.3,
      }
    },
    components:{
      rate,toast
    },
    methods:{
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
