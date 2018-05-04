<template>
  <div class="cellWrap">
    <div class="cell-item" @click="gotoLink">
      <div class="part_slot" v-if="$slots.default && $slots.default.length>0"><slot></slot></div>
      <div class="part-left">{{title}}</div>
      <div class="part-right">
        <input type="text" class="text" v-if="type=='text'" v-model="txtValue" @input="txtInput" :placeholder="this.placeholder">
        <div v-else style="display: flex;">
          <div class="subTitle" v-if="text">{{text}}</div>
          <i class="icon icon-details-left" v-if="link"></i>
        </div>
      </div>
    </div>
    <div class="bottomLine" :class="border"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      value: {  // 文本框绑定的值
        type: String,
        default: ''
      },
      title: { // 标题
        type: String,
        default: ''
      },
      text: { // 内容文字
        type: String,
        default: ''
      },
      placeholder: { // placeholder 文本框没有内容的时候，显示的文字
        type: String,
        default: ''
      },
      link: { // 连接地址 为空不会显示右箭头,不会跳转，要显示右箭头，又不跳转，设置为字符串的"none"
        type: String,
        default: ''
      },
      border: { // 边框样式 可选 'space-left' 'space-right' 'space-between' 'full' 'none'
        type: String,
        default: 'space-between'
      },
      type: { // 单元格类型  要文本框请传 'text'
        type: String,
        default: 'normal'
      }
    },
    data () {
      return {
        txtValue: ''
      }
    },
    methods: {
      gotoLink () {
        if (this.link && this.link != 'none' && this.type !== 'text') {
          this.$router.push(this.link)
        }
      },
      txtInput () {
        this.$emit('input', this.txtValue)
      }
    },
    created () {
      this.txtValue = this.value
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .cellWrap{
    background: #fff;
  }
  .cell-item{
    line-height: pr(88);
    font-size: $importantFontSize;
    color: $importantInfoAndTitleColor;
    padding: 0 pr(24);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: #fff;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .part_slot{
    width:pr(44);
    height:pr(44);
    overflow: hidden;
    margin-right: pr(20);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .part-left{
    flex-grow: 1;
    flex-shrink: 1;
    /*width: 35%;*/
    overflow: hidden;
    margin-right: pr(20);
  }
  .part-right{
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    justify-content: flex-end;
  }
  .subTitle{
    color:$supportTextColor;
  }
  .text{
    width: 100%;
    height: pr(80);
    text-align: right;
    color:$supportTextColor;
  }
  .icon {
    margin-left: pr(15);
    line-height: pr(86);
    font-size: $importantFontSize;
    color: $secondaryTextColor;
  }
  .bottomLine{
    height: 1px;
    box-sizing: border-box;
    background: #f0f0f0;
    /*background: #ff0000;*/
  }
  .space-left{
    margin-left: pr(24);
  }
  .space-right{
    margin-right: pr(24);
  }
  .full{}
  .space-between{
    margin-left: pr(24);
    margin-right: pr(24);
  }
  .none{
    display: none;
  }


</style>

