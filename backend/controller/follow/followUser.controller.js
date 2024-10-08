const mongoose = require("mongoose");

const followModel = require("../../model/follow.model.js");
const userModel = require("../../model/user.model.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const followUser = async (req, res, next) => {
  const session = await mongoose.startSession(); // start session
  session.startTransaction(); // Begin the transaction

  const loggedInUserId = req.user._id;
  const { followedUserId } = req.params;

  try {
    // Check if the logged-in user already follows the target user
    const isFollowed = await userModel.findOne({
      _id: loggedInUserId,
      followedUsers: followedUserId,
    });

    if (isFollowed) {
      // Unfollow the user
      await followModel.findOneAndDelete(
        { userId: loggedInUserId, followedId: followedUserId },
        { session }
      );

      // Decrsing the follower
      await userModel.findByIdAndUpdate(
        loggedInUserId,
        { $pull: { followedUsers: followedUserId } },
        { session }
      );

      await userModel.findByIdAndUpdate(
        loggedInUserId,
        { $inc: { followedUserCount: -1 } },
        { session }
      );
      await userModel.findByIdAndUpdate(
        followedUserId,
        { $inc: { followersCount: -1 } },
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return res.json(
        new ApiResponse(
          200,
          null,
          "You have successfully unfollowed the user!",
          true
        )
      );
    }

    // Follow the user
    await followModel.create(
      [{ userId: loggedInUserId, followedId: followedUserId }],
      { session }
    );

    // Increasing the follower
    await userModel.findByIdAndUpdate(
      loggedInUserId,
      { $push: { followedUsers: followedUserId } },
      { session }
    );

    await userModel.findByIdAndUpdate(
      loggedInUserId,
      { $inc: { followedUserCount: 1 } },
      { session }
    );
    await userModel.findByIdAndUpdate(
      followedUserId,
      { $inc: { followersCount: 1 } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.json(
      new ApiResponse(
        200,
        null,
        "You have successfully followed the user!",
        true
      )
    );
  } catch (error) {
    // Abort the transaction if something goes wrong
    await session.abortTransaction();
    next(error); // Pass error to error-handling middleware
  } finally {
    session.endSession(); // Ensure session ends in all cases
  }
};
module.exports = followUser;
