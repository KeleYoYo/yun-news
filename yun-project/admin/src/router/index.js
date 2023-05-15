import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "@/views/home/Home.vue";
import routesConfig from "./confi";
import store from "@/store/index.js";

const routes = [
  {
    path: "/",
    // 重定向要写完整路径
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: () => import("@/views/MainBox.vue"),

    // mainbox的子路由，不要写死，因为有些权限的页面，需要我们动态添加嵌套路由，怎么动态添加？（通过router.addRoute()这个方法来实现）
    // children: [{}],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 给mainbox这个路由添加一个子路由
// 我们在router下的config.js来给出子路由，到时候遍历动态添加就好
// router.addRoute("mainbox", {
//   path: "index",
//   component: import("@/views/home/Home.vue"),
// });
// router.addRoute("mainbox", {
//   path: "/mainbox/center",
//   component: import("@/views/center/Center.vue"),
// });

//我们对路由动态添加作权限的限定
const checkPermission = (item) => {
  if (item.requireAdmin) {
    // 如果该路由需要做权限的限定
    return store.state.userInfo.role === 1; //1返回true,否则返回false，也就是说该item项不会被动态添加
  }
  return true;
};

const configRouter = () => {
  if (!router.hasRoute("mainbox")) {
    //如果路由表中没有mainbox，再添加进来
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: () => import("@/views/MainBox.vue"),
    });
  }
  routesConfig.forEach((item) => {
    checkPermission(item) && router.addRoute("mainbox", item);
  });
  // store.commit("changeGetterRouter", true);
  store.commit("changeGetterRouter", true);
};

// 在每次路由跳转之前执行路由拦截
router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    next();
  } else {
    // 判断是否授权过，授权过next()放行
    // 未授权，则重定向
    if (!localStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else {
      // 放行到原有的路径
      if (!store.state.isGetterRouter) {
        // 不是第一次配置路由
        //先删除所有的嵌套路由，但是删除嵌套路由很繁琐，我们直接删除父路由
        router.removeRoute("mainbox");

        //再重新配置路由

        configRouter();
        next({
          path: to.fullPath,
        });
      } else {
        next();
      }
    }
  }
});

export default router;
