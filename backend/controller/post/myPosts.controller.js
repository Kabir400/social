const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const postModel = require("../../model/post.model.js");

const myPosts = TryCatch(async (req, res, next) => {
  const { loggedUserId } = req.user.id;
  const posts = await postModel.find({ userId: loggedUserId });

  res.json(new ApiResponse(200, posts, "successfully fetched the posts"));
});

module.exports = myPosts;
