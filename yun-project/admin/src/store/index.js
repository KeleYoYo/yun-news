import { createStore } from "vuex";
import { createVuexPersistedState } from "vue-persistedstate";

// 我们使用vue-persistedstate这个插件来快速做数据持久化
export default createStore({
  state: {
    // 已经第一次获取到了路由
    isGetterRouter: false,

    // 菜单栏是否折叠
    isCollaspsed: false,

    // 用户信息，将从后端返回的用户信息存入vuex
    userInfo: {},
  },
  getters: {},
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value;
    },
    changCollaspsed(state) {
      state.isCollaspsed = !state.isCollaspsed;
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.userInfo,
        ...value,
      };
    },
    cleanUserInfo(state, value) {
      // 清空用户信息
      state.userInfo = {};
    },
  },
  // 插件
  plugins: [
    createVuexPersistedState({
      key: "vuex",
      storage: window.localStorage,
      whiteList: [],

      // 不持久化的数据放到黑名单中
      blackList: ["isGetterRouter"],
    }),
  ],
  actions: {},
  modules: {},
});
