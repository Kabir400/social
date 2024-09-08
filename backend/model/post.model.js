const mongoose = require("mongoose");

const postShema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  noOfLikes: { type: Number, default: 0 },
  noOfComments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const postModel = mongoose.model("post", postShema);

module.exports = postModel;
