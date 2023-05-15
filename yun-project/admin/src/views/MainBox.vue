<template>
  <div class="common-layout">
    <el-container>
      <SideMenu></SideMenu>
      <el-container direction="vertical">
        <TopHeader></TopHeader>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
// vue3中使用了setup语法糖，把组件引入就默认是注册了组件了
import TopHeader from "@/components/TopHeader.vue";
import SideMenu from "@/components/SideMenu.vue";
</script>

<style lang="scss" scoped>
.common-layout ::v-deep {
  width: 100vw;
  min-height: 100vh;

  .el-header,
  .el-aside,
  .el-main {
    padding: 0;
  }
  .el-main {
    height: calc(100vh - 60px);
    overflow: auto;
    padding: 0;
  }
}
</style>
