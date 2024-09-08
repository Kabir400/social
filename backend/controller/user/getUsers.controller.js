const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const userModel = require("../../model/user.model.js");

const getUsers = TryCatch(async (req, res) => {
  const loogedInUserId = req.user._id;

  // Retrieve followedIds
  const loggedUser = await userModel.findById(loogedInUserId);

  //user you are not followed
  const users = await userModel.find({
    _id: { $nin: [...loggedUser.followedUsers, loogedInUserId] },
  });

  res.json(new ApiResponse(200, users, "users fetched successfully"));
});

module.exports = getUsers;
