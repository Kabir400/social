const TryCatch = require("../../utils/TryCatch");

const postModel = require("../../model/post.model.js");
const ApiResponse = require("../../utils/ApiResponse");

const singlePost = TryCatch(async (req, res, next) => {
  const { postId } = req.params;

  const post = await postModel.findById(postId);

  res.json(new ApiResponse(200, post, "post successfully fetched", true));
});

module.exports = singlePost;
