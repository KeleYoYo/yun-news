// 用户数据，数据库模型
const mongoose = require("mongoose");

//拿到规则
const Schema = mongoose.Schema;

// =================================================================
// 创建了一个user模型，在mogoodb中就会有一个users集合
const UserTypeL = {
  // 给users集合创建字段并且给定数据类型
  username: String,
  password: String,
  gender: Number, //0 1 2表示用户性别
  introduction: String, //用户简介
  avatar: String, //用户头像
  role: Number, //1.表示管理员 ，2表示编辑
};
// 会创建一个集合，集合名是users
const UserModel = mongoose.model("user", new Schema(UserTypeL));
// ==================================================================

module.exports = UserModel;
