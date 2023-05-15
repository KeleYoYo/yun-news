<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <el-carousel :interval="4000" type="card" height="700px">
        <el-carousel-item :key="1">
          <div
            :style="{
              backgroundImage: `url(${require('@/assets/image/bg1.jpg')})`,
            }"
          >
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="2">
          <div
            :style="{
              backgroundImage: `url(${require('@/assets/image/bg2.jpg')})`,
            }"
          >
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="3">
          <div
            :style="{
              backgroundImage: `url(${require('@/assets/image/bg3.jpg')})`,
            }"
          >
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.home ::v-deep {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    min-height: 600px;
    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .el-carousel div {
      width: 56.25rem;
      height: 100%;
      background-size: cover;
    }
  }
}
</style>
