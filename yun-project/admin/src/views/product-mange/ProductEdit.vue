<template>
  <div class="adduser">
    <el-page-header icon="" content="编辑产品" title="产品管理">
    </el-page-header>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>编辑产品</span>
          <button @click="back" class="btn">回退</button>
        </div>
      </template>
      <el-form
        ref="productFormRef"
        :model="productForm"
        status-icon
        :rules="Rules"
        label-width="80px"
        class="addUserForm"
      >
        <el-form-item label="名称" prop="title">
          <el-input
            v-model="productForm.title"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="简述" prop="introduction">
          <el-input v-model="productForm.introduction" autocomplete="off" />
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <el-input
            v-model="productForm.detail"
            type="textarea"
            autocomplete="off"
            :rows="5"
          />
        </el-form-item>
        <el-form-item label="图片" prop="cover">
          <Upload @cjchange="handleChange" :avatar="productForm.cover"></Upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认编辑</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import upload from "@/utils/upload";
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import Upload from "@/components/upload/Upload.vue";
import axios from "axios";
//表单部分
const router = useRouter();
const productFormRef = ref();
const productForm = reactive({
  title: "",
  detail: "",
  introduction: "",
  cover: "",
  file: null, //上传封面，处理成文件
});
const Rules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  detail: [{ required: true, message: "请输入详情介绍", trigger: "blur" }],

  introduction: [
    { required: true, message: "请输入简要介绍", trigger: "blur" },
  ],
  cover: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
const route = useRoute();

const handleChange = (file) => {
  console.log(file);
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};
const submitForm = () => {
  // 先判断表单是不是都通过了校验
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload(`/adminapi/product/list`, productForm).then((res) => {
        console.log(res);
        if (res.data.ActionType === "OK") {
          ElMessage({
            message: "编辑成功!",
            grouping: true,
            type: "success",
            duration: 1500,
          });
          router.push("/mainbox/product-manage/productlist");
        }
      });
    } else {
      console.log("错误");
    }
  });
};
const back = () => {
  router.back();
};
const getData = async () => {
  //route.params可以拿到当前路由的参数，（id和路由表中/:id是对应上的）
  await axios.get(`/adminapi/product/list/${route.params.id}`).then((res) => {
    Object.assign(productForm, res.data.data[0]);
  });
};
onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.adduser ::v-deep {
  width: 100%;
  height: 100%;

  position: relative;
  .el-page-header {
    width: 100%;
    background-color: rgb(114, 230, 230);
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      width: 50px;
      height: 50px;
      font-size: 14px;
      border-radius: 50%;
      background-color: gray;
      cursor: pointer;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    font-size: 26px;
    position: absolute;
    top: 50%;
    color: rgb(207, 46, 6);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 880px;
    height: 680px;
    background-color: rgb(59, 7, 204);
    .el-form-item__label {
      font-size: 1rem;
      color: rgb(240, 9, 9);
    }
  }
}
</style>
