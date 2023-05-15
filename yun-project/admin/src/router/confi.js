const routes = [
  { path: "index", component: () => import("@/views/home/Home.vue") },
  {
    path: "center",
    component: () => import("@/views/center/Center.vue"),
  },

  // 凡是我们用到权限控制的地方，我们在路由表中加上一个requireAdmin:true字段
  // 然后我们再在addRoute的时候做判断（router下的index文件中查看）
  {
    requireAdmin: true,
    path: "user-manage/adduser",
    component: () => import("@/views/user-manage/UserAdd.vue"),
  },
  {
    requireAdmin: true,
    path: "user-manage/userlist",
    component: () => import("@/views/user-manage/UserList.vue"),
  },
  {
    path: "news-manage/addnews",
    component: () => import("@/views/news-manage/NewsAdd.vue"),
  },
  {
    path: "news-manage/editnews/:id",
    component: () => import("@/views/news-manage/NewsEdit.vue"),
  },
  {
    path: "news-manage/newslist",
    component: () => import("@/views/news-manage/NewsList.vue"),
  },
  {
    path: "product-manage/addproduct",
    component: () => import("@/views/product-mange/ProductAdd.vue"),
  },
  {
    path: "product-manage/productlist",
    component: () => import("@/views/product-mange/ProductList.vue"),
  },

  {
    path: "product-manage/editproduct/:id",
    component: () => import("@/views/product-mange/ProductEdit.vue"),
  },
  {
    // 输入/adwdaw等其他路径加载到404页面
    path: "/:pathMatch(.*)*",
    name: "Notfound",
    component: () => import("@/views/Notfound/NotFound.vue"),
  },
];

export default routes;
