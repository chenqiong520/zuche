<template>
  <div class="order_detail">
    <x-header :left-options="{backText: ''}">订单详情
      <x-icon slot="right" type="navicon" size="35" style="fill:#616161;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>
    <div class="main_content_wrapper">
      <div class="order_info">
        <div><span>车型：</span><span>福特福瑞斯</span></div>
        <div><span>租车起止日期：</span><span>2018-01-02---2019-02-03</span></div>
        <div><span>时长：</span><span>400天</span></div>
        <div><span>价格总计：</span><span>19823</span></div>
      </div>
      <div class="flex_wrapper">
       <image-upload class="img_item" :imgObj="img1"></image-upload>
        <image-upload class="img_item" :imgObj="img2"></image-upload>
        <image-upload class="img_item" :imgObj="img3"></image-upload>
      </div>
      <div class="flex_wrapper">
        <image-upload class="img_item" :imgObj="img4"></image-upload>
        <image-upload class="img_item" :imgObj="img5"></image-upload>
        <image-upload class="img_item" :imgObj="img6"></image-upload>
      </div>
      <div class="btn">申请交车</div>
    </div>
   </div>
</template>

<script>
import {XHeader} from 'vux'
import imageUpload from '../components/imageUpload'
export default {
  name: 'orderDetail',
  components: {XHeader, imageUpload},
  data () {
    return {
      img1: {
        id: 1,
        url: ''
      },
      img2: {
        id: 2,
        url: ''
      },
      img3: {
        id: 3,
        url: ''
      },
      img4: {
        id: 4,
        url: ''
      },
      img5: {
        id: 5,
        url: ''
      },
      img6: {
        id: 6,
        url: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.order_detail {
  padding-bottom: 50px;
  .order_info {
    background-color: #fff;
    margin: 18px 11px;
    padding: 18px;
    line-height: 30px;
    box-shadow: 3px 4px 5px 0px
    rgba(245, 245, 245, 0.75);
    border-radius: 8px;
  }
  .flex_wrapper {
    display: flex;
    padding: 0 15px 10px 15px;
    align-items:center;/*垂直居中*/
    .img_item {
      flex: 1;
      text-align: center;
      height: 73px;
      img {
        width: 105px;
        height: 73px;
      }
    }
  }
  .btn{
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #fff;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #0084ff;
    z-index: 1;
  }
}
</style>
