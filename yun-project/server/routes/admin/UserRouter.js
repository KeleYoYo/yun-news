// 跟用户相关的
var express = require("express");
var UserRouter = express.Router();

// 图片上传
//multer是个中间件
const multer = require("multer");
// 确定好上传的目标文件夹，如果没有会通过fs模块自动创建，我们要把这个路径放到静态资源目录下
const upload = multer({ dest: "public/avataruploads/" });

const UserController = require("../../controller/admin/UserController.js");

// 用户登录接口
UserRouter.post("/adminapi/user/login", UserController.login);

//添加用户接口
UserRouter.post(
  "/adminapi/user/add",
  upload.single("file"), //接受到文件字段file
  UserController.adduser
);

//用户更新信息接口
UserRouter.post(
  "/adminapi/user/upload",
  upload.single("file"), //接受到文件字段file
  UserController.upload
);

//用户列表接口
UserRouter.get("/adminapi/user/list", UserController.getList);
UserRouter.get("/adminapi/user/list/:id", UserController.getList);
// 用户删除接口
UserRouter.delete("/adminapi/user/list/:id", UserController.delete);

//编辑用户接口
UserRouter.put("/adminapi/user/list/:id", UserController.edit);

module.exports = UserRouter;
