const ProductService = require("../../services/admin/ProductService.js");

const ProductController = {
  add: async (req, res) => {
    console.log(req);
    // 存储用户上传的头像，给用户头像图片命名
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail } = req.body;
    await ProductService.add({
      title,
      introduction,
      detail,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result = await ProductService.getList({
      _id: req.params.id,
    });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  delList: async (req, res) => {
    await ProductService.delList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  updateList: async (req, res) => {
    const cover = req.file ? `/productuploads/${req.file.filename}` : "";
    const { title, introduction, detail, _id } = req.body;
    await ProductService.updateList({
      title,
      cover,
      introduction,
      detail,
      _id,
      editTime: new Date(), //给一个最新时间
    });
    res.send({
      ActionType: "OK",
    });
  },
};
module.exports = ProductController;
