<template>
  <div class="navbar">
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-menu-item index="/"> 首页</el-menu-item>
      <el-menu-item index="/news"> 新闻中心</el-menu-item>
      <el-menu-item index="/product"> 产品与服务</el-menu-item>
      <el-menu-item index="" @click="handleClick"> 登录</el-menu-item>
    </el-menu>
    <div class="right">企业门户官网</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const handleClick = () => {
  window.location = "http://localhost:8080";
};
</script>

<style lang="scss" scoped>
.navbar ::v-deep {
  position: sticky;
  top: 0px;
  z-index: 999999;
  .right {
    position: fixed;
    top: 0;
    right: 20px;
    width: 100px;
    height: 60px;
    line-height: 75px;
    text-align: center;
  }
}
</style>
