<template>
   <div class="zxz">
     <x-header :left-options="{backText: ''}">历史订单
       <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
     </x-header>
     <div>
       <div class="title no_margin">
         <span>订单号</span> <label>20180909675723</label>
       </div>
       <group  class="title_group">
         <cell title="车型"  :value="queryParam.rentWay"></cell>
         <cell title="租车起止日期"  :value="queryParam.needDriver" ></cell>
         <cell  title="时长" :value="queryParam.startDate" > </cell>
         <cell  title="价格总计" :value="queryParam.relateName"></cell>
         <cell  title="申请部门" :value="queryParam.relateTel"></cell>
         <cell  title="申请人" :value="queryParam.purpose"></cell>
         <cell  title="订单进度" :value="queryParam.purpose"></cell>
         <cell  title="驾驶员姓名" :value="queryParam.purpose"></cell>
         <cell  title="驾驶员联系方式" :value="queryParam.purpose"></cell>
         <cell  title="取车时间" :value="queryParam.purpose"></cell>
         <cell  title="取车地址" :value="queryParam.purpose"></cell>
       </group>
       <div class="btn_group">
         <x-button class="pass">通过</x-button>
       </div>
     </div>
     <div>
       <div class="order_item"><span>订单号：2018090953123</span><span class="right">已结算</span></div>
       <div class="order_item"><span>订单号：2018090953123</span><span class="right">已结算</span></div>
       <div class="order_item"><span>订单号：2018090953123</span><span class="right">已结算</span></div>
     </div>
   </div>
</template>

<script>
import {XHeader, Group, Cell, XButton} from 'vux'
export default {
  name: 'orderDetail',
  components: {XHeader, Group, Cell, XButton},
  data () {
    return {
      queryParam: {
        rentWay: '通过',
        needDriver: '',
        startDate: '',
        endDate: '',
        relateName: '',
        relateTel: '',
        purpose: '',
        startPlace: '',
        endPlace: ''
      }
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
