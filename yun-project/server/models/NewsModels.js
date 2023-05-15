const mongoose = require("mongoose");

//拿到规则
const Schema = mongoose.Schema;

// =================================================================
// 创建了一个user模型，在mogoodb中就会有一个users集合
const NewsType = {
  // 给users集合创建字段并且给定数据类型
  title: String,
  content: String,
  category: Number, //类别，1，2,3
  cover: String, //封面
  isPublish: Number, //0,未发布，1，已发布
  editTime: Date, //最后一次编辑时间
};
// 会创建一个集合，集合名是news
const NewsModel = mongoose.model("news", new Schema(NewsType));
// ==================================================================

module.exports = NewsModel;
