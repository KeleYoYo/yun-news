import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/News.vue"),
  },
  {
    path: "/product",
    name: "product",
    component: () => import("@/views/Product.vue"),
  },
  {
    path: "/news/:id",
    name: "new",
    component: () => import("@/views/New.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach((to, from, next) => {
  NProgress.done();
});

export default router;
