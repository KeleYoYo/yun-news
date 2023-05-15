var createError = require("http-errors");

var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const UserRouter = require("./routes/admin/UserRouter");
const JWT = require("./utils/JWT");
const newsRouter = require("./routes/admin/NewsRouter");
const ProductsRouter = require("./routes/admin/ProductsRouter.js");
const WebNewsRouter = require("./routes/web/NewsRouter.js");
const WebProductRouter = require("./routes/web/ProductRouter.js");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(WebNewsRouter);
app.use(WebProductRouter);
// 后端接收token
app.use((req, res, next) => {
  //如果token有效,就next(),如果token无效则返回401错误

  if (req.url === "/adminapi/user/login") {
    next(); //不next后面的中间件将无法运行
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    // 有token就进行JWT校验是否过期
    var payload = JWT.verify(token);
    if (payload) {
      //重新生成Token
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username,
        },
        "1d"
      );
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send({ errCode: "-1", errInfo: "token过期" });
    }
  }
});

// 使用接口
app.use("/", indexRouter);
app.use("/users", usersRouter);

/*
我希望能给出两套接口
1./adminapi :后台系统使用
2./webapi :给企业，官网使用


// 数据库操作用到mongodb,我们用mogoose模块对数据进行限定cnpm i mogoose --save

*/

app.use(UserRouter);
app.use(newsRouter);
app.use(ProductsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
