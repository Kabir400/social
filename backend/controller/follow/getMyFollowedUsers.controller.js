const TryCatch = require("../../utils/TryCatch");
const userModel = require("../../model/user.model.js");

const ApiResponse = require("../../utils/ApiResponse.js");

const getMyFollowedUsers = TryCatch(async (req, res, next) => {
  const loggedUserId = req.user._id;
  const followedUsers = await userModel
    .findById(loggedUserId)
    .populate("followedUsers")
    .exec();

  res.json(
    new ApiResponse(200, followedUsers, "Followed users fetched successfully")
  );
});

module.exports = getMyFollowedUsers;
