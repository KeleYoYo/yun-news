<template>
  <div>
    <el-row>
      <!-- offset左偏一份, pull右边偏移一份-->
      <el-col :offset="1" :span="14">
        <div>
          <h2>新闻标题：{{ currentNew.title }}</h2>
          <div class="time">{{ timeFormat(currentNew.editTime) }}</div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <h4>正文内容:</h4>
          <div class="content" v-html="currentNew.content"></div>
        </div>
      </el-col>
      <el-col :pull="1" :offset="1" :span="7">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px; font-weight: bold">最近新闻</span>
              <el-button class="button" text
                ><el-icon :size="50"><Document /></el-icon
              ></el-button>
            </div>
          </template>
          <div
            v-for="item in topNewsList"
            :key="item._id"
            @click="handleChange(item._id)"
            class="text item"
          >
            {{ item.title }}
            <div class="time">{{ timeFormat(item.editTime) }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watchEffect, onBeforeUnmount } from "vue";
import moment from "moment";
import { StarFilled, Document } from "@element-plus/icons-vue";
moment.locale("zh-cn");
const timeFormat = (date) => {
  return moment(date).format("lll");
};
const currentNew = ref([]);
let topNewsList = ref([]);
const route = useRoute();
const router = useRouter();
const watchid = watchEffect(async () => {
  // watchEffect函数中的数据发生改变就会进行副作用，重新执行watchEffect
  // 但是watchEffec也会导致整个单页面的数据都被它监听到，切换到首页时，会出现bug
  //所以我们需要在这个组件快销毁时，取消watchEffect的监听
  //但是路由改变时，是watchEffect先执行，然后才取消监听（bug照样存在）
  //所以我们还要先进行判断，如果没有路由参数，我们就return出去
  if (!route.params.id) return;
  await axios.get(`/webapi/news/list/${route.params.id}`).then((res) => {
    console.log(res.data);
    currentNew.value = res.data.data[0];
  });
  // 返回limit条数据
  await axios.get(`/webapi/news/toplist?limit=4`).then((res) => {
    console.log(res.data);
    topNewsList.value = res.data.data;
  });
});
onBeforeUnmount(() => {
  //取消watchEffect的监听
  watchid();
});
const handleChange = (id) => {
  router.push(`/news/${id}`);
  //从详情跳转详情，当前路由组件不会销毁，onMounted钩子不会再次执行导致页面数据不会更新，所以我们要手动去更新一遍数据，
  //或者监听当前路由参数是否改变(watchEffect钩子去替换onMounted)
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;
  .content {
    margin-top: 20px;
    width: 100%;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    cursor: pointer;
    background-color: rgb(204, 173, 235);
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
  }
}
.time {
  font-size: 13px;
  color: gray;
}
</style>
