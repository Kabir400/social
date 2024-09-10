const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // The user who liked

  //post or comment id
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "onModel", // Dynamic reference to either 'comments' or 'users'
    required: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: ["comment", "post"], // The actual collections in your database
  },
  createdAt: { type: Date, default: Date.now },
});

const Like = mongoose.model("like", likeSchema);

module.exports = Like;
