const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", require: true },
  followedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const followModel = mongoose.model("follow", followSchema, "follow");

module.exports = followModel;
