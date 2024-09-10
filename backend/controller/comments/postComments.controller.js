const mongoose = require("mongoose");

const commentModel = require("../../model/comment.model.js");
const postModel = require("../../model/post.model.js");

const ApiResponse = require("../../utils/ApiResponse.js");

const postComment = async (req, res, next) => {
  //start tranjuction
  const session = await mongoose.startSession();
  session.startTransaction();

  const loggedUserId = req.user._id;
  const { comment } = req.body;
  const { postId } = req.params;
  try {
    const Comment = await commentModel.create(
      [
        {
          comment: comment,
          postId: postId,
          userID: loggedUserId,
        },
      ],
      { session }
    );

    const post = await postModel.findByIdAndUpdate(
      postId,
      { $inc: { noOfComments: 1 } },
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

module.exports = postComment;
