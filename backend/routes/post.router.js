const express = require("express");
const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");

const {
  postValidator,
  Validate,
} = require("../middleware/expressValidator.js");

//controllers
const singlePost = require("../controller/post/singlePost.controller.js");

const sendPost = require("../controller/post/sendPost.controller.js");

const myPosts = require("../controller/post/myPosts.controller.js");

const recomendedPosts = require("../controller/post/recomendedPosts.controller.js");

const searchPost = require("../controller/post/searchPost.controller.js");

//routes
router.get("/post/:postId", checkLogin, singlePost);

router.post("/send-post", postValidator, Validate, checkLogin, sendPost);

router.get("/my-posts", checkLogin, myPosts);

router.get("/recomended-posts", checkLogin, recomendedPosts);

router.get("/search-post/:query/:page?/:limit?", checkLogin, searchPost);

module.exports = router;
