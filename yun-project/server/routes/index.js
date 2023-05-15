var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // 这里面的处理逻辑多了会很繁琐，我们把这个function处理放到contorller文件夹中去
  res.render("index", { title: "Express" });
});

module.exports = router;
