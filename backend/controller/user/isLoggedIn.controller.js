const ApiResponse = require("../../utils/ApiResponse");

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "User is logged in", true));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, "User is not logged in", false));
};

module.exports = isLoggedIn;
