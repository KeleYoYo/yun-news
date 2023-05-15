<template>
  <div class="adduser">
    <el-page-header icon="" content="添加用户" title="用户管理">
    </el-page-header>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>添加用户</span>
        </div>
      </template>
      <el-form
        ref="addUserFormRef"
        :model="addUserForm"
        status-icon
        :rules="addUserRules"
        label-width="80px"
        class="addUserForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="addUserForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addUserForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select
            v-model="addUserForm.gender"
            class="m-2"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in genderoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select
            v-model="addUserForm.role"
            class="m-2"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in roleoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input
            v-model="addUserForm.introduction"
            type="textarea"
            autocomplete="off"
            :rows="5"
          />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <Upload
            @cjchange="handleChange"
            :avatar="addUserForm.avatar"
          ></Upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import upload from "@/utils/upload";
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import Upload from "@/components/upload/Upload.vue";
//表单部分
const router = useRouter();
const addUserFormRef = ref();
const addUserForm = reactive({
  username: "",
  password: "",
  role: 2, //1为管理员，2是编辑，默认给个编辑
  introduction: "",
  avatar: "",
  gender: 0,
  file: null, //上传头像，处理成文件
});
const addUserRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请输选择权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
});
const genderoptions = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];
const roleoptions = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];
const handleChange = (file) => {
  console.log(file);
  addUserForm.avatar = URL.createObjectURL(file);
  addUserForm.file = file;
};
const submitForm = () => {
  // 先判断表单是不是都通过了校验
  addUserFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/user/add", addUserForm).then((res) => {
        console.log(res);
        if (res.data.ActionType === "OK") {
          ElMessage({
            message: "添加成功！",
            grouping: true,
            type: "success",
            duration: 1500,
          });
          router.push("/mainbox/user-manage/userlist");
        }
      });
    } else {
      console.log("错误");
    }
  });
};
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
    color: rgb(226, 130, 115);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 880px;
    height: 680px;
    background-color: rgb(0, 0, 0);
    .el-form-item__label {
      font-size: 1rem;
      color: green;
    }
  }
}
</style>
