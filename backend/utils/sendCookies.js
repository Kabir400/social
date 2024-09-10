const sendCookies = (res, title, token, age) => {
  res.cookie(title, token, {
    httpOnly: true,
    // secure: true,
    // sameSite: "strict",
    maxAge: age * 24 * 60 * 60 * 1000,
  });
};

module.exports = sendCookies;
