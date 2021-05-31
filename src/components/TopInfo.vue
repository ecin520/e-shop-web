<template>
  <div>
    <p style="margin: 13px;font-size: 13px;margin-left: 10%" class="normal-font">
<!--        <span>Hi，欢迎你！</span>-->
        <span class="global-hover" style="margin-left: 20px">
            <v-icon>mdi-cart</v-icon>
        <span @click="$router.push({path: '/cart-list'})" class="ma-1">购物车</span>
      </span>
      <span @click="toOrderList" style="margin-left: 20px" class="global-hover">我的订单</span>
      <span style="margin-left: 20px" class="global-hover">商家登录</span>
      <span style="margin-left: 20px" class="global-hover" @click="$router.push({path: '/'})">首页</span>
    </p>
  </div>
</template>

<script>
  import {checkLoginStatus} from "../utils/common";

  export default {
    name: "TopInfo",
      methods: {
          toOrderList() {
              if (this.loginStatus) {
                  this.$router.push({path: '/order-list'})
              } else {
                  this.$router.push({path: '/login', query: {returnUrl: '/order-list'}})
              }
          }
      },
      computed: {
          loginStatus() {
              return checkLoginStatus();
          }
      }

  }
</script>

<style scoped>

</style>
