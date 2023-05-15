import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Particles from "particles.vue3";
import axios from "axios";
//引入axios拦截器
import "@/utils/axios.config";

const app = createApp(App);
/* 挂载全局对象 start */
// 我们在vue2中挂载全局对象是通过 Vue.prototype来挂载
// 而在组件中使用全局对象也是通过this.xxx来访问
// 下面是vue3的方式
// 组件中使用全局对象是：vue3的setup中使用getCurrentInstanceAPI获取全局对象：
//  import {  getCurrentInstance } from 'vue'
// 方法一 start
//  const currentInstance = getCurrentInstance()
//  const { $http, $message, $route } = currentInstance.appContext.config.globalProperties
//详情看：https://blog.csdn.net/C90283/article/details/123049450
app.config.globalProperties.axios = axios;
/* 挂载全局对象 end */
app.use(store).use(router).use(ElementPlus).use(Particles).mount("#app");
