<template>
  <div>
    <group>
      <XInput v-model="jcdd" placeholder="接车地点" @on-change="changeInput"></XInput>
      <XInput v-model="mdd" placeholder="目地点" @on-change="changeMdd"></XInput>
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
        @markersset="markersset"
      ></bm-driving>
     <!-- 地区检索控件-->
      <bm-local-search class="search_panel" :class="isChangeMdd ? 'mdd_panel': ''" @infohtmlset="infohtmlset" :keyword="keyword" :auto-viewport="true"
                       location="抚州" :pageCapacity="10" :panel="showPanel"></bm-local-search>
    </baidu-map>

  </div>
</template>

<script>
import {Group, XInput} from 'vux'
export default {
  name: 'test',
  components: {Group, XInput},
  data () {
    return {
      jcdd: '',
      mdd: '',
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
  methods: {
    changeInput () {
      if (this.isInput) {
        this.showPanel = true
        this.keyword = this.jcdd
        this.isChangeMdd = false
      } else {
        this.isInput = true
      }
    },
    changeMdd () {
      if (this.isInput) {
        this.isChangeMdd = true
        this.showPanel = true
        this.keyword = this.mdd
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
        this.mdd = point.title
        this.drivingParam.end = point.point
        this.drivingParam.endCity = point.city
      } else {
        this.jcdd = point.title
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
    },
    handleAvatarSuccess(res, file) {
      //console.log("file.filename:"+file.filename);
      //console.log("file.raw:"+file.raw);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message('上传成功');
      //console.log("this.imageUrl:"+this.imageUrl);
    },
    handleAvatarSuccessUpdate(res, file) {
      //console.log("file.filename:"+file.filename);
      console.log("this.imageUrlupdate:"+URL.createObjectURL(file.raw));
      this.imageUrlupdate=this.txurl;
      this.imageUrlUpdate = URL.createObjectURL(file.raw);
      this.$message('上传成功');
      //console.log("this.imageUrl:"+this.imageUrl);
    },
    beforeAvatarUpload(file) {
      var filename="tx_"+this.getTime()+Number.parseInt(Math.random()*1000,10);
      var filetype=file.type;
      var filetypename="."+filetype.substr(filetype.indexOf("/")+1,filetype.length);
      //console.log("file.filetypename:"+filetypename);
      //console.log("file.filename:"+filename);
      this.postData.key = filename+filetypename;
      this.txurl="http://img.cssbsb.top/"+filename+filetypename;
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      const isjpg = file.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPng && !isjpg) {
        this.$message.error('上传头像图片只能是 jpeg,png,jpg格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG||isPng||isjpg) && isLt2M;
    },
    beforeAvatarUploadUpdate(file) {
      var filename="tx_"+this.getTime()+Number.parseInt(Math.random()*1000,10);
      var filetype=file.type;
      var filetypename="."+filetype.substr(filetype.indexOf("/")+1,filetype.length);
      //console.log("file.filetypename:"+filetypename);
      //console.log("file.filename:"+filename);
      this.postData.key = filename+filetypename;
      this.txurl="http://img.cssbsb.top/

      "+filename+filetypename;
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      const isjpg = file.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPng && !isjpg) {
        this.$message.error('上传头像图片只能是 jpeg,png,jpg格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG||isPng||isjpg) && isLt2M;
    },

  }
}
</script>

<style scoped  lang="less">
.map {
  height: 500px;
  width: 100%;
}
  .search_panel {
    position: absolute;
    width: 100%;
    height: 100%;
    top:115px;
    &.mdd_panel {
      top: 155px
    }
  }
</style>
