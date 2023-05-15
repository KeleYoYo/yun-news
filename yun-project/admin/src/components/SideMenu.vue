<template>
  <el-aside :width="$store.state.isCollaspsed ? '64px' : '200px'">
    <!--el-menu组件的 router属性设为true时，会将index的值作为路径来进行路由跳转 default-active属性值，指定在刷新后，默认高亮选中的路径-->
    <el-menu
      :collapse-transition="true"
      :collapse="$store.state.isCollaspsed"
      :default-active="route.fullPath"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <el-menu-item index="/mainbox/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/mainbox/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <!-- 用自定义命令来控制权限显示菜单 -->
      <el-sub-menu v-admin index="/mainbox/user-manage">
        <template #title>
          <el-icon><Pointer /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group title="Group One">
          <!-- index的作用是为了显示唯一一个高亮的效果，Index需要是个唯一值，所以可以用路径来 -->
          <el-menu-item index="/mainbox/user-manage/adduser"
            >添加用户</el-menu-item
          >
          <el-menu-item index="/mainbox/user-manage/userlist"
            >用户列表</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/mainbox/news-manage">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item-group title="Group One">
          <!-- index的作用是为了显示唯一一个高亮的效果，Index需要是个唯一值，所以可以用路径来 -->
          <el-menu-item index="/mainbox/news-manage/addnews"
            >添加新闻</el-menu-item
          >
          <el-menu-item index="/mainbox/news-manage/newslist"
            >新闻列表</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/mainbox/product-manage">
        <template #title>
          <el-icon><Reading /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item-group title="Group One">
          <!-- index的作用是为了显示唯一一个高亮的效果，Index需要是个唯一值，所以可以用路径来 -->
          <el-menu-item index="/mainbox/product-manage/addproduct"
            >添加产品</el-menu-item
          >
          <el-menu-item index="/mainbox/product-manage/productlist"
            >产品列表</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
// el-icon组件需要导入进来，可以在main.js中全局导入，也可以按需引入
import {
  HomeFilled,
  Avatar,
  MessageBox,
  Reading,
  Pointer,
} from "@element-plus/icons-vue";

import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute(); //拿到当前匹配的路由对象
const store = useStore();
// console.log(route.fullPath);
//v-admin自定义指令
const vAdmin = {
  mounted(el) {
    // 只要标签上使用到了v-admin指令，就会打印出该标签也就是el
    console.log(el);
    if (store.state.userInfo.role !== 1) {
      el.parentNode.removeChild(el); //不是管理员角色，移除该标签
    }
    // 光是这样做权限管理是存在漏洞的，我们在对应的路由上，（user-manage/adduser，和user-manage/adduser【‘、’】这一块）,做权限管理
  },
};
</script>

<style lang="scss" scoped>
.el-aside ::v-deep {
  transition: all 0.3s;
  height: 100vh;

  .el-menu {
    background-color: rgb(223, 128, 226);
    height: 100vh;
    .el-menu-item,
    span {
      font-size: 16px;
    }
    .el-menu--inline {
      max-height: 200px;
    }
  }
}
</style>
