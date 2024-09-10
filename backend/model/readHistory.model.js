const mongoose = require("mongoose");

const readHistorySchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});

const readHistoryModel = mongoose.model("readHistory", readHistorySchema);

module.exports = readHistoryModel;
