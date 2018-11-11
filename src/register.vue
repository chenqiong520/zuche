<template>
  <div class="register">
    <x-header :left-options="{backText: ''}">注册</x-header>
     <div :class="step === 0? 'show_block': 'show_none'">
      <group  class="title_group">
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="姓名"  v-model="model.showname"  placeholder="姓名" ></x-input>
        </div>
       <div class="item_wrapper">
          <span class="tip">*</span>
          <PopupPicker placeholder="证件类型" v-model="idtype" :columns="1"  title="证件类型" :data="list" @on-change="changeIdtype" show-name></PopupPicker>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="证件号码" placeholder="证件号码"   v-model="model.idcard"></x-input>
        </div>
       <div v-show="isNoIdcard" class="item_wrapper">
          <span class="tip">*</span>
          <popup-radio title="性别" :options="sexList" v-model="model.sex"></popup-radio>
        </div>
       <div v-show="isNoIdcard" class="item_wrapper">
          <span class="tip">*</span>
          <datetime title="出生日期" v-model="model.birthday"> </datetime>
        </div>
        <div class="item_wrapper">
           <span class="tip">*</span>
           <PopupPicker placeholder="民族" v-model="nation" title="民族" :columns="1" :data="nationList"  show-name></PopupPicker>
         </div>
      </group>
      <div class="footer_div">
        <x-button class="submit_btn login_btn" @click.native="VerifyId">验证身份</x-button>
      </div>
    </div>
    <div :class="step === 1? 'show_block': 'show_none'">
      <group  class="title_group">
        <div class="item_wrapper">
          <span class="tip">*</span>
          <cell title="姓名"  :value="model.showname"></cell>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <cell title="证件号码"    :value="model.idcard"></cell>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="用户登录名"   v-model="model.username" ></x-input>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="登录密码"  type="password"  v-model="model.password" ></x-input>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="验证密码"  type="password"   v-model="model.confirmPwd" ></x-input>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="邮箱"    v-model="model.email" ></x-input>
        </div>
          <x-input title="QQ号码"   v-model="model.qq" ></x-input>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="手机号码"    v-model="model.phone" ></x-input>
        </div>
        <div class="item_wrapper">
          <span class="tip">*</span>
          <x-input title="校验码"   v-model="model.seccode"></x-input>
          <x-button  mini class="verify_button" @click.native="VerifyCode" :disabled="isDisabled">{{text}}</x-button>
        </div>
      </group>
      <div class="footer_div">
        <x-button class="submit_btn login_btn" @click.native="register">注册</x-button>
        <x-button class="pre_next login_btn" @click.native="preStep">上一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Cell, Group, XInput, XButton, PopupPicker, Datetime, PopupRadio} from 'vux'
import api from './router/api'
export default {
  name: 'register',
  components: {XHeader, Cell, Group, XInput, XButton, PopupPicker, Datetime, PopupRadio},
  data () {
    return {
      model: {
        showname: '',
        idtype: '',
        idcard: '',
        sex: '',
        birthday: '',
        nation: '',
        username: '', // 用户登录名
        password: '', // 用户密码
        confirmPwd: '',
        email: '',
        qq: '',
        phone: '', // 手机号码
        seccode: ''
      },
      idtype: [],
      nation: [],
      list: [],
      nationList: [],
      sexList: ['男', '女'],
      step: 0,
      isNoIdcard: false,
      text: '获取验证码',
      isDisabled: false
    }
  },
  created () {
    this.loadListData()
  },
  mounted () {
  },
  methods: {
    // 获取下拉数据
    loadListData () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('R001.001.001')
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          let list = []
          let list2 = []
          data.data[0].aac005.forEach((e) => {
            list.push({name: e.AAA103, value: e.AAA102})
          })
          data.data[1].bac002.forEach((e) => {
            list2.push({name: e.AAA103, value: e.AAA102})
          })
          this.nationList = list
          this.list = list2
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 选择证件类型改变
    changeIdtype (idType) {
      if (idType[0] === '1') {
        this.isNoIdcard = false
      } else {
        this.isNoIdcard = true
      }
    },
    // 验证身份证
    VerifyId () {
      if (this.model.showname === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入姓名'
        })
        return
      }
      if (this.idtype.length === 0) {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请选择证件类型'
        })
        return
      }
      if (this.model.idcard === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入证件号码'
        })
        return
      }
      if (this.idtype[0] !== '1') {
        if (this.model.sex === '') {
          this.$vux.alert.show({
            title: '输入有误',
            content: '请选择性别'
          })
          return
        }
        if (this.model.birthday === '') {
          this.$vux.alert.show({
            title: '输入有误',
            content: '请选择出生日期'
          })
          return
        }
      }
      if (this.nation.length === 0) {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请选择民族'
        })
        return
      }
      this.model.nation = this.nation[0]
      this.model.idtype = this.idtype[0]
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('R001.001.002', {idcard: this.model.idcard, showname: this.model.showname})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.step = 1
        } else {
          if (data.code === 1) {
            this.$vux.alert.show({
              title: '提示',
              content: data.msg
            })
          } else {
            this.$vux.toast.text(data.msg, '')
          }
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 上一步
    preStep () {
      this.step = 0
    },
    // 注册
    register () {
      if (this.model.seccode === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入验证码'
        })
        return
      }
      if (this.model.username === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入用户名'
        })
        return
      }
      if (this.model.password === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入密码'
        })
        return
      }
      if (this.model.confirmPwd === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入验证密码'
        })
        return
      }
      if (this.model.password !== this.model.confirmPwd) {
        this.$vux.alert.show({
          title: '输入有误',
          content: '两次密码不一致'
        })
        return
      }
      if (this.model.email === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入密码'
        })
        return
      }
      if (this.model.phone === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入手机号'
        })
        return
      }
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('R001.001.004', this.model)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.$vux.alert.show({
            title: '提示',
            content: data.msg
          })
          this.$router.replace('/login')
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
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
  .register {
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
      .login_btn {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      a {
        color: #777;
      }
      .forget_psd {
        float: right;
      }
    }
    .show_block {
      display: block;
    }
    .show_none {
      display: none;
    }
  }

</style>
