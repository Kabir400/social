const TryCatch = require("../../utils/TryCatch");
const ApiResponse = require("../../utils/ApiResponse");

const readHistoryModel = require("../../model/readHistory.model.js");

const moveToHistory = TryCatch(async (req, res, next) => {
  const { postId } = req.params;
  const loggedUserId = req.user._id;

  const readHistory = await readHistoryModel.create({
    userId: loggedUserId,
    postId: postId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, readHistory, "move to read history", true));
});

module.exports = moveToHistory;
