<template>
  <div class="shenpi">
    <x-header :left-options="{backText: ''}">审批
      <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <div>
      <tab bar-active-color="#0084ff" active-color="#333">
        <tab-item selected>待审批订单</tab-item>
        <tab-item>审批需求</tab-item>
      </tab>
      <group class="title_group">
        <cell title="订单号" v-model="approveParam.orderNo"></cell>
        <cell title="租车起止时间" v-model="approveParam.orderNo"></cell>
        <cell title="时长" v-model="approveParam.orderNo"></cell>
        <cell title="价格总计" v-model="approveParam.orderNo"></cell>
        <cell title="审计部门" v-model="approveParam.orderNo"></cell>
        <cell title="申请人" v-model="approveParam.orderNo"></cell>
        <cell title="订单进度" v-model="approveParam.orderNo"></cell>
      </group>
      <div class="btn_group">
        <x-button class="pass">通过</x-button>
        <x-button class="failed"> 不通过</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell, XButton, Tab, TabItem} from 'vux'
export default {
  name: 'shenpi',
  components: {XHeader, Group, Cell, XButton, Tab, TabItem},
  data () {
    return {
      approveParam: {
        orderNo: '',
        rentTimes: '',
        duration: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.shenpi {
  padding-top: 46px;
  .btn_group {
    margin: 40px 20px;
    .pass {
      background-color: #0084ff;
      color: #fff;
    }
    .failed {
      background-color: #ededed;
    }
  }
}
</style>
