<template>
  <div class="home">
    <el-page-header content="首页" icon="" title="企业门户管理系统">
    </el-page-header>
    <!-- 用户信息展示区 -->
    <div class="card">
      <el-card shadow="always">
        <el-row>
          <!-- elmentui是24栅格系统,一行分了三列，每一列都占8份 -->
          <!-- <el-col :span="8">1</el-col>
          <el-col :span="8">1</el-col>
          <el-col :span="8">1</el-col> -->

          <el-col :span="4">
            <el-avatar
              :size="100"
              :src="
                avatarUrl
                  ? avatarUrl
                  : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png `
              "
            />
          </el-col>
          <el-col :span="20">
            <h3 style="line-height: 100px; letter-spacing: 6px">
              欢迎<span>{{ store.state.userInfo.username }}</span
              >回来!{{ welcomText }}
            </h3>
          </el-col>
        </el-row>
      </el-card>

      <!-- 产品展示区 -->
      <el-card shadow="always">
        <template #header>
          <div class="card-header">
            <span>公司产品</span>
          </div>
        </template>

        <!-- 产品轮播图展示 -->
        <el-carousel
          v-if="tableData.length"
          :interval="4000"
          type="card"
          height="350px"
        >
          <el-carousel-item v-for="item in tableData" :key="item._id">
            <div
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
                backgroundSize: 'cover',
              }"
            >
              <h3 text="2xl" justify="center">{{ item.title }}</h3>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
console.log(store.state.userInfo.avatar);
const avatarUrl = computed(() => {
  return "http://localhost:3000" + store.state.userInfo.avatar;
});
const tableData = ref([]);
onMounted(() => {
  getTableDate();
});
const getTableDate = async () => {
  await axios.get(`/adminapi/product/list`).then((res) => {
    console.log(res.data);
    tableData.value = res.data.data;
  });
};

const welcomText = computed(() => {
  return new Date().getHours() < 12
    ? "每一天都要开心啊!"
    : "你可能累了，喝杯咖啡提提神吧";
});
</script>

<style lang="scss" scoped>
.home::v-deep {
  height: 100%;

  .card {
    margin-left: 5%;
    width: 90%;
    .el-card {
      background-color: rgba(5, 247, 98, 0.979);
      box-shadow: 5px gray;

      margin-top: 50px;

      .el-carousel__item h3 {
        color: #e417a0;
        font-size: 4rem;
        line-height: 400px;
        margin: 0;
        text-align: center;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }
}
</style>
