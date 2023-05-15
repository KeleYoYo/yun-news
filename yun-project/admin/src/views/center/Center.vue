<template>
  <div class="center">
    <el-page-header
      content="个人中心"
      icon=""
      title="企业门户管理系统"
    ></el-page-header>
    <div class="content">
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="8">
          <el-card class="boxcard">
            <el-avatar
              :size="100"
              :src="
                avatarUrl
                  ? avatarUrl
                  : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png `
              "
            />
            <h3>{{ $store.state.userInfo.username }}</h3>
            <h3>{{ $store.state.userInfo.role === 1 ? "管理员" : "编辑" }}</h3>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card>
            <template #header>
              <div class="card-header">
                <span>个人信息</span>
              </div>
            </template>

            <!-- 表单校验区域 -->
            <el-form
              ref="userFormRef"
              :model="userForm"
              label-width="100px"
              :rules="userFormRules"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model="userForm.username"
                  type="text"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-select
                  v-model="userForm.gender"
                  class="m-2"
                  placeholder="Select"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="个人介绍" prop="introduction">
                <el-input
                  v-model="userForm.introduction"
                  type="textarea"
                  autocomplete="off"
                  :rows="5"
                />
              </el-form-item>
              <el-form-item label="头像" prop="avatar">
                <!--  :auto-upload="false"控制是否自动上传 -->
                <!-- <el-upload
                  v-model="userForm.avatar"
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="handleChange"
                >
                  <img
                    v-if="userForm.avatar"
                    :src="uploadAvatar"
                    class="avatar"
                  />
                  <el-icon v-else class="avatar-uploader-icon"
                    ><Plus
                  /></el-icon>
                </el-upload> -->
                <Upload
                  @cjchange="handleChange"
                  :avatar="userForm.avatar"
                ></Upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm"
                  >更新信息</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import Upload from "@/components/upload/Upload.vue";

import upload from "@/utils/upload";

const store = useStore();
const avatarUrl = computed(() => {
  return "http://localhost:3000" + store.state.userInfo.avatar;
});

// 表单
const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null, //因为我们对头像是个字符串，到时把字符串处理成文件再存到file这个字段
});
const options = [
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

// 校验规则规则
const userFormRules = reactive({
  username: [{ required: true, message: "请输入你的用户名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择你的性别", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});

// 上传头像

// 每次悬选择完图片之后的回调
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

// 更新表单
const submitForm = () => {
  // 先判断表单是不是都通过了校验
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/user/upload", userForm).then((res) => {
        if (res.data.ActionType === "OK") {
          // 更新vuex
          store.commit("changeUserInfo", res.data.data);
          ElMessage({
            message: "更新成功！",
            type: "success",
          });
        }
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.center ::v-deep {
  .content {
    width: 90%;
    margin-left: 5%;
    .boxcard {
      text-align: center;
    }
  }
  .avatar {
    width: 178px;
    height: 178px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
