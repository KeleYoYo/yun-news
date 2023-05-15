<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>产品列表</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="产品名称" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="简要描述" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.introduction }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="上一次更新时间" width="280">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span
                ><el-icon><Timer /></el-icon
                >{{ timeFormat(scope.row.editTime) }}</span
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              circle
              :icon="Edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              circle
              :icon="Delete"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="box" v-show="isShow"></div>
    <div class="dialog" v-show="isShow">
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
            <el-button @click="isShow = false">取消</el-button>
            <el-button @click="confirm">确定</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
// 格式化时间的库
import moment from "moment";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Timer, Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue";
import axios from "axios";
moment.locale("zh-cn"); //使用中国时区，格式化时间
const router = useRouter();
const handleEdit = (index, row) => {
  // console.log(index, row);
  // 跳转到/news-manage/editnews/:id
  router.push(`/mainbox/product-manage/editproduct/${row._id}`);
};
const handleDelete = (index, row) => {
  isShow.value = true;
  currentItem = row;
};

const getTableDate = async () => {
  await axios.get(`/adminapi/product/list`).then((res) => {
    console.log(res.data);
    tableData.value = res.data.data;
  });
};
let currentItem = ref({});
let isShow = ref(false);
const tableData = ref([]);
let dialogVisible = ref(false);
let previewDate = ref({});
onMounted(() => {
  getTableDate();
});
//格式化时间，可以做成公共的工具函数
const timeFormat = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

const confirm = async () => {
  isShow.value = false;
  console.log(currentItem);
  await axios
    .delete(`/adminapi/product/list/${currentItem._id}`)
    .then((res) => {
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      getTableDate(); //更新一次页面
    });
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
.contentDiv ::v-deep {
  img {
    max-width: 100%;
  }
}
</style>
