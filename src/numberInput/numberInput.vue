<template>
  <div class="numberInputWrap">
    <span class="btn bdr" :class="{'disabled': num <= min}" @click="decrease">-</span>
    <div class="input-box">
      <input v-if="inputable" :readonly="inputable" class="txtNumber" type="number" autocomplete="off" v-model="num" :min="min" :max="max" @input="changeValue">
    </div>
    <span class="btn bdl" :class="{'disabled': num >= max}" @click="increase">+</span>
  </div>


</template>

<script type="text/ecmascript-6">
  export default{
    name: 'numberInput',
    props: {
      value: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 10000
      },
      min: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 1
      },
      inputable: {  // 是否允许输入
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        num: this.value || 0
      }
    },
    methods: {
      decrease () {
        if (this.num > this.min) {
          this.num = this.num - this.step
          this.$emit('input', this.num)
        }
      },
      increase () {
        if (this.num < this.max) {
          this.num = this.num + this.step
          this.$emit('input', this.num)
        }
      },
      changeValue () {
        if (this.num === '') {
          this.num = this.min
        }
        this.$emit('input', this.num)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~@/styles/index";
  .numberInputWrap {
    width: 100%;
    height: 100%;
    min-width: pr(200);
    min-height: pr(60);
    border-radius: pr(2);
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border: 1px solid $buttonLineColor;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: pr(80);
    text-align: center;
    font-size: pr(46);
    color: $mainFontColor;
    cursor: pointer;
    &.disabled {
      color: $secondaryTextColor;
    }
  }
  .bdl{
    border-left:1px solid $buttonLineColor;
  }
  .bdr{
    border-right:1px solid $buttonLineColor;
  }
  .txtNumber {
    display: flex;
    padding: 0 pr(10);
    height: 100%;
    width: 100%;
    flex-shrink: 5;
    border: none;
    outline: none;
    margin: 0;
    font-size: $titleFontSize;
    color: $importantInfoAndTitleColor;
    text-align: center;
  }
</style>


