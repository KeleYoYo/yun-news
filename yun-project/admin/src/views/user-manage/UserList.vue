<template>
  <div class="userlist">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="头像">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              ></el-avatar>
            </div>
            <div v-else>
              <!-- <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              ></el-avatar> -->
              <h1>暂无头像</h1>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色" prop="name">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger"
              >管理员</el-tag
            >
            <el-tag v-else class="ml-2" type="success">编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template #default="scope">
            <el-button
              v-if="scope.row.role !== 1"
              size="small"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >

            <el-button
              v-if="scope.row.role !== 1"
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
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
  <el-dialog
    v-model="dialogVisible"
    title="用户编辑"
    width="50%"
    :before-close="handleClose"
  >
    <!--编辑用户表单 -->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="权限" prop="role">
        <el-select
          v-model="ruleForm.role"
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
          type="textarea"
          autocomplete="off"
          :rows="5"
          v-model="ruleForm.introduction"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleEditConfirm()">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer"> </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
let isShow = ref(false);
let crrentData = reactive({});
let dialogVisible = ref(false);
// 表单
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
const ruleFormRef = ref();
let ruleForm = reactive({
  username: "",
  password: "",
  role: 2,
  introduction: "",
});
const rules = reactive({
  username: [{ required: false }],
  password: [{ required: false }],
  role: [{ required: false }],
  introduction: [{ required: false }],
});

//表单
const tableData = ref([]);
// 问后端要用户数据
const getTableData = async () => {
  await axios.get("/adminapi/user/list").then((res) => {
    console.log(res);
    tableData.value = res.data.data;
  });
};
onMounted(() => {
  getTableData();
});
// 编辑和删除操作
const handleEdit = async (data) => {
  const res = await axios.get(`/adminapi/user/list/${data._id}`);
  ruleForm = res.data.data[0];
  console.log(data);

  dialogVisible.value = true;
};
const handleDelete = async (data) => {
  crrentData = data;
  isShow.value = true;
  console.log(crrentData);
};
const confirm = async () => {
  isShow.value = false;
  await axios.delete(`/adminapi/user/list/${crrentData._id}`).then((res) => {
    ElMessage({
      message: "删除成功！",
      type: "success",
    });
    getTableData(); //更新一次页面
  });
};
// 确认编辑
const handleEditConfirm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(ruleForm);
      //1.-更新后端
      await axios.put(`adminapi/user/list/${ruleForm._id}`, ruleForm);
      ElMessage({
        message: "修改成功！",
        type: "success",
      });
      //2.dialog隐藏
      dialogVisible.value = false;
      //3.重新获取一遍后端table数据\
      getTableData();
    }
  });
};
</script>

<style lang="scss" scoped>
.userlist ::v-deep {
  position: relative;
  width: 100%;
  height: 100%;
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
    width: 980px;
    .el-table .warning-row {
      --el-table-tr-bg-color: var(--el-color-warning-light-9);
    }
    .el-table .success-row {
      --el-table-tr-bg-color: var(--el-color-success-light-9);
    }
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>
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
