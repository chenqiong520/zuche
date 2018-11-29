import Vue from 'vue'
import Router from 'vue-router'

/** 首页**/
import index from '@/view/index'

/** 登录**/
import login from '@/login'

/** 租车**/
import carRenting from '@/view/carRenting'

/** 审批**/
import shenpi from '@/view/shenpi'

/** 执行中**/
import orderList from '@/view/orderList'

/** 订单详情**/
import orderDetail from '@/view/orderDetail'

import test from '@/test'
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
    }, {
      path: '/shenpi',
      name: 'shenpi',
      component: shenpi
    }, {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    }, {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
