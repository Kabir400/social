const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  follwedId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const followModel = mongoose.model("follow", followSchema, "follow");

module.exports = followModel;
