<template>
  <div class="shenpi">
    <x-header :left-options="{backText: ''}">审批
      <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <div>
      <tab bar-active-color="#0084ff" active-color="#333">
        <tab-item selected @on-item-click="queryList">待审批订单</tab-item>
        <tab-item @on-item-click="queryHasList">已审批订单</tab-item>
      </tab>
      <el-collapse accordion v-show="showTabOne">
        <el-collapse-item   v-for="(item,index) in list" :key="index">
          <template slot="title">
            <div   style="font-size: 15px;padding-left: 15px">订单号: <span style=" display:inline-block;margin-left: 10px"> {{item.sqid}}</span></div>
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
          <div class="btn_group">
            <x-button class="pass" @click.native="pass(item)">通过</x-button>
            <x-button class="failed"  @click.native="failed(item)"> 不通过</x-button>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse accordion v-show="!showTabOne">
        <el-collapse-item   v-for="(item,index) in haslist" :key="index" :name="index">
          <template slot="title">
            <div  style="font-size: 15px;padding-left: 15px">订单号: <span style=" display:inline-block;margin-left: 10px"> {{item.sqid}}</span>
              <span style=" display:inline-block;margin-left: 30px;color:#0084ff">{{item.shbz}}</span></div>
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
      list: [],
      haslist: [],
      showTabOne: true
    }
  },
  mounted () {
    this.queryList()
  },
  methods: {
    fmtSJ (beg, end) {
      return beg.substring(0, 16) + ' - ' + end.substring(0, 16)
    },
    fmtXH (item) {
      return item.car_pp + item.car_xh
    },
    queryList () {
      this.showTabOne = true
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
    },
    queryHasList () {
      this.showTabOne = false
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app006', {ysh: '1'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.haslist = data.data.rows
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    pass (item) {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app007', {'sqid': item.sqid, 'shbz': '1', 'shyj': ''})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.queryList()
          this.$vux.toast.text('操作成功', '')
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    failed (item) {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app007', {'sqid': item.sqid, 'shbz': '2', 'shyj': ''})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.queryList()
          this.$vux.toast.text('操作成功', '')
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
