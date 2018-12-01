<template>
   <div class="zxz">
     <x-header :left-options="{backText: ''}">历史订单
       <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
     </x-header>
     <div>
       <div class="title no_margin">
         <span>订单号</span> <label style="margin-left: 10px">{{orderInfo.ddid}}</label>
       </div>
       <group  class="title_group">
         <cell title="车型"  :value="orderInfo.car_xh"></cell>
         <cell title="租车起止日期"  :value="orderInfo.needDriver" ></cell>
         <cell  title="时长" :value="orderInfo.startDate" > </cell>
         <cell  title="价格总计" :value="orderInfo.relateName"></cell>
         <cell  title="申请部门" :value="orderInfo.relateTel"></cell>
         <cell  title="申请人" :value="orderInfo.sqr"></cell>
         <cell  title="订单进度" :value="orderInfo.purpose"></cell>
         <cell  title="驾驶员姓名" :value="orderInfo.purpose"></cell>
         <cell  title="驾驶员联系方式" :value="orderInfo.lxrdh"></cell>
         <cell  title="取车时间" :value="orderInfo.purpose"></cell>
         <cell  title="取车地址" :value="orderInfo.purpose"></cell>
       </group>
       <div class="btn_group">
         <x-button class="pass">通过</x-button>
       </div>
     </div>
     <div>
       <div class="order_item" v-for="(item, index) in orderList" :key="index" @click="detailOrder(item)">
         <span>订单号：{{item.ddid}}</span><span class="right">{{item.sqzt}}</span>
       </div>
     </div>
   </div>
</template>

<script>
import {XHeader, Group, Cell, XButton} from 'vux'
import api from '../router/api'
export default {
  name: 'orderDetail',
  components: {XHeader, Group, Cell, XButton},
  data () {
    return {
      orderInfo: {
        ddid: '',
        sqr: '',
        lxrdh: '',
        rentWay: '通过',
        needDriver: '',
        startDate: '',
        endDate: '',
        relateName: '',
        relateTel: '',
        purpose: '',
        startPlace: '',
        endPlace: ''
      },
      orderList: []
    }
  },
  mounted () {
    this.queryOrderList()
  },
  methods: {
    queryOrderList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('dd08')
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.orderList = data.data
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    detailOrder (item) {
      this.orderInfo = item
    }
  }
}
</script>

<style scoped lang="less">
.zxz {
  padding-top:46px ;
  .no_margin {
    margin-top: 0;
  }
  .btn_group {
    margin: 30px 20px;
    .pass {
      background-color: #0084ff;
      color: #fff;
    }
  }
  .order_item {
    position: relative;
    border-bottom: 1px solid #ededed;
    background-color: #fff;
    padding: 10px 15px;
    &:last-child{
      border-bottom: none;
    }
    .right {
      float:right;
      color: #777;
      font-size: 14px;
    }
  }
}
</style>
