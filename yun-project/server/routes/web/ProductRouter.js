var express = require("express");
var ProductRouter = express.Router();
const ProductController = require("../../controller/web/ProductController.js");

ProductRouter.get(`/webapi/product/list`, ProductController.getList);
module.exports = ProductRouter;
