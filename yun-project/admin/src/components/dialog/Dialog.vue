<template>
  <div class="box" v-show="props.isShow"></div>
  <div class="dialog" v-show="props.isShow">
    <el-card class="dialogcard">
      <template #header>
        <div class="card-header">
          <span>操作</span>
        </div>
      </template>
      <div class="row1">
        <el-row>
          <el-col :span="24" class="lightgreen-box">你确定要删除吗？</el-col>
        </el-row>
      </div>
      <div class="row2">
        <el-row>
          <el-button @click="cancle">取消</el-button>
          <el-button @click="confirm">确定</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
let emits = defineEmits(["changeisShow"]);

const props = defineProps({
  isShow: Boolean,
});
const cancle = () => {
  emits("changeisShow");
};
const confirm = () => {
  emits("changeisShow");
};
</script>

<style lang="scss" scoped>
.box ::v-deep {
  z-index: 99;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 99;
  background-color: rgb(105, 218, 139);
}

.dialogcard {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 230px;
  opacity: 1;
  z-index: 999;
  .row1 {
    width: 100%;
    height: 100px;
  }
}
</style>
