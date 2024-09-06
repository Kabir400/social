const TryCatch = require("../../utils/TryCatch.js");
const postModel = require("../../model/post.model.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const searchPost = TryCatch(async (req, res, next) => {
  const { query, page = 1, limit = 10 } = req.params;
  const posts = await postModel
    .find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json(new ApiResponse(200, posts, "successfully fetched the posts"));
});

module.exports = searchPost;
