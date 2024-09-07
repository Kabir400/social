const TryCatch = require("../../utils/TryCatch.js");

const commentModel = require("../../model/comment.model.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const postComment = TryCatch(async (req, res, next) => {
  const loggedUserId = req.user.id;
  const { comment } = req.body;
  const { postId } = req.params;

  const Comment = await commentModel.create({
    comment: comment,
    postId: postId,
    userID: loggedUserId,
  });

  res.json(new ApiResponse(200, Comment, "Successfully commented", true));
});

module.exports = postComment;
