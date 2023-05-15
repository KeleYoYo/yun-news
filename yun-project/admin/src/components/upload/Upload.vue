<template>
  <!-- 对upload组件的封装 -->
  <el-upload
    v-model="props.avatar"
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { Plus } from "@element-plus/icons-vue";
// 每次选择完图片之后的回调
import { defineEmits, defineProps, computed } from "vue";
const props = defineProps({
  avatar: String, //接收父组件传来的avatar
});
const emit = defineEmits(["cjchange"]); //监听一个名为change的事件(这个事件会在父组件中以@change的形式触发)
const handleChange = (file) => {
  console.log(file);
  // userForm.avatar = file.raw //直接将一个文件类型赋值给一个字符串是行不通的
  //   userForm.avatar = URL.createObjectURL(file.raw); //我们通过URL对象的createObjectURL来转为字符串
  //   userForm.file = file.raw;

  //   因为userForm数据是在父组件中的，我们通过子传父来拿到userForm
  emit("cjchange", file.raw);
};
const uploadAvatar = computed(() => {
  return props.avatar.includes("blob")
    ? props.avatar
    : "http://localhost:3000" + props.avatar;
});
</script>

<style lang="scss" scoped>
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
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  background-color: rgb(140, 236, 240);
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
</style>
