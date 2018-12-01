<template>
  <div class="order_detail">
    <x-header :left-options="{backText: ''}">{{headerName}}
      <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <div class="main_content_wrapper">
      <group class="title_group">
        <x-input  class="input" title="订单号" v-model="ddid"></x-input>
        <x-button class="btn_ss" mini type="primary" @click.native="queryOrder">确定</x-button>
      </group>
      <div class="order_info">
        <div><span>车型：</span><span>{{currentOrder.car_pp}}</span></div>
        <div><span>车牌号：</span><span>{{currentOrder.car_cp}}</span></div>
        <div><span>下单时间：</span><span>{{currentOrder.xdsj}}</span></div>
        <div><span>联系人：</span><span>{{currentOrder.lxr}}</span></div>
        <div><span>联系电话：</span><span>{{currentOrder.lxrdh}}</span></div>
      </div>
      <div class="flex_wrapper">
       <image-upload class="img_item" :imgObj="img1"  :token="token"></image-upload>
        <image-upload class="img_item" :imgObj="img2"  :token="token"></image-upload>
        <image-upload class="img_item" :imgObj="img3"  :token="token"></image-upload>
      </div>
      <div class="flex_wrapper">
        <image-upload class="img_item" :imgObj="img4"  :token="token"></image-upload>
        <image-upload class="img_item" :imgObj="img5"  :token="token"></image-upload>
        <image-upload class="img_item" :imgObj="img6"  :token="token"></image-upload>
      </div>
      <div class="btn" @click="submitReturn" v-if="showBtn">申请交车</div>
    </div>
   </div>
</template>

<script>
import {XHeader, Group, XInput, XButton} from 'vux'
import imageUpload from '../components/imageUpload'
import api from '../router/api'
export default {
  name: 'orderDetail',
  components: {XHeader, imageUpload, Group, XInput, XButton},
  data () {
    return {
      img1: {
        id: 1,
        url: ''
      },
      img2: {
        id: 2,
        url: ''
      },
      img3: {
        id: 3,
        url: ''
      },
      img4: {
        id: 4,
        url: ''
      },
      img5: {
        id: 5,
        url: ''
      },
      img6: {
        id: 6,
        url: ''
      },
      currentOrder: '',
      token: '',
      ddid: this.$route.query.ddid || '',
      headerName: '还车',
      rwtype: this.$route.query.type,
      showBtn: true
    }
  },
  created () {
    this.getKoken()
  },
  mounted () {
    if (this.rwtype === '100') {
      this.headerName = '还车'
    } else if (this.rwtype === '101') {
      this.headerName = '借车'
    }
    let dd = JSON.parse(window.localStorage['currentOrder'])
    if (dd.ddid === this.ddid) {
      this.currentOrder = dd
    }
    if (!this.currentOrder.rw_id) {
      this.showBtn = true
    } else if (this.currentOrder.rwzt === '111' || this.currentOrder.rwzt === '108') {
      this.showBtn = true
    } else {
      this.showBtn = false
    }
  },
  methods: {
    // 获取图片七牛token
    getKoken () {
      var param = {
        'cmd': 's59',
        'code': '',
        'type': '1',
        'data': {
        }}
      api.postData(this, param).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.token = data.data
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    queryOrder () {
      if (this.ddid) {
        let params = api.getParam('tk03', {yw_id: this.ddid, rwtype: this.rwtype})
        api.postData(this, params).then((data) => {
          if (data.code === 0) {
            this.currentOrder = data.data[0]
            if (!this.currentOrder.rw_id) {
              this.showBtn = true
            } else if (this.currentOrder.rwzt === '111' || this.currentOrder.rwzt === '108') {
              this.showBtn = true
            } else {
              this.showBtn = false
            }
          } else {
            this.$vux.toast.text(data.msg, '')
          }
        }).catch((code) => {
          this.$vux.loading.hide()
          this.$vux.toast.text(code, '')
        })
      }
    },
    submitReturn () {
      if (this.img1.url === '') {
        this.$vux.toast.text('请选择上传照片', '')
        return
      }
      let param = {
        rwtype: this.rwtype,
        yw_id: this.ddid,
        rw_id: this.currentOrder.rw_id,
        zh_id: localStorage.getItem('userid'),
        car_id: this.currentOrder.car_id,
        car_simage: this.img1.url,
        car_nimge: this.img2.url,
        car_zimage: this.img3.url,
        car_himage: this.img4.url,
        car_dimage: this.img5.url,
        car_yimage: this.img6.url
      }
      let params = api.getParam('tk04', param)
      api.postData(this, params).then((data) => {
        if (data.code === 0) {
          this.$vux.toast.text(data.msg, '')
          this.showBtn = false
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
</script>

<style scoped lang="less">
.order_detail {
  padding-bottom: 50px;
  .order_info {
    background-color: #fff;
    margin: 18px 11px;
    padding: 18px;
    line-height: 30px;
    box-shadow: 3px 4px 5px 0px
    rgba(245, 245, 245, 0.75);
    border-radius: 8px;
  }
  .flex_wrapper {
    display: flex;
    padding: 0 15px 10px 15px;
    align-items:center;/*垂直居中*/
    .img_item {
      flex: 1;
      text-align: center;
      height: 73px;
      img {
        width: 105px;
        height: 73px;
      }
    }
  }
  .btn{
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #fff;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #0084ff;
    z-index: 1;
  }
  .title_group {
    position: relative;
  }
  .input {
    width: calc(100% - 75px);
  }
  .title_group .btn_ss {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0;
    height: 100%;
    background-color: #0084ff;
  }
}
</style>
