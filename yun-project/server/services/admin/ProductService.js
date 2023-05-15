const ProductModel = require("../../models/ProductModel.js");

const ProductService = {
  add: async ({ title, introduction, detail, cover, editTime }) => {
    console.log("进行数据库模型处理");
    return ProductModel.create({
      title,
      introduction,
      detail,
      cover,
      editTime,
    });
  },
  getList: async ({ _id }) => {
    //传了_id就返回_id相同的数据，否则返回所有数据
    return _id ? ProductModel.find({ _id: _id }) : ProductModel.find({});
  },
  delList: async ({ _id }) => {
    return ProductModel.deleteOne({ _id: _id });
  },
  updateList: async ({ title, cover, introduction, detail, _id, editTime }) => {
    if (cover) {
      //更新时，换
      return ProductModel.updateOne(
        { _id },
        { title, cover, introduction, detail, editTime }
      );
    } else {
      return ProductModel.updateOne(
        { _id },
        { title, introduction, detail, editTime }
      );
    }
  },
};
module.exports = ProductService;
