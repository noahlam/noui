<template>
  <div>
    <div class='wrap'>
      <div class="imgWrap" v-for="item, index in data" :key="index">
        <img :src="item + '?x-oss-process=image/resize,w_200,limit_0'" class="img" @click="viewFullPhoto(index)">
        <div class="deleteBtn" @click="deleteImg(item)">
          <svg viewBox="0 0 60 60" fill="#f00">
            <path fill="#f00" :d="pathX"/>
            <path fill="#fff" :d="pathDelete"/>
          </svg>
        </div>
      </div>
      <div class="iconWrap" v-if="arr.length < max">
        <div class="svgWrap"><svg viewBox="0 0 60 60" fill="#999"><path :d="pathCamera" /></svg></div>
        添加图片
        <input @change='addImg' type="file" name="file" accept="image/*" class="fileInput" @click="judgeMax">
        <!--<input @change='addImg' type="file" name="file" accept="image/*" multiple class="fileInput" @click="judgeMax" v-if="getPlatForm('android')" capture="camera">-->
        <!--<input @change='addImg' type="file" name="file" accept="image/*" multiple class="fileInput" @click="judgeMax" v-else>-->
      </div>
      <div class="remark" v-if="arr.length >= max">最多添加{{max}}张</div>
    </div>
    <PhotoViewer :data="data" :index="currentPhotoIndex" v-model="showPhotos" v-if="showPhotos" />
  </div>
</template>

<script type="text/ecmascript-6">
  import lrz from 'lrz'
  export default {
    props: {
      data: {
        type: Array,
        default: () => { return [] }
      },
      max: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        arr: [],
        showPhotos: false, // 是否显示照片查看器
        currentPhotoIndex: 0, // 当前照片的索引
        pathCamera: `M51,51H9c-2.2,0-4-1.8-4-4V17c0-2.2,1.8-4,4-4h12.1l6-4H33l6.1,4H51c2.2,0,4,1.8,4,4v30
  C55,49.2,53.2,51,51,51z M53,17c0-1.1-0.9-2-2-2H37.9l-4.9-4H27l-5,4H9c-1.1,0-2,0.9-2,2v30c0,1.1,0.9,2,2,2h42c1.1,0,2-0.9,2-2V17z
   M47.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S48.3,22,47.5,22z M30,45c-6.6,0-12-5.4-12-12s5.4-12,12-12
  s12,5.4,12,12S36.6,45,30,45z M30,23c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10S35.5,23,30,23z`,
        pathDelete: `M39.9,30l10.3,10.3l-9.9,9.9L30,39.9L19.7,50.2l-9.9-9.9L20.1,30L9.8,19.7l9.9-9.9L30,20.1L40.3,9.8l9.9,9.9 L39.9,30z`,
        pathX: `M60,30c0,16.6-13.4,30-30,30S0,46.6,0,30S13.4,0,30,0S60,13.4,60,30z`
      }
    },
    methods: {
      judgeMax (event) {
        if (this.arr.length >= this.max) {
          event.preventDefault()
          return false
        }
      },
      // 删除图片
      deleteImg (item) {
        for (let i = 0; i < this.arr.length; i++) {
          if (this.arr[i] === item) {
            this.arr.splice(i, 1)
          }
        }
      },
      // 添加上传图片
      addImg (event) {
        for (let i = 0; i < event.target.files.length; i++) {
          this.uploadFile(event.target.files[i])
        }
      },
      // 查看大图
      viewFullPhoto (index) {
        this.currentPhotoIndex = index
        this.showPhotos = true
      },
      // // 上传图片到服务器(图片文件)
      // async uploadFile (file) {
      //   if (this.arr.length >= this.max) {
      //     return
      //   }
      //   let url = '/mobileUpload/uploadImg.do'
      //   let form = new FormData()
      //   form.method = 'post'
      //   form.enctype = 'multipart/form-data'
      //   form.append('file', file, file.name)
      //   form.append('from', 'order')
      //   let res = await this.$upload(url, form)
      //   if (res.code === '1') {
      //     if (this.arr.length >= this.max) {
      //       return false
      //     } else {
      //       this.arr.push(res.data.url)
      //     }
      //   }
      // },

      // 上传图片到服务器(base64)
      uploadFile (file) {
        if (this.arr.length >= this.max) {
          return
        }
        let url = '/mobileUpload/uploadImg4Base64Str.do'
        this.$loading.open('上传中,请稍后...')
        lrz(file).then(async (base64File) => {
          console.log('base64File', base64File)
          let form = new FormData()
          form.method = 'post'
          form.enctype = 'multipart/form-data'
          let index = 'data:image/jpeg;base64,'.length
          let code = base64File.base64.substring(index)
          form.append('base64ImgStr', code)
          form.append('from', 'order')
          let res = await this.$upload(url, form)
          if (res.code === '1') {
            if (this.arr.length >= this.max) {
              return false
            } else {
              this.arr.push(res.data.url)
            }
          }
          this.$loading.close()
        })
      },
      // 获取系统平台 传入参数为 'android','ios' 返回布尔值
      getPlatForm (plt) {
        let u = navigator.userAgent
        if (plt == 'android') {
          // android终端或者uc浏览器
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
          return isAndroid
        }
        if (plt == 'ios') {
          // ios终端
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          return isiOS
        }
      }
    },
    created () {
      this.arr = this.data
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '~@/styles/index.scss';
  .wrap{
    padding: pr(24);
    background: #fff;
    display: flex;
    flex-wrap: wrap;
  }
  .iconWrap{
    width: pr(165);
    height: pr(165);
    background: #f5f8fa;
    border-radius: pr(15);
    border:1px dashed #ccc;
    position: relative;
    font-size: pr(24);
    color: #999;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    box-sizing: border-box;
    padding: pr(15);
    align-items: center;
    flex-shrink: 0;
  }

  .imgWrap{
    width: pr(165);
    height: pr(165);
    position: relative;
    overflow: hidden;
    margin-right: pr(10);
    margin-bottom: pr(20);
  }
  .img{
    width: pr(165);
    height: pr(165);
    border-radius: pr(15);
    border:1px dashed #e6e6e6;
    box-sizing: border-box;
    flex-shrink: 0;
    margin-right: pr(10);
  }
  .img:nth-child(4){
    margin-right:0;
  }

  .fileInput{
    width: pr(165);
    height: pr(165);
    position: absolute;
    opacity: 0;
    z-index: 999;
    top:0;
    left:0;
  }
  .svgWrap{
    width: pr(65);
    height: pr(65);
  }
  .deleteBtn{
    position: absolute;
    top:pr(0);
    right:pr(10);
    width: pr(30);
    height: pr(30);
  }
  .remark{
    color:#d41313;
    font-size: pr(24);
    width: 100%;
    line-height: pr(44);
    /*background: gold;*/
  }
</style>
