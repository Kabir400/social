const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const userModel = require("../../models/user.model.js");

const getUsers = TryCatch(async (req, res) => {
  const { loogedInUserId } = req.user.id;

  // Retrieve followedIds
  const loggedUser = userModel.findById(loogedInUserId);

  //user you are not followed
  const users = await userModel.find({
    _id: { $nin: loggedUser.followedUsers },
  });

  res.json(new ApiResponse(200, users, "users fetched successfully"));
});

module.exports = getUsers;
