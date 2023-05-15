var express = require("express");
var ProductRouter = express.Router();

// 图片上传
//multer是个中间件
const multer = require("multer");
// 确定好上传的目标文件夹，如果没有会通过fs模块自动创建，我们要把这个路径放到静态资源目录下
const upload = multer({ dest: "public/productuploads/" });

const ProductController = require("../../controller/admin/ProductController.js");

ProductRouter.post(
  "/adminapi/product/add",
  upload.single("file"), //接受到文件字段file
  ProductController.add
);

ProductRouter.get(`/adminapi/product/list`, ProductController.getList);
ProductRouter.get(`/adminapi/product/list/:id`, ProductController.getList);
ProductRouter.delete(`/adminapi/product/list/:id`, ProductController.delList);

//编辑产品（更新）
ProductRouter.post(
  `/adminapi/product/list`,
  upload.single("file"),
  ProductController.updateList
);
module.exports = ProductRouter;
