<template>
  <div class="product">
    <el-carousel
      height="calc(100vh - 59px)"
      direction="vertical"
      :autoplay="false"
      v-if="looplist.length"
    >
      <el-carousel-item v-for="item in looplist" :key="item._id">
        <div
          class="item"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <el-divider>
              简要描述
              <el-icon><star-filled /></el-icon>
            </el-divider>

            <div>
              {{ item.introduction }}
            </div>

            <div class="detail">
              <el-divider>
                详细介绍
                <el-icon><star-filled /></el-icon>
              </el-divider>
              {{ item.detail }}
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty
      height="calc(100vh - 59px)"
      v-else
      description="暂无资源"
    ></el-empty>
  </div>
</template>

<script setup>
import { StarFilled } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import axios from "axios";
let looplist = ref([]);

onMounted(async () => {
  await axios.get("/webapi/product/list").then((res) => {
    console.log(res.data);
    looplist.value = res.data.data;
  });
});
</script>

<style lang="scss" scoped>
.product::v-deep {
  .item {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
  .el-carousel__item h3 {
    color: #dd4f91;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #10c737;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .box-card {
    opacity: 0.6;
    width: 50%;
    height: 100%;
    background-color: #eb8ec7;
    .detail {
      margin-top: 40px;
    }
  }
  .el-carousel__button {
    width: 25px;
    height: 25px;
    background-color: rgb(240, 18, 240);
  }
}
</style>
