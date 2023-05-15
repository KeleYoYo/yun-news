<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>添加新闻</span>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <!-- <el-input v-model="ruleForm.content" /> -->
          <!-- 基于wangedit封装的 https://www.wangeditor.com/ -->
          <Edit @event="handleChange"></Edit>
        </el-form-item>
        <el-form-item label="文章分类" prop="category">
          <!-- <el-input v-model.number="ruleForm.category" /> -->
          <el-select
            v-model="ruleForm.category"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上传封面" prop="cover">
          <Upload @cjchange="handleUpload" :avatar="ruleForm.cover"></Upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Edit from "@/components/edit/Edit.vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/utils/upload";
import { useRouter } from "vue-router";
const router = useRouter();
const ruleFormRef = ref();
const categoryOptions = [
  {
    value: 1,
    label: "最新动态",
  },
  {
    value: 2,
    label: "典型案例",
  },
  {
    value: 3,
    label: "通知公告",
  },
];
const ruleForm = reactive({
  title: "",
  content: "",
  category: 1, //1.对应最新动态 2对应典型案例 3对应通知公告
  cover: "", //图片地址信息
  file: null, //图片二进制文件
  isPublish: 0, //0未发布，1确认发布
});

const rules = {
  title: [{ require: true, message: "请输入标题", trigger: "blur" }],
  content: [{ require: true, message: "请输入文章内容", trigger: "blur" }],
  // category: [{ require: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ require: true, message: "请上传图片", trigger: "blur" }],
};

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/news/add", ruleForm).then(() => {
        router.push("/mainbox/news-manage/newslist");
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleChange = (data) => {
  // console.log(data);
  ruleForm.content = data;
};
const handleUpload = (file) => {
  ruleForm.cover = URL.createObjectURL(file);
  ruleForm.file = file;
};
</script>

<style lang="scss" scoped></style>
