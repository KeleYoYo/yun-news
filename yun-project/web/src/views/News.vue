<template>
  <div class="container">
    <div
      class="new-header"
      :style="{
        backgroundImage: `url(${require('@/assets/image/bg2.jpg')})`,
      }"
    ></div>
    <div class="search">
      <el-popover
        :visible="visible"
        placement="bottom"
        title="检索结果"
        width="40%"
      >
        <template #reference>
          <el-input
            type="search"
            size="large"
            v-model="searchText"
            placeholder="请输入关键字"
            class="input-with-select"
            @input="visible = true"
            @blur="visible = false"
          >
            <template #prepend>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </template>
        <div v-if="searchNewsList.length">
          <div
            class="search-item"
            @click="handleChangePage(data._id)"
            v-for="data in searchNewsList"
            :key="data._id"
          >
            {{ data.title }}
          </div>
        </div>

        <div v-else>
          <el-empty description="空空如也" :image-size="50"></el-empty>
        </div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row>
        <el-col v-for="item in topNewsList" :key="item._id" :span="6">
          <el-card
            @click="handleChangePage(item._id)"
            :body-style="{ padding: '0px' }"
            shadow="hover"
          >
            <div
              class="image"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ timeFormat(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-divider content-position="left">newsList</el-divider>
    <el-tabs v-model="whichTab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tablist"
        :key="tablist.name"
        :label="item.label"
        :name="item.name"
      >
        <!-- 接着循环出分类的数组 -->
        <div
          class="category"
          v-for="data in tabnews[item.name]"
          :key="data._id"
        >
          <el-row>
            <el-col :span="8">
              <el-card
                @click="handleChangePage(data._id)"
                :body-style="{ padding: '0px' }"
                shadow="hover"
              >
                <div
                  class="tab-image"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                  }"
                ></div>
                <div style="padding: 14px">
                  <span>{{ data.title }}</span>
                  <div class="bottom">
                    <time class="tab-time">{{
                      timeFormat(data.editTime)
                    }}</time>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="16"> </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup>
// lodash这个库很适合用于做分组
import lodash from "lodash";
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

import axios from "axios";
const whichTab = ref(1);
const router = useRouter();

moment.locale("zh-cn");
let searchText = ref("");
let visible = ref(false);
let newslist = ref([]);
const tablist = [
  { label: "最新动态", name: 1 },
  { label: "典型案例", name: 2 },
  { label: "通知公告", name: 3 },
];

onMounted(async () => {
  await axios.get("/webapi/news/list").then((res) => {
    // console.log(res.data);
    newslist.value = res.data.data;
  });
});
const searchNewsList = computed(() => {
  //过滤出每一项的title中含有输入关键字的,
  //如果searchText.value不是空字符串，就过滤，是空字符串就给个空数组
  return searchText.value
    ? newslist.value.filter((item) =>
        item.title.trim().includes(searchText.value)
      )
    : [];
});
const topNewsList = computed(() => {
  return newslist.value.slice(0, 4); //截取出数组的前四个，不会影响原来数组
});

const timeFormat = (date) => {
  return moment(date).format("lll");
};
const tabnews = computed(() => {
  return lodash.groupBy(newslist.value, (item) => item.category);
});
const handleChangePage = (id) => {
  console.log(id);
  router.push(`/news/${id}`);
};
</script>

<style lang="scss" scoped>
.container::v-deep {
  position: relative;
  .el-card {
    cursor: pointer;
  }
  .new-header {
    width: 100%;
    height: 300px;
    background-size: contain;
  }
  .search {
    position: absolute;
    top: 200px;
    width: 100%;
    text-align: center;
    .el-input {
      width: 40%;
    }
  }
  .topnews {
    margin-top: 1.25rem;
    .image {
      width: 100%;
      height: 250px;
      background-size: cover;
    }
    .time {
      font-size: 13px;
      color: gray;
    }
  }
}
.keyword {
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: tomato;
  &:hover {
    color: rgb(14, 216, 14);
  }
}
.search-item {
  font-size: 16px;
  height: 30px;
  width: 100%;
  margin-top: 5px;
  line-height: 30px;
  border-radius: 5px;
  background-color: rgb(65, 201, 224);
  &:hover {
    cursor: pointer;
    background-color: green;
    color: rgb(180, 27, 7);
  }
}
.el-tabs {
  min-height: 31.25rem;
}

.tab-image {
  width: 150px;
  height: 150px;
  background-size: cover;
  float: left;
}
.tab-time {
  font-size: 13px;
  color: grey;
}
</style>
