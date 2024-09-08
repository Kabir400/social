const likeModel = require("../../model/like.model.js");
const postModel = require("../../model/post.model.js");

const toggleLike = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const loggedUserId = req.user._id;
    const { model, id } = req.query;

    // Check if already liked
    const isLiked = await likeModel.findOne(
      { user: loggedUserId, likeable: id, onModel: model },
      { session }
    );

    if (isLiked) {
      // Use findOneAndDelete for optimized deletion
      await likeModel.findOneAndDelete({ _id: isLiked._id }, { session });

      // Decrement the noOfLikes field
      await postModel.findByIdAndUpdate(
        id,
        { $inc: { noOfLikes: -1 } },
        { session }
      );

      await session.commitTransaction();
      return res
        .status(200)
        .json(new ApiResponse(200, null, "Like removed", true));
    }

    // Create the like and increment the like count in one step
    await likeModel.create(
      [{ user: loggedUserId, likeable: id, onModel: model }],
      { session }
    );

    await postModel.findByIdAndUpdate(
      id,
      { $inc: { noOfLikes: 1 } },
      { session }
    );

    await session.commitTransaction();
    res
      .status(200)
      .json(new ApiResponse(200, null, "Successfully liked", true));
  } catch (error) {
    // Abort the transaction if something goes wrong
    await session.abortTransaction();
    next(error); // Pass error to error-handling middleware
  } finally {
    session.endSession(); // Ensure session ends in all cases
  }
};

module.exports = toggleLike;
