const mongoose = require("mongoose");
const ApiResponse = require("../../utils/ApiResponse.js");

const commentModel = require("../../model/comment.model.js");

const postReply = async (req, res, next) => {
  //start tranjuction
  const session = await mongoose.startSession();
  session.startTransaction();

  const { postId } = req.params;
  const { commentId } = req.params;
  const loggedUserId = req.user._id;
  const { comment } = req.body;
  try {
    const Comment = await commentModel.create(
      [
        {
          userID: loggedUserId,
          postId: postId,
          parentCommentId: commentId,
          comment: comment,
        },
      ],
      { session }
    );

    await commentModel.findByIdAndUpdate(
      commentId,
      { $inc: { noOfReplies: 1 } },
      { session }
    );

    //end tranjuction
    await session.commitTransaction();
    session.endSession();

    res.json(new ApiResponse(200, Comment, "Successfully commented", true));
  } catch (error) {
    // Abort the transaction if something goes wrong
    await session.abortTransaction();
    next(error); // Pass error to error-handling middleware
  } finally {
    session.endSession(); // Ensure session ends in all cases
  }
};

module.exports = postReply;
