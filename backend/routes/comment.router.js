const express = require("express");

const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");
const {
  commentValidator,
  Validate,
} = require("../middleware/expressValidator.js");

//controller
const fetchComments = require("../controller/comments/fetchComments.controller.js");

const postComment = require("../controller/comments/postComments.controller.js");

const postReply = require("../controller/comments/postReply.controller.js");

//router
router.get("/comments/:postId", checkLogin, fetchComments);

router.post(
  "/comments/:postId",
  commentValidator,
  Validate,
  checkLogin,
  postComment
);

router.post(
  "/comments/reply/:postId/:commentId",
  commentValidator,
  Validate,
  checkLogin,
  postReply
);

module.exports = router;
