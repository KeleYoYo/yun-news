const NewsService = require("../../services/admin/NewsService");

const NewsController = {
  add: async (req, res) => {
    console.log(req);
    const cover = req.file ? `/newsupload/${req.file.filename}` : "";
    const { title, content, category, isPublish } = req.body;
    await NewsService.add({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result = await NewsService.getList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  publish: async (req, res) => {
    // await NewsService.publish(req.body);
    await NewsService.publish({ ...req.body, editTime: new Date() });
    res.send({
      ActionType: "OK",
    });
  },
  delList: async (req, res) => {
    // _id：是数据库字段，id是后端路由中用id做了占位符
    await NewsService.del({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/newsupload/${req.file.filename}` : "";
    const { title, content, category, isPublish, _id } = req.body;
    await NewsService.updateList({
      _id,
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
};
module.exports = NewsController;
