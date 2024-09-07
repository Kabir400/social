const mongoose = require("mongoose");

const commentShema = new mongoose.Schema({
  comment: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

const commentModel = mongoose.model("comment", commentShema);

module.exports = commentModel;
