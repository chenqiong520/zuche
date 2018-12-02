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
            <popup-picker title="租赁方式" show-name  :data="list1" v-model="rentWay"  placeholder="请选择" @on-change="selectRentWay"></popup-picker>
            <datetime  title="租赁起始日期" v-model="queryParam.jcsj" format="YYYY-MM-DD HH:mm" placeholder="请选择"> </datetime>
            <x-number v-show="queryParam.jffs === '2'" title="包日数" v-model="queryParam.bts" :min="0" @on-change="changeDay"></x-number>
            <x-number  v-show="queryParam.jffs === '3'" title="包月数" v-model="queryParam.bys" :min="0" @on-change="changeMonth"></x-number>
            <datetime  v-show="queryParam.jffs !== '1'" readonly title="租赁结束日期" v-model="queryParam.hcsj" format="YYYY-MM-DD HH:mm"> </datetime>
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
              <x-number class="num_car" v-model="item.sqsl" :min="0" @click.native="selectCar(item, index)"></x-number>
              <el-radio class="need_driver" :disabled="item.driver === 0 || item.sqsl === 0" v-model="item.xysj" label="1">配备司机</el-radio>
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
            <x-input title="始发地" v-model="queryParam.jcdd" @on-change="changeInput"></x-input>
          </div>
          <div class="item_wrapper">
            <img class="icon_img" src="../assets/mdd.png">
            <x-input  v-show="queryParam.jffs === '1'"  title="目的地" v-model="queryParam.mdd" @on-change="changeMdd"></x-input>
          </div>
        </group>
        <baidu-map class="map" center="抚州" :zoom="zoom" @ready="handler">
          <!--BmView 是用于渲染百度地图实例可视化区域的容器，通常与 LocalSearch 等会输出其它视图的组件结合使用。-->
          <bm-view style="width: 100%; height:100%;"></bm-view>
          <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label :content="mapcontent" :labelStyle="{fontFamily:'黑体',borderColor:'white',color: 'black', fontSize : '18px',fontWeight:'bold',padding: '5px'}" :offset="{width: 0, height: 30}"/>
          </bm-marker>
          <bm-driving
            :start="drivingParam.start"
            :end="drivingParam.end"
            :startCity="drivingParam.startCity"
            :endCity="drivingParam.endCity"
            :auto-viewport="true"
            :panel="false"
            @markersset="markersset"
          ></bm-driving>
          <!-- 地区检索控件-->
          <bm-local-search class="search_panel" :class="isChangeMdd ? 'mdd_panel': ''" @infohtmlset="infohtmlset" :keyword="keyword" :auto-viewport="true"
                           location="抚州" :pageCapacity="6" :panel="showPanel"></bm-local-search>
        </baidu-map>
        <div class="btn_next submit_order" @click="submitOrder">提交订单</div>
      </div>
    </div>
</template>

<script>
import {XHeader, Group, PopupPicker, Datetime, XInput, XNumber, CheckIcon} from 'vux'
import api from '../router/api'
export default {
  name: 'carRenting',
  components: {XHeader, Group, PopupPicker, Datetime, XInput, XNumber, CheckIcon},
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
        mdd_jwd: '',
        bts: 0, // 包天数
        bys: 0// 包月数
      },
      zoom: 15,
      center: {
        lng: 116.364537,
        lat: 27.954893
      },
      drivingParam: {
        start: '',
        startCity: '',
        end: '',
        endCity: ''
      },
      keyword: '',
      mapcontent: '抚州市',
      showPanel: false,
      isInput: true,
      isChangeMdd: false,
      map: ''
    }
  },
  mounted () {},
  methods: {
    // 根据租赁方式添加列表
    selectRentWay (way) {
      this.queryParam.jffs = way[0]
      this.queryParam.jcsj = ''
      this.queryParam.hcsj = ''
      this.queryParam.bts = 0
      this.queryParam.bys = 0
      this.queryParam.mdd = ''
      this.queryParam.mdd_jwd = ''
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app003', {gzlx: way[0]})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          if (data.data.rows && data.data.rows.length > 0) {
            for (let i in data.data.rows) {
              data.data.rows[i].sqsl = 0
              data.data.rows[i].xysj = '0'
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
    changeDay () {
      if (this.queryParam.jcsj) {
        let date = new Date(this.queryParam.jcsj)
        date.setDate(date.getDate() + this.queryParam.bts)
        let strDate = this.$root.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        this.queryParam.hcsj = strDate
      }
    },
    changeMonth () {
      if (this.queryParam.jcsj) {
        let date = new Date(this.queryParam.jcsj)
        date.setMonth(date.getMonth() + this.queryParam.bys)
        let strDate = this.$root.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        this.queryParam.hcsj = strDate
      }
    },
    nextStep () {
      if (this.queryParam.jffs === '') {
        this.$vux.toast.text('请选择租赁方式', '')
        return
      } else if (this.queryParam.jcsj === '') {
        this.$vux.toast.text('请选择起始时间', '')
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
      if (this.queryParam.jffs === '2') {
        if (this.queryParam.bts === 0) {
          this.$vux.toast.text('请选择包天数', '')
          return
        }
      }
      if (this.queryParam.jffs === '3') {
        if (this.queryParam.bys === 0) {
          this.$vux.toast.text('请选择包月数', '')
          return
        }
        return
      }
      this.step = 1
    },
    // 选择车辆
    selectCar (item, index) {
      this.queryParam.sqsl = item.sqsl
      this.queryParam.car_pp = item.car_pp
      this.queryParam.car_xh = item.car_xh
      this.carList.forEach((e) => {
        if (e.id !== item.id) {
          e.sqsl = 0
          e.xysj = '0'
        }
      })
    },
    selectNeed (item, index) {
      this.queryParam.xysj = item.xysj
    },
    submitOrder () {
      if (this.queryParam.jcdd === '') {
        this.$vux.toast.text('请输入起始地', '')
        return
      }
      if (this.queryParam.jffs === '1') {
        if (this.queryParam.mdd === '') {
          this.$vux.toast.text('请输入目的地', '')
          return
        }
      }
      let param = {}
      Object.assign(param, this.queryParam)
      param.jcsj = this.queryParam.jcsj + ':00'
      let params = api.getParam('app004', param)
      this.$vux.loading.show({text: '加载中'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.$vux.toast.text('租车成功', '')
          this.$router.push('/index')
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    changeInput () {
      if (this.isInput) {
        this.showPanel = true
        this.keyword = this.queryParam.jcdd
        this.isChangeMdd = false
      } else {
        this.isInput = true
      }
    },
    changeMdd () {
      if (this.isInput) {
        this.isChangeMdd = true
        this.showPanel = true
        this.keyword = this.queryParam.mdd
      } else {
        this.isInput = true
      }
    },
    // 结果面板列表的点击事件
    infohtmlset (point) {
      this.center.lat = point.point.lat
      this.center.lng = point.point.lng
      this.mapcontent = point.title
      this.keyword = ''
      this.showPanel = false
      this.isInput = false
      this.map.Oa = 19
      if (this.isChangeMdd) {
        console.log(point)
        this.queryParam.mdd = point.title
        this.queryParam.mdd_jwd = point.point.lat + ',' + point.point.lng
        this.drivingParam.end = point.point
        this.drivingParam.endCity = point.city
      } else {
        console.log(point)
        this.queryParam.jcdd = point.title
        this.queryParam.jcdd_jwd = point.point.lat + ',' + point.point.lng
        this.drivingParam.start = point.point
        this.drivingParam.startCity = point.city
      }
    },
    handler ({BMap, map}) {
      this.map = map
    },
    markersset () {
      this.center.lat = ''
      this.center.lng = ''
      this.mapcontent = ''
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
    height:  calc(100% - 134px);
    width: 100%;
  }
  .search_panel {
    position: absolute;
    width: 100%;
    top:44px;
    &.mdd_panel {
      top: 86.5px
    }
  }
}
</style>
