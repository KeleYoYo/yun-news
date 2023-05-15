// 对axios二次封装
import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  // 请求发出之前的拦截
  function (config) {
    // 我们在每次发请求之前，携带token给后端
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    const { authorization } = response.headers;
    // 请求得到响应之前做的操作
    // console.log(response.headers);
    // 存入token
    authorization && localStorage.setItem("token", authorization);
    return response;
  },
  function (error) {
    const { status } = error.response;
    console.log(error.response.status);
    if (status === 401) {
      //如果Token过期了
      localStorage.removeItem("token");
      console.log("token过期了");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
