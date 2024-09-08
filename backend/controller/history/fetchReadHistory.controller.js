const TryCatch = require("../../utils/TryCatch");

const readHistoryModel = require("../../model/readHistory.model.js");

const fetchReadHistory = TryCatch(async (req, res, next) => {
  const loggedUserId = req.user._id;
  const readHistory = await readHistoryModel
    .find({ userId: loggedUserId })
    .populate("postId");

  res.json(
    new ApiResponse(200, readHistory, "Read history fetched successfully")
  );
});

module.exports = fetchReadHistory;
