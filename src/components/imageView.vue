<template>
  <div v-show="show">
      <x-header  :left-options="{backText: '',preventGoBack: true}" @on-click-back="goBack" >预览
        <label :for="imgObj.id" slot="right">
          <a  class="vux-header-more">
            <input type="file" :id="imgObj.id" style="display: none" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event)">
          </a>
        </label>
      </x-header>
      <div v-transfer-dom v-show="show">
         <previewer  :list="list" ref="previewer" :options="options"></previewer>
       </div>
  </div>
</template>

<script>
import {XHeader, TransferDom, Previewer} from 'vux'
import api from '../router/api'
export default {
  name: 'imageView',
  directives: {
    TransferDom
  },
  components: {XHeader, Previewer},
  data () {
    return {
      list: [],
      show: false,
      options: {
        tapToClose: false,
        closeOnScroll: false,
        pinchToClose: false,
        closeOnVerticalDrag: false
      }
    }
  },
  props: {
    value: Boolean,
    aac002: String, // 身份证号
    oae001: String, // 流水编号
    imgObj: Object
  },
  watch: {
    value () {
      if (this.show === this.value) return
      this.show = this.value
      this.list = [{
        src: 'http://' + this.$store.getters.base + this.imgObj.url
      }]
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    },
    show () {
      if (this.show === this.value) return
      this.$emit('input', this.show)
    }
  },
  methods: {
    goBack () {
      this.show = false
      this.$refs.previewer.close()
    },
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
        const params = api.getParam('F004.001.000', {filetype: this.imgObj.filetype, bustype: this.imgObj.bustype, file: result, oae001: this.oae001, aac002: this.aac002})
        this.$vux.loading.show({text: '上传中'})
        api.postData(this, params).then((data) => {
          this.$vux.loading.hide()
          if (data.code === 0) {
            this.imgObj.url = data.data
            this.list = [{
              src: 'http://' + this.$store.getters.base + data.data
            }]
            this.$nextTick(() => {
              this.$refs.previewer.show(0)
            })
          } else {
          }
        }).catch((code) => {
          this.$vux.loading.hide()
          this.$vux.toast.text(code, '')
        })
      }
    }
  }
}
</script>

<style>
  .pswp.vux-previewer {
    top: 46px;
    display: block;
  }
  .pswp__top-bar {
    display: none;
  }
</style>
