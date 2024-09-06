const mongoose = require("mongoose");

const readHistorySchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.types.ObjectId, ref: "posts" },
  userId: { type: mongoose.Schmea.type.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
});

const readHistoryModel = mongoose.model("readHistory", readHistorySchema);

module.exports = readHistoryModel;
