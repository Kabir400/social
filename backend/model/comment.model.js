const mongoose = require("mongoose");

const commentShema = new mongoose.Schema({
  comment: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
    default: null,
  },
  noOfLikes: { type: Number, default: 0 },
  noOfReplies: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const commentModel = mongoose.model("comment", commentShema);

module.exports = commentModel;
