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
      <el-collapse accordion  v-model="activeName" @change="handleChange" >
        <el-collapse-item   v-for="(item,index) in list" :key="index" :name="index">
          <template slot="title">
            <div  style="font-size: 15px">订单号: <span style=" display:inline-block;margin-left: 10px"> {{item.sqid}}</span></div>
          </template>
          <group class="title_group">
            <cell title="申请人" :value="item.sqr"></cell>
            <cell title="申请人电话" :value="item.sqrdh"></cell>
            <cell title="计费方式" :value="item.jffs"></cell>
            <cell title="用车时间" :value =" fmtSJ(item.scsj_beg,item.scsj_end)"></cell>
            <cell title="车辆用途" :value="item.clyt"></cell>
            <cell title="车辆型号" :value="fmtXH(item)"></cell>
            <cell title="申请台数" :value="item.sqsl"></cell>
            <cell title="接车地点" :value="item.jcdd"></cell>
            <cell title="目的地" :value= "item.mdd"></cell>
            <cell title="是否需要司机" :value ="item.xysj"></cell>
          </group>
        </el-collapse-item>
      </el-collapse>
      <div class="btn_group">
        <x-button class="pass">通过</x-button>
        <x-button class="failed"> 不通过</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, Group, Cell, XButton, Tab, TabItem} from 'vux'
import api from '../router/api'
export default {
  name: 'shenpi',
  components: {XHeader, Group, Cell, XButton, Tab, TabItem},
  data () {
    return {
      approveParam: {
        orderNo: '',
        rentTimes: '',
        duration: ''
      },
      activeName: '',
      list: []
    }
  },
  mounted () {
    this.queryList()
  },
  methods: {
    handleChange () {
      if (this.activeName || this.activeName === 0) {
        console.log(this.list[this.activeName])
      }
    },
    fmtSJ (beg, end) {
      return beg.substring(0, 16) + ' - ' + end.substring(0, 16)
    },
    fmtXH (item) {
      return item.car_pp + item.car_xh
    },
    queryList () {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app006', {ysh: '0'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.list = data.data.rows
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
