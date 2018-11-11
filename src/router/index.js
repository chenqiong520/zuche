import Vue from 'vue'
import Router from 'vue-router'

/** 首页**/
import index from '@/view/index'

/** 登录**/
import login from '@/login'

/** 租车**/
import carRenting from '@/view/carRenting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      component: index
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/carRenting',
      name: 'carRenting',
      component: carRenting
    }
  ]
})
