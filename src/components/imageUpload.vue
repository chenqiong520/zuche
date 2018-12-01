<template>
  <div>
    <div class="image_upload">
      <el-upload
        class="avatar-uploader"
        action="https://upload.qiniup.com"
        :show-file-list="false"
        :on-success="handleAvatarSuccessUpdate"
        :before-upload="beforeAvatarUploadUpdate"
        :data="postData">
        <img v-if="imgObj.url" :src="imgObj.url" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
import api from '../router/api'
export default {
  name: 'imageUpload',
  data () {
    return {
      postData:{
        key: "",
        token: ""
      },
      txurl: ''
    }
  },
  props: {
    imgObj: Object,
    token: String
  },
  watch: {
    token () {
      this.postData.token = this.token
    }
  },
  methods: {
    handleAvatarSuccessUpdate(res, file) {
      this.imgObj.url=this.txurl;
      this.imageUrlUpdate = URL.createObjectURL(file.raw);
      this.$message('上传成功');
    },
    beforeAvatarUploadUpdate(file) {
      var filename="tx_"+this.getTime()+Number.parseInt(Math.random()*1000,10);
      var filetype=file.type;
      var filetypename="."+filetype.substr(filetype.indexOf("/")+1,filetype.length);
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
    getTime () {
      var date = new Date()
      var year = date.getFullYear().toString()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * * */
      var month = (date.getMonth()+1<10 ? "0"+ (date.getMonth()+1) : date.getMonth()+1).toString();
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      var millisecondes=date.getMilliseconds();
      var time= year+''+month+day+hours+minutes+seconds+millisecondes;
      console.log("time:"+time);
      // 拼接
      return time;
    }
  }
}
</script>

<style scoped>
  .image_upload {
    position: relative;
    max-width: 103px;
    max-height: 73px;
    line-height: 73px ;
    border: 1px dashed #c0ccda;
  }
  .image_upload img {
    max-width: 103px;
    max-height: 73px;
  }
</style>
