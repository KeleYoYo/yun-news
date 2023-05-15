<template>
  <!-- 推荐一个粒子库https://www.npmjs.com/package/particles.vue3 
  官网:https://particles.js.org/
  -->
  <div>
    <Particles
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      id="tsparticles"
      :options="myoptions"
    />
    <!-- 登录表单 -->
    <div class="form">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="LoginFormRef"
        :model="LoginForm"
        status-icon
        :rules="loginrules"
        label-width="80px"
        class="loginform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="LoginForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="LoginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(LoginFormRef)"
            >登录</el-button
          >
          <el-button @click="resetForm(LoginFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import myoptions from "@/ParticOptions/otions.js";
import { useRouter } from "vue-router";
import { loadFull } from "tsparticles";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

import { reactive, ref, getCurrentInstance } from "vue";
const currentInstance = getCurrentInstance();
const { axios } = currentInstance.appContext.config.globalProperties;
const store = useStore();
const router = useRouter();

const particlesInit = async (engine) => {
  await loadFull(engine);
};
const particlesLoaded = async (container) => {};
const options = myoptions;

// 登录表单部分

const LoginFormRef = ref(); //拿到表单对象

const LoginForm = reactive({
  username: "",
  password: "",
});

const loginrules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    // valid记录着表单是否验证通过
    if (valid) {
      // console.log("表单信息" + LoginForm);
      // localStorage.setItem("token", "caojun");
      // Token不能随随便便设置，我们使用JsonWebToken技术，即JWT技术（在nodejs后端npm ijsonwebtoken）
      // 我们对axios做二次封装，在axios拦截器中来对token处理
      axios.post("/adminapi/user/login", LoginForm).then((res) => {
        if (res.data.ActionType == "OK") {
          // 数据库验证成功
          console.log(res.data.data);
          store.commit("changeUserInfo", res.data.data);
          store.commit("changeGetterRouter", false); //把路由状态改为第一次配置路由
          router.push("/mainbox/index");
        } else {
          ElMessage({
            message: "你的用户名和密码不匹配",
            grouping: true,
            type: "error",
            duration: 1500,
          });
          return false;
        }
      });
    }
  });
};
const resetForm = (formEl) => {
  //重置表单
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.form ::v-deep {
  text-align: center;

  color: white;
  background-color: rgb(19, 14, 13);
  opacity: 0.7;

  height: 300px;
  width: 500px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .el-form-item__label {
    color: tomato;
  }
  .el-form {
    margin-top: 30px;
    input {
      width: 260px;
    }
  }
  h3 {
    margin-top: 20px;
    font-size: 32px;
    color: tomato;
  }
}
</style>
