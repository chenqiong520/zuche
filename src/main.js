// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin} from 'vux'
import tools from './router/tool'
import BaiduMap from 'vue-baidu-map'
import '../static/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(ToastPlugin)
Vue.use(ElementUI)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(tools)
Vue.use(BaiduMap, {
  ak: 'OrqP141mQUPojuhgWQgkepEI0nmorLlF'
})
AjaxPlugin.$http.defaults.timeout = 10000
// 返回状态判断(添加响应拦截器)
AjaxPlugin.$http.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.data.code === 9010 || res.data.code === 9009) {
      router.push('/login')
      return {data: {msg: '请先登录', returnCode: -1}}
    }
    return res
  },
  error => {
    if (error.response === undefined && error.message === 'Network Error') {
      error.msg = '服务器正在重启，请稍后再试'
    }
    return Promise.reject(error)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
