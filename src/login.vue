<template>
  <div class="login">
    <div class="app_name">沐博</div>
    <group class="title_group">
      <x-input placeholder="账号" v-model="model.username"></x-input>
      <x-input  placeholder="密码"   type="password" v-model="model.password"></x-input>
    </group>
    <div class="footer_div">
      <x-button class="submit_btn login_btn" @click.native="login">登陆</x-button>
      <a href="javascript:void(0)" class="register" @click="register">注册</a>
        <a href="javascript:void(0)" class="forget_psd">忘记密码?</a>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, XInput, XButton, PopupPicker} from 'vux'

export default {
  components: {XHeader, Group, XInput, XButton, PopupPicker},
  data () {
    return {
      type: [],
      model: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
    window.localStorage.clear()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.preUrl = from.fullPath
    })
  },
  methods: {
    login () {
      let name = document.getElementsByTagName('input')[0].value.trim()
      let pwd = document.getElementsByTagName('input')[1].value.trim()
      this.model.username = name
      this.model.password = pwd
      if (this.model.username === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入证件号码'
        })
        return
      }
      if (this.model.password === '') {
        this.$vux.alert.show({
          title: '输入有误',
          content: '请输入密码'
        })
      }
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    background-color: #fff;
    height: 100%;
  }
  .app_name {
    font-size: 44px;
    color: #379df9;
    text-align: center;
    padding-top: 65px;
    margin-bottom: 77px;
  }
  .footer_div {
    padding: 0 15px;
    .login_btn {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    a {
      font-size: 18px;
      color: #7a7a7a;
    }
    .forget_psd {
      float: right;
    }
  }
</style>
