//JWT二次封装
const jsonwebtoken = require("jsonwebtoken");
const secret = "cjj"; //生成密钥
const JWT = {
  // expires是token过期时间
  generate(value, expires) {
    //生成token
    return jsonwebtoken.sign(value, secret, { expiresIn: expires });
  },
  verify(token) {
    // 验证token
    try {
      return jsonwebtoken.verify(token, secret); //验证token，解密
    } catch (err) {
      console.log("你的token过期了");
      return false;
    }
  },
};
// const token = JWT.generate({ name: "cjj" }, "10s");
// console.log(JWT.verify(token));
// setTimeout(() => {
//   console.log(JWT.verify(token));
// }, 11000);
module.exports = JWT;
