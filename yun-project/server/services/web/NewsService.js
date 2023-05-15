const NewsModel = require("../../models/NewsModels");

const NewsService = {
  getList: async ({ _id }) => {
    //传了id返回要查找的id,且isPublish为1的数据， //或者没有传id查询isPublish为1的数据
    return _id
      ? NewsModel.find({ _id, isPublish: 1 })
      : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }); //按时间倒序排序
  },
  getTopList: async ({ limit }) => {
    return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit); //按时间倒序排序,isPublis为1,只取limt条数据
  },
};
module.exports = NewsService;
