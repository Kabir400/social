const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const followModel = require("../../models/follow.model.js");
const userModel = require("../../models/user.model.js");

const getUsers = TryCatch(async (req, res) => {
  const { loogedInUserId } = req.user.id;

  // Retrieve followedIds
  const followedUsers = await followModel
    .find({ userId: loogedInUserId })
    .select("follwedId -_id");

  [{ followedid: "...." }, { followedId: "...." }];

  // Extract the followed user IDs into an array
  const followedIds = followedUsers.map((follow) => follow.follwedId);

  //user you are not followed
  const users = await userModel.find({ _id: { $nin: followedIds } });

  res.json(new ApiResponse(200, users, "users fetched successfully"));
});

module.exports = getUsers;
