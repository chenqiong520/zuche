<template>
   <div class="index">
     <x-header :left-options="{backText: ''}">首页
       <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
     </x-header>
     <div class="main_content">
       <div class="flex_wrapper">
         <div class="user_img"><img :src="userInfo.zh_tx_fj" /></div>
         <div class="user_info">
           <p>{{userInfo.zh_xm}}</p>
           <p>{{userInfo.zhtypelabler}}</p>
           <p>{{userInfo.dwlabler}}</p>
         </div>
         <div v-if="false" class="finish_info">
           <p style="margin-bottom: 20px">待完成任务：<span style="color: #ff0000">4</span></p>
           <p>已完成任务：<span>120</span></p>
         </div>
         <div v-else class="finish_info">
           <p style="margin-bottom: 20px">租车状态：<span style="color: #ff0000">{{orderInfo.state}}</span></p>
           <p>历史订单数量：<span>{{orderInfo.ddcount}}</span></p>
         </div>
       </div>
     <!--  如果是员工就显示-->
       <div class="staff_content" v-if="true">
         <div class="title ">
           <span>当前订单</span>  <label class="right_text">上门交车</label>
         </div>
         <Group class="title_group">
           <cell title="地点" :value="userInfo.zh_xm"></cell>
           <cell title="时间" :value="userInfo.zh_xm"></cell>
           <cell title="姓名" :value="userInfo.zh_xm"></cell>
           <cell title="电话" :value="userInfo.zh_xm"></cell>
           <cell title="车牌号" :value="userInfo.zh_xm"></cell>
         </Group>
         <div class="btn_return_car">拍照还车</div>
         <div class="title ">
           <span>待完成任务</span>
         </div>
         <Group class="title_group">
           <cell title="上门交车" :value="userInfo.zh_xm"></cell>
           <cell title="上门还车" :value="userInfo.zh_xm"></cell>
           <cell title="上门还车" :value="userInfo.zh_xm"></cell>
         </Group>
         <div class="btn_custom">客户还车</div>
       </div>
      <!--如果是用户就显示-->
       <div class="custom_content" v-if="false">
          <div class="flex_wrapper">
            <div class="item">
              <img src="../assets/zuche.png"/>
              <div>租车</div>
            </div>
            <div class="item">
              <img src="../assets/shenpi.png"/>
              <div>审批</div>
            </div>
            <div class="item">
              <img src="../assets/lishidingdan.png"/>
              <div>历史订单</div>
            </div>
          </div>
          <div class="banner_img">
            <img src="../assets/banner.png" />
          </div>
         <div class="title">
           <span>租赁订单</span> <label style="float:right; color: #0084ff">详情》</label>
         </div>
         <Group class="title_group">
           <cell title="订单号" :value="userInfo.zh_xm"></cell>
           <cell title="到期时间" :value="userInfo.zh_xm"></cell>
           <cell title="租赁车型" :value="userInfo.zh_xm"></cell>
           <cell title="订单持续日期" :value="userInfo.zh_xm"></cell>
         </Group>
         <div class="btn_group">
           <span class="btn">延期</span>
           <span class="btn">还车</span>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
import {XHeader, Group, Cell} from 'vux'
import api from '../router/api'
export default {
  name: 'index',
  components: {XHeader, Group, Cell},
  data () {
    return {
      userInfo: {
        zh_xm: '', // 姓名
        zhtype: '', // 用户角色类型
        zhtypelabler: '', // 角色
        dwlabler: '', // 单位
        zh_tx_fj: '' // 头像
      },
      orderInfo: {
        state: '',
        ddcount: ''
      },
      orderList: []
    }
  },
  mounted () {
    this.getUserInfo()
    this.loadOrderInfo()
    this.loadCurrentOrder()
  },
  methods: {
    // 获取用户基本信息
    getUserInfo () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('zh04', {'zh_id': localStorage.getItem('userid')})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.userInfo = data.data[0]
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    // 查询申请状态及历史订单数
    loadOrderInfo () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app001')
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.orderInfo = data.data
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    /*    // 查询历史订单
    loadOrderList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app002')
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.orderList = data.data.rows
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    }, */
    // 当前正在租车的订单
    loadCurrentOrder () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('dd00')
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.orderList = data.data.rows
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
.index {
  padding-top: 46px;
  .flex_wrapper {
    display: flex;
    background-color: #fff;
    padding: 10px 0;
    align-items:center;/*垂直居中*/
    .user_img {
      width: 80px;
      text-align: right;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .user_info {
      flex: 1;
      padding-left: 15px;
    }
    .finish_info {
      text-align: right;
      padding-right: 15px;
      font-size: 13px;
    }
  }
  .title {
    .right_text {
      float: right;
      color: #777;
      line-height: 15px;
    }
  }
  .btn_return_car {
    height: 44px;
    line-height: 44px;
    color: #0084ff;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }
  .btn_custom {
    text-align: center;
    margin-top: 30px;
    height: 44px;
    line-height: 44px;
    background-color: #0084ff;
    color: #fff;
  }
  .custom_content {
    margin-top: 15px;
    .flex_wrapper {
      justify-content: center;
      .item {
        flex-grow: 1;
        text-align: center;
        padding: 10px 0;
        img {
          width: 44px;
          height: 44px;
        }
      }
    }
    .banner_img {
      img {
        width: 100%;
        background-size: 100% 100%;
      }
    }
    .btn_group {
      padding: 10px 15px;
      text-align: right;
      background-color: #fff;
      .btn {
        display: inline-block;
        font-size: 13px;
        padding: 6px 15px;
        color: #666;
        border:1px solid #ebebeb;
        border-radius: 8px;
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
