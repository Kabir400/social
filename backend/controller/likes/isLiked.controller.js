const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const likeModel = require("../../model/like.model.js");

const isLiked = TryCatch(async (req, res, next) => {
  const loggedUserId = req.user._id;
  const { model, id } = req.query;

  // Check if already liked
  const isLike = await likeModel.findOne(
    { user: loggedUserId, likeable: id, onModel: model },
    { session }
  );

  if (isLike) {
    res.json(new ApiResponse(200, { isLiked: true }, "This is liked", true));
  }

  res.json(new ApiResponse(200, { isLiked: false }, "This not is liked", true));
});

module.exports = isLiked;
