<template>
    <div class="car_renting">
      <x-header :left-options="{backText: ''}">租车
        <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
      <div>
        <div class="title no_margin">
          <span>待完成任务</span>
        </div>
        <group  class="title_group">
          <popup-picker title="租赁方式" :data="list1" v-model="queryParam.rentWay"  placeholder="请选择"></popup-picker>
          <popup-picker title="需要司机" :data="list1" v-model="queryParam.needDriver"  placeholder="请选择"></popup-picker>
          <datetime  title="租赁起始日期" v-model="queryParam.startDate" placeholder="请选择"> </datetime>
          <x-input  title="联系人" v-model="queryParam.relateName"></x-input>
          <x-input  title="联系电话" v-model="queryParam.relateTel"></x-input>
          <x-input  title="车辆用途" v-model="queryParam.purpose"></x-input>
        </group>
      </div>

      <tab class="tab" bar-active-color="#0084ff" active-color="#333">
        <tab-item >经济车型</tab-item>
        <tab-item >豪华车型</tab-item>
        <tab-item >特殊车型</tab-item>
      </tab>
      <div class="flex_wrapper">
        <div class="car_img"><img src="../assets/zuche.png"></div>
        <div class="car_info">
          <div class="car_name">大众朗逸</div>
          <div class="car_tip">三厢/五座</div>
          <div  class="car_tip">三责险额度<span style="color: #e8a75b">50万</span></div>
        </div>
        <div class="num">
          <span>3</span>
        </div>
      </div>
      <div class="flex_wrapper">
        <div class="car_img"><img src="../assets/zuche.png"></div>
        <div class="car_info">
          <div class="car_name">大众朗逸</div>
          <div class="car_tip">三厢/五座</div>
          <div  class="car_tip">三责险额度<span style="color: #e8a75b">50万</span></div>
        </div>
        <div class="num">
          <span>3</span>
        </div>
      </div>
      <p class="notice_msg">超里程数：100公里/天，超过标准按照公里价格计算</p>
      <div class="btn_next">下一步</div>
    </div>
</template>

<script>
import {XHeader, Group, PopupPicker, Datetime, XInput, Tab, TabItem} from 'vux'
export default {
  name: 'carRenting',
  components: {XHeader, Group, PopupPicker, Datetime, XInput, Tab, TabItem},
  data () {
    return {
      list1: ['方式A', '方式2'],
      list2: ['是', '否'],
      queryParam: {
        rentWay: '',
        needDriver: '',
        startDate: '',
        endDate: '',
        relateName: '',
        relateTel: '',
        purpose: ''

      }
    }
  }
}
</script>

<style scoped lang="less">
.car_renting {
  padding-top: 46px;
  .tab {
    margin-top: 15px;
  }
  .flex_wrapper {
    display: flex;
    background-color: #fff;
    align-items:center;/*垂直居中*/
    padding: 15px;
    border-bottom:1px solid #d9d9d9;
    .car_img {
        margin-right: 20px;
      img {
        width: 83px;
        height: 63px;
      }
    }
    .car_info {
      .car_name {
      }
      line-height: 25px;
      .car_tip {
        color: #777;
        font-size: 13px;
        line-height: 20px;
      }
    }
    .num {
      flex: 1;
      text-align: right;
      color: #0084ff;
    }
  }
  .notice_msg {
    margin: 15px;
    font-size: 12px;
  }
  .btn_next {
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #0084ff;
    color: #fff;
  }
}
</style>
