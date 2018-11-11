<template>
  <div class="find_password">
    <x-header :left-options="{backText: ''}">找回密码</x-header>
    <group  class="title_group">
      <div class="item_wrapper">
        <span class="tip">*</span>
        <x-input title="证件号码" placeholder="证件号码"   v-model="model.idcard"></x-input>
      </div>
      <div class="item_wrapper">
        <span class="tip">*</span>
        <x-input title="手机号码"    v-model="model.phone" ></x-input>
      </div>
      <div class="item_wrapper">
        <span class="tip">*</span>
        <x-input title="校验码"   v-model="model.seccode"></x-input>
        <x-button  mini class="verify_button" @click.native="VerifyCode" :disabled="isDisabled">{{text}}</x-button>
      </div>
      <div class="item_wrapper">
        <span class="tip">*</span>
        <x-input title="新密码"  type="password"  v-model="model.password" ></x-input>
      </div>
      <div class="item_wrapper">
        <span class="tip">*</span>
        <x-input title="确认密码"  type="password"   v-model="model.confirmPwd" ></x-input>
      </div>
    </group>
    <div class="footer_div">
      <x-button class="submit_btn" @click.native="confirmPassword">确定</x-button>
    </div>
  </div>
</template>

<script>
import {XHeader, Cell, Group, XInput, XButton} from 'vux'
import api from './router/api'
export default {
  name: 'findPassword',
  components: {XHeader, Cell, Group, XInput, XButton},
  data () {
    return {
      model: {
        idcard: '',
        password: '', // 用户密码
        confirmPwd: '',
        phone: '', // 手机号码
        seccode: ''
      },
      text: '获取验证码',
      isDisabled: false
    }
  },
  methods: {
    confirmPassword () {},
    // 发送验证码
    getCode () {
      const params = api.getParam('R001.001.003', {idcard: this.model.idcard, phone: this.model.phone})
      api.postData(this, params).then((data) => {
        if (data.code === 0) {
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
      })
    },
    VerifyCode () {
      if (this.text !== '获取验证码') return
      let text = ''
      if (this.model.phone === '') text = '请输入手机号'
      if (text !== '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: text
        })
        return
      }
      this.getCode()
      this.isDisabled = true
      let sendTimer
      let s = 60
      this.text = s + '秒'
      sendTimer = setInterval(() => {
        this.text = --s + '秒'
        if (s <= 0) {
          this.text = '获取验证码'
          this.isDisabled = false
          clearInterval(sendTimer)
          sendTimer = 0
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.find_password {
  .verify_button {
    position: absolute;
    top: 1px;
    right: 15px;
    bottom: 0;
    border-left: solid 1px #d9d9d9;
    background-color: #fff;
    color: #0084ff;
    border-radius: 0;
    &.weui-btn:after {
      border: none;
    }
    &.weui-btn_disabled {
      color:rgba(0, 0, 0, 0.3)
    }
  }
  .footer_div {
    padding: 0 15px;
    .submit_btn {
      margin-top: 20px;
    }
  }
}
</style>
