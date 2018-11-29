<template>
  <div class="image_upload">
    <div>
      <label :for="imgObj.id">
          <img v-if="imgObj.url" :src="imgObj.url" />
          <div v-else class="icon_wrapper"><i class="icon-upload iconfont"></i></div>
      </label>
      <input type="file" :id="imgObj.id" style="display: none" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
    </div>
  </div>
</template>

<script>
// import api from '../router/api'
export default {
  name: 'imageUpload',
  data () {
    return {
    }
  },
  props: {
    imgObj: Object
  },
  methods: {
    uploadImg (e) {
      // 上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        console.log(e)
        this.imgObj.url = e.target.result
      }
      /* reader.onload = (e) => {
        let result = e.target.result.substring(e.target.result.indexOf(',') + 1)
        let params = ''
        if (this.paramObj.lhjy) {
          params = api.getParam('Y001.001.003', {filetype: this.paramObj.filetype, bustype: this.paramObj.bustype, file: result, oae001: this.oae001, aac002: this.aac002})
        } else {
          params = api.getParam('F004.001.000', {filetype: this.paramObj.filetype, bustype: this.paramObj.bustype, file: result, oae001: this.oae001, aac002: this.aac002})
        }
        this.$vux.loading.show({text: '上传中'})
        api.postData(this, params).then((data) => {
          this.$vux.loading.hide()
          if (data.code === 0) {
            this.paramObj.url = data.data
          } else {
            this.$vux.toast.text(data.msg, '')
          }
        }).catch((code) => {
          this.$vux.loading.hide()
          this.$vux.toast.text(code, '')
        })
      } */
    }
  }
}
</script>

<style scoped>
  .image_upload {
    position: relative;
  }
  .icon_wrapper {
    width: 103px;
    height: 73px;
    border: 1px dashed #999;
    line-height: 73px;
  }
  .icon-upload {
    font-size: 30px;
    color: #999;
  }
  .image_upload img {
    max-width: 103px;
    max-height: 73px;
  }
</style>
