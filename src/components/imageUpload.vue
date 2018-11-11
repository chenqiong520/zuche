<template>
  <div class="image_upload">
    <div>
      <label :for="paramObj.id">
        <cell :title="paramObj.title" is-link></cell>
      </label>
      <input type="file" :id="paramObj.id" style="display: none" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
    </div>
  </div>
</template>

<script>
import {Cell} from 'vux'
import api from '../router/api'
export default {
  name: 'imageUpload',
  components: {Cell},
  data () {
    return {
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
        }
      }
    }
  },
  props: {
    aac002: String, // 身份证号
    oae001: String, // 流水编号
    cac061: String,
    paramObj: Object
  }
}
</script>

<style scoped>
  .image_upload {
    position: relative;
  }
  .image_upload:before {
    content: " ";
    position: absolute;
    left: 15px;
    top: 0;
    right: 15px;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
</style>
