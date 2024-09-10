const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const commentModel = require("../../model/comment.model.js");

const fetchComments = TryCatch(async (req, res, next) => {
  const { commentId = null } = req.query;
  const { postId } = req.params;

  const comments = await commentModel
    .find({
      postId: postId,
      parentCommentId: commentId,
    })
    .populate("userID", "name email -_id");

  res.json(
    new ApiResponse(200, comments, "successfully fetched the comments", true)
  );
});

module.exports = fetchComments;
