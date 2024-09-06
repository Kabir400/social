const followModel = require("../../model/follow.model.js");
const postModel = require("../../model/post.model.js");
const readHistoryModel = require("../../model/readHistory.model.js");

const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

//recomended post
const recomendedPosts = TryCatch(async (req, res, next) => {
  const loggedUserId = req.user.id;

  const { limit = 10, page = 1 } = req.query;

  // Retrieve followedIds
  const followedUsers = await followModel
    .find({ userId: loggedUserId })
    .select("follwedId -_id");

  // Extract the followed user IDs into an array
  const followedIds = followedUsers.map((follow) => follow.follwedId);

  if (followedIds.length === 0) {
    res.json(new ApiResponse(200, null, "You are not following anyone", false));
  }

  //Retrive postId in watchHistory
  const watchHistory = await watchHistory
    .find({ userId: loggedUserId })
    .select("postId -_id");

  //Extract the postId in watchHistory into an array
  const watchHistoryIds = watchHistory.map((watch) => watch.postId);

  // Step 2: Find posts by followed users
  const posts = await postModel
    .find({
      $and: [
        { userID: { $in: followedIds } },
        { _id: { $nin: watchHistoryIds } },
      ],
    })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json(new ApiResponse(200, posts, "successfully fetched the posts!"));
});

module.exports = recomendedPosts;
