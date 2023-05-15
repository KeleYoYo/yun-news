var express = require("express");
var NewsRouter = express.Router();

// 图片上传
//multer是个中间件
const multer = require("multer");
// 确定好上传的目标文件夹，如果没有会通过fs模块自动创建，我们要把这个路径放到静态资源目录下
const upload = multer({ dest: "public/newsupload/" });

const NewsController = require("../../controller/admin/NewsController.js");

//增添新闻接口
NewsRouter.post(
  "/adminapi/news/add",
  upload.single("file"), //接受到文件字段file
  NewsController.add
);
//新闻列表接口
NewsRouter.get(`/adminapi/news/list`, NewsController.getList);
NewsRouter.get(`/adminapi/news/list/:id`, NewsController.getList);
NewsRouter.delete(`/adminapi/news/list/:id`, NewsController.delList);
//新闻列表发布接口
NewsRouter.put(`/adminapi/news/publish`, NewsController.publish);

NewsRouter.post(
  `/adminapi/news/list`,
  upload.single("file"),
  NewsController.updateList
);

module.exports = NewsRouter;
