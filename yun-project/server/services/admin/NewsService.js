const NewsModel = require("../../models/NewsModels");

const NewsService = {
  add: async ({ title, content, category, cover, isPublish, editTime }) => {
    //进行数据库模型处理
    console.log("进行数据库模型处理");
    return NewsModel.create({
      title,
      content,
      category,
      cover,
      isPublish,
      editTime,
    });
  },
  updateList: async ({
    _id,
    title,
    content,
    category,
    cover,
    isPublish,
    editTime,
  }) => {
    if (cover) {
      return NewsModel.updateOne(
        { _id },
        {
          title,
          content,
          category,
          cover,
          isPublish,
          editTime,
        }
      );
    } else {
      return NewsModel.updateOne(
        { _id },
        {
          title,
          content,
          category,
          isPublish,
          editTime,
        }
      );
    }
  },
  getList: async ({ _id }) => {
    //返回所有数据
    return _id ? NewsModel.find({ _id }) : NewsModel.find({});
  },
  publish: async ({ _id, isPublish, editTime }) => {
    return NewsModel.updateOne(
      {
        _id,
      },
      {
        isPublish,
        editTime,
      }
    );
  },
  del: async ({ _id }) => {
    return NewsModel.deleteOne({
      _id,
    });
  },
};
module.exports = NewsService;
