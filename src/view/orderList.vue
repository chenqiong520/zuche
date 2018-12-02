<template>
   <div class="zxz">
     <x-header :left-options="{backText: ''}">历史订单
       <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
     </x-header>
     <div>
       <tab bar-active-color="#0084ff" active-color="#333">
         <tab-item selected @on-item-click="querywshList">未审核订单</tab-item>
         <tab-item @on-item-click="queryOrderList">订单</tab-item>
       </tab>
     </div>
     <div>
       <el-collapse accordion v-show="showTabOne"  v-model="activeName">
         <el-collapse-item    v-for="(item, index) in wshOrderList" :key="index" :name="index">
           <template slot="title">
             <div   style="font-size: 15px;padding-left: 15px; width: 100%">订单号: <span style=" display:inline-block;margin-left: 10px"> {{item.sqid}}</span>
               <span style=" display:inline-block;margin-right: 10px;color:#0084ff; float: right;">{{fmtSH(item.shbz)}}</span>
             </div>
           </template>
           <group class="title_group">
             <cell title="申请号" :value="item.sqid"></cell>
             <cell title="车辆型号" :value="fmtXH(item)"></cell>
             <cell title="司机姓名" :value="item.zh_xm"></cell>
             <cell title="申请人" :value="item.sqr"></cell>
             <cell title="申请人电话" :value="item.sqrdh"></cell>
           </group>
           <div class="btn_group">
             <x-button v-if ="item.shbz === '0'" class="pass" @click.native="cancel(item)">取消</x-button>
           </div>
         </el-collapse-item>
       </el-collapse>

       <el-collapse accordion v-show="!showTabOne">
         <el-collapse-item   v-for="(item,index) in orderList" :key="index">
           <template slot="title">
             <div  style="font-size: 15px;padding-left: 15px;width: 100%">订单号: <span style=" display:inline-block;margin-left: 10px"> {{item.ddid}}</span>
               <span style=" display:inline-block;margin-right: 10px;color:#0084ff; float: right;">{{item.ddzt_z}}</span></div>
           </template>
           <group class="title_group">
             <cell title="申请号" :value="item.sqid"></cell>
             <cell title="车辆型号" :value="fmtXH(item)"></cell>
             <cell title="车牌号" :value="item.car_cp"></cell>
             <cell title="司机姓名" :value="item.zh_xm"></cell>
             <cell title="申请人" :value="item.sqr"></cell>
             <cell title="申请人电话" :value="item.sqrdh"></cell>
             <cell title="联系人" :value="item.lxr"></cell>
             <cell title="联系人电话" :value= "item.lxrdh"></cell>
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
  name: 'orderDetail',
  components: {XHeader, Group, Cell, XButton, Tab, TabItem},
  data () {
    return {
      showTabOne: true,
      orderList: [],
      wshOrderList: [],
      activeName: ''
    }
  },
  mounted () {
    this.querywshList()
  },
  methods: {
    querywshList () {
      this.showTabOne = true
      this.activeName = ''
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app002', {'shbz': '0'})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.wshOrderList = data.data.rows
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    cancel (item) {
      this.$vux.loading.show({text: '加载中'})
      let params = api.getParam('app005', {'sqid': item.sqid})
      api.postData(this, params).then((data) => {
        this.$vux.loading.hide()
        if (data.code === 0) {
          this.querywshList()
        } else {
          this.$vux.toast.text(data.msg, '')
        }
      }).catch((code) => {
        this.$vux.loading.hide()
        this.$vux.toast.text(code, '')
      })
    },
    queryOrderList () {
      this.showTabOne = false
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
    fmtSJ (beg, end) {
      if (beg) {
        if (end) {
          return beg.substring(0, 16) + ' - ' + end.substring(0, 16)
        }
        return beg.substring(0, 16)
      }
    },
    fmtXH (item) {
      console.log(item)
      return item.car_pp + item.car_xh
    },
    fmtSH (bz) {
      if (bz === '0') {
        return '未审核'
      } else if (bz === '1') {
        return '审核通过'
      } else if (bz === '2') {
        return '审核不通过'
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
