<template>
  <el-header>
    <!-- // 模板中要用store用$来访问 -->
    <!-- <button @click="$store.state.isCollaspsed = !$store.state.isCollaspsed">
      菜单
    </button> -->
    <div class="left">
      <el-icon @click="handle" :size="30"><Grid /></el-icon>
      <span style="margin-left: 10px">企业门户管理系统</span>
    </div>
    <div class="right">
      <span>欢迎你,{{ $store.state.userInfo.username }}</span>
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="30">
            <User></User>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu c>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Grid, User } from "@element-plus/icons-vue";
const store = useStore();
const router = useRouter();
const handle = () => {
  //   js中要用store通过从vuex中拿到useStore
  //store.state.isCollaspsed = !store.state.isCollaspsed; //不推荐直接该state
  store.commit("changCollaspsed");
};

const handleCenter = () => {
  router.push("/mainbox/center");
};
const handleLogout = () => {
  // 退出前先清楚Token
  localStorage.removeItem("token");
  store.commit("cleanUserInfo");
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.el-header ::v-deep {
  color: white;
  min-height: 60px;
  background-color: rgb(31, 14, 7);
  display: flex;
  align-items: center;
  font-size: 19px;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    align-items: center;
    .el-icon:hover {
      cursor: pointer;
    }
  }
  .left {
    i {
      margin-left: 20px;
    }
  }
  .right {
    span,
    .el-dropdown {
      margin-right: 10px;
      .el-icon {
        color: white;
      }
    }
  }
}
</style>
