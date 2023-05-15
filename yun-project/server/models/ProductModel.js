const mongoose = require("mongoose");

//拿到规则
const Schema = mongoose.Schema;

// =================================================================

const ProductType = {
  title: String,
  introduction: String,
  cover: String, //封面
  detail: String,
  editTime: Date,
};
// 会创建一个集合
const ProductModel = mongoose.model("product", new Schema(ProductType));
// ==================================================================

module.exports = ProductModel;
