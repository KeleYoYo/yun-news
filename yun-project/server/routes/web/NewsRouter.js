var express = require("express");
var NewsRouter = express.Router();
const NewsController = require("../../controller/web/NewsController.js");

//新闻列表接口
NewsRouter.get(`/webapi/news/list`, NewsController.getList);
NewsRouter.get(`/webapi/news/list/:id`, NewsController.getList);

NewsRouter.get(`/webapi/news/toplist`, NewsController.getTopList);
module.exports = NewsRouter;
