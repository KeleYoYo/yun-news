const UserService = require("../../services/admin/UserService");
const JWT = require("../../utils/JWT.js");
// require('../../utils/JWT.js')
//和用户有关的操作
const UserController = {
  login: async (req, res) => {
    console.log(req.body);
    // req:前端请求，res:后端响应
    // 具体操作通过Services层来实现

    // 拿到返回来的数组
    var result = await UserService.login(req.body);

    if (result.length === 0) {
      //没查到信息
      res.send({
        code: "-1",
        error: "用户名和密码不匹配",
      });
    } else {
      // 生成token返回给前端
      const token = JWT.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        "1d"
      );
      // 在响应头中写入
      res.header("Authorization", token);
      res.send({
        ActionType: "OK",
        data: {
          username: result[0].username,

          gender: result[0].gender ? result[0].gender : 0, //0 1 2表示用户性别
          introduction: result[0].introduction || "这个用户很懒，什么都没有说", //用户简介
          avatar: result[0].avatar || undefined, //用户头像
          role: result[0].role, //1.表示管理员 ，2表示编辑
        },
      });
    }
  },

  upload: async (req, res) => {
    //express是接收不到multipart/form-data这种请求格式的数据
    //  我们使用multer这个工具来处理(github搜索)
    // https://github.com/expressjs/multer
    //在路由中处理完成，req.body拿到正常数据，req.file拿到文件数据
    // console.log(req.body, req.file);
    //调用service模块，更新数据到数据库
    // 我们通过JWT来更新数据，也可以通过id等标识
    const { username, introduction, gender } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    const token = req.headers.authorization.split(" ")[1];
    var payload = JWT.verify(token);

    await UserService.upload({
      _id: payload._id,
      username,
      introduction,
      gender: Number(gender), //注意前端传来的gender变成了字符串，要转化
      avatar,
    });
    if (avatar) {
      res.send({
        ActionType: "OK",
        // 把提交过来的信息返回前端
        data: {
          username,
          introduction,
          gender: Number(gender),
          avatar,
        },
      });
    } else {
      res.send({
        ActionType: "OK",
        // 把提交过来的信息返回前端
        data: {
          username,
          introduction,
          gender: Number(gender),
        },
      });
    }
  },
  adduser: async (req, res) => {
    const { username, introduction, gender, role, password } = req.body;
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    await UserService.add({
      username,
      introduction,
      gender: Number(gender), //注意前端传来的gender变成了字符串，要转化
      avatar,
      role: Number(role),
      password,
    });
    res.send({
      ActionType: "OK",
      // 把提交过来的信息返回前端
    });
  },
  getList: async (req, res) => {
    const result = await UserService.getList(req.params);
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  delete: async (req, res) => {
    console.log(req.params.id);
    const result = await UserService.delList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  edit: async (req, res) => {
    const result = UserService.putList(req.body);
    res.send({
      ActionType: "OK",
    });
  },
};
module.exports = UserController;
