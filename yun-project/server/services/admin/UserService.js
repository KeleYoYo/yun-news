const UserModel = require("../../models/UserModel");

const UserService = {
  login: async ({ username, password }) => {
    // 返回数据库的查询方法结果，find方法返回的结果是一个数组
    return UserModel.find({
      username,
      password,
    });
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    if (avatar) {
      //对数据库信息进行更新操作
      return UserModel.updateOne(
        // _id为_id的时候
        {
          _id,
        },
        // 更新数据库里面的字段
        {
          username,
          introduction,
          gender,
          avatar,
        }
      );
    } else {
      //对数据库信息进行更新操作
      return UserModel.updateOne(
        // _id为_id的时候
        {
          _id,
        },
        // 更新数据库里面的字段
        {
          username,
          introduction,
          gender,
        }
      );
    }
  },
  add: async ({ username, introduction, gender, avatar, password, role }) => {
    //在数据库中创建一条数据
    return UserModel.create({
      username,
      introduction,
      gender,
      avatar,
      password,
      role,
    });
  },
  getList: async ({ id }) => {
    // UserModel.find();取出集合中所有记录，所有字段

    // 取出集合中所有的记录中的username等字段
    return id
      ? UserModel.find({ _id: id }, [
          "username",
          "role",
          "introduction",
          "gender",
          "password",
        ])
      : UserModel.find({}, [
          "username",
          "role",
          "introduction",
          "avatar",
          "gender",
        ]);
  },
  delList: async ({ _id }) => {
    return UserModel.deleteOne({ _id });
  },
  putList: async (body) => {
    return UserModel.updateOne({ _id: body._id }, body);
  },
};
module.exports = UserService;
