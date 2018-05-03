<template>
  <div class="wrap">
    <rate v-model="vstar" writeable="true" />

  </div>
</template>

<script>
  import rate from "../src/rate/rate"
  export default {
    data() {
      return {
        vstar: 4.3
      }
    },
    components:{
      rate
    },
    methods:{

    },
    mounted:{

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
