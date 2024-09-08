const TryCatch = require("../../utils/TryCatch.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const logout = TryCatch(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });
  res.status(200).json(new ApiResponse(200, null, "successfully logout", true));
});

module.exports = logout;
