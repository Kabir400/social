const TryCatch = require("../../utils/TryCatch.js");
const followModel = require("../../model/follow.model.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const followUser = TryCatch(async (req, res) => {
  const { loggedInUserId } = req.user.id;
  const { followedUserId } = req.params;

  const isFollowed = await followModel.exists({
    userId: loggedInUserId,
    follwedId: followedUserId,
  });

  if (isFollowed) {
    res.json(new ApiResponse(200, null, "You already followed!", false));
  }

  followModel.create({ userId: loggedInUserId, follwedId: followedUserId });

  res.json(new ApiResponse(200, null, "You started to follow!", true));
});

module.exports = followUser;
