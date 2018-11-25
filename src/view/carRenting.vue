<template>
    <div class="car_renting">
      <x-header  v-show="step===0" :left-options="{backText: ''}">租车
        <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
      <x-header  v-show="step===1" :left-options="{backText: '', preventGoBack: true}" @on-click-back="step = 0">租车
        <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
      </x-header>
      <div v-show="step===0">
        <div>
          <div class="title no_margin">
            <span>租车</span>
          </div>
          <group  class="title_group">
            <popup-picker title="租赁方式" show-name  :data="list1" v-model="queryParam.rentWay"  placeholder="请选择" @on-change="selectRentWay"></popup-picker>
            <popup-picker title="需要司机" show-name :data="list2" v-model="queryParam.needDriver"  placeholder="请选择" @on-change="selectNeed"></popup-picker>
            <datetime  title="租赁起始日期" v-model="queryParam.jcsj" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" placeholder="请选择"> </datetime>
            <datetime  title="租赁结束日期" v-model="queryParam.hcsj" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" placeholder="请选择"> </datetime>
            <x-input  title="用车人" v-model="queryParam.ycr"></x-input>
            <x-input  title="用车人电话" v-model="queryParam.ycrdh"></x-input>
            <x-input  title="车辆用途" v-model="queryParam.clyt"></x-input>
          </group>
        </div>
         <div style="margin-top: 15px">
          <div class="flex_wrapper"   v-for="(item, index) in carList" :key="index">
            <div class="car_img"><img :src="item.carphoto"></div>
            <div class="car_info">
              <div class="car_name">{{item.car_pp}}{{item.car_xh}}</div>
              <div class="car_tip">{{item.ptype}} / {{item.scount}}座</div>
              <div  class="car_tip">三责险额度：<span style="color: #e8a75b">50万</span></div>
            </div>
            <div class="num">
              <input v-model="item.sqsl" @blur="selectCar(item, index)"/>
            </div>
          </div>
        </div>
        <p class="notice_msg">超里程数：100公里/天，超过标准按照公里价格计算</p>
        <div class="btn_next" @click="nextStep">下一步</div>
      </div>
      <div v-show="step ===1" class="next_step">
        <group class="title_group">
          <div class="item_wrapper">
            <img class="icon_img" src="../assets/sfd.png">
            <x-input title="始发地" v-model="queryParam.jcdd" @click="mapShow=true"></x-input>
          </div>
          <div class="item_wrapper">
            <img class="icon_img" src="../assets/mdd.png">
            <x-input  title="目的地" v-model="queryParam.mdd" ></x-input>
          </div>
        </group>
        <baidu-map v-show="mapShow" class="map">
          <bm-view style="width: 100%; height:100%;"></bm-view>
        </baidu-map>
        <div class="btn_next submit_order" @click="submitOrder">提交订单</div>
      </div>
    </div>
</template>

<script>
import {XHeader, Group, PopupPicker, Datetime, XInput, Tab, TabItem} from 'vux'
import api from '../router/api'
export default {
  name: 'carRenting',
  components: {XHeader, Group, PopupPicker, Datetime, XInput, Tab, TabItem},
  data () {
    return {
      mapShow: false,
      step: 0,
      list1: [[{
        name: '里程',
        value: '1'
      }, {
        name: '包日',
        value: '2'
      }, {
        name: '包月',
        value: '3'
      }]],
      list2: [[{
        name: '不需',
        value: '0'
      }, {
        name: '需要',
        value: '1'
      }]],
      rentWay: [],
      needDriver: [],
      carList: [],
      queryParam: {
        jffs: '', // 租赁方式（计费方式）
        xysj: '', // 需要司机
        cldj: '1',
        jcsj: '',
        hcsj: '',
        ycr: '',
        ycrdh: '',
        clyt: '', // 车辆用途
        sqsl: '', // 车辆数量
        car_pp: '',
        car_xh: '',
        jcdd: '', // 起始地
        jcdd_jwd: '',
        mdd: '', // 目的地
        mdd_jwd: ''
      }
    }
  },
  mounted () {},
  methods: {
    selectRentWay (way) {
      this.queryParam.jffs = way[0]
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app003', {gzlx: way[0]})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.rows && data.data.rows.length > 0) {
            for (let i in data.data.rows) {
              data.data.rows[i].sqsl = 0
            }
          }
          this.carList = data.data.rows
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    selectNeed (need) {
      this.queryParam.xysj = need[0]
    },
    nextStep () {
      if (this.queryParam.jffs === '') {
        this.$vux.toast.text('请选择租赁方式', '')
        return
      } else if (this.queryParam.xysj === '') {
        this.$vux.toast.text('请选择是否需要司机', '')
        return
      } else if (this.queryParam.jcsj === '') {
        this.$vux.toast.text('请选择起始时间', '')
        return
      } else if (this.queryParam.hcsj === '') {
        this.$vux.toast.text('请选择结束时间', '')
        return
      } else if (this.queryParam.ycr === '') {
        this.$vux.toast.text('请选择用车人', '')
        return
      } else if (this.queryParam.ycrdh === '') {
        this.$vux.toast.text('请选择用车人电话', '')
        return
      } else if (this.queryParam.sqsl === '') {
        this.$vux.toast.text('请选择用车', '')
        return
      } else if (!this.$tools.validateTel(this.queryParam.ycrdh)) {
        this.$vux.toast.text('请输入正确的手机号码', '')
        return
      }
      this.step = 1
    },
    selectCar (item, index) {
      this.queryParam.sqsl = item.sqsl
      this.queryParam.car_pp = item.car_pp
      this.queryParam.car_xh = item.car_xh
    },
    submitOrder () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app004', this.queryParam)
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
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
.car_renting {
  padding-top: 46px;
  .no_margin {
    margin-top: 0;
  }
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
      flex: 1;
    }
    .num {
      text-align: right;
      color: #0084ff;
      input {
        width: 60px;
        padding: 5px;
      }
    }
  }
  .notice_msg {
    margin: 15px;
    font-size: 12px;
    height: 50px;
  }
  .btn_next {
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #0084ff;
    color: #fff;
  }
  .next_step {
    background-color: #fff;
    position: absolute;
    top:46px;
    bottom: 0;
    width: 100%;
    .icon_img {
      height: 10px;
      width: 10px;
      position: absolute;
      left: 10px;
      top: 16px;
    }
    .submit_order {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  .map {
    height: 500px;
    width: 500px;
    position: fixed;
  }
}
</style>
