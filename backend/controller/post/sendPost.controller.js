const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const postModel = require("../../model/post.model.js");

const sendPost = TryCatch(async (req, res, next) => {
  const loggedUserId = req.user.id;
  const post = await postModel.create({ ...req.body, userID: loggedUserId });

  res.json(new ApiResponse(200, post, "post is successfully posted", true));
});

module.exports = sendPost;
