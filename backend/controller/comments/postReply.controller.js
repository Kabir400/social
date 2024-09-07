const TryCatch = require("../../utils/TryCatch.js");
const commentModel = require("../../model/comment.model.js");

const postReply = TryCatch(async (req, res, next) => {
  const { postId } = req.params;
  const { commentId } = req.query;
  const loggedUserId = req.user.id;
  const { comment } = req.body;

  const Comment = await commentModel.create({
    userID: loggedUserId,
    postId: postId,
    parentCommentId: commentId,
    comment: comment,
  });

  res.json(new ApiResponse(200, Comment, "Successfully commented", true));
});

module.exports = postReply;
