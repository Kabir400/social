const sendCookies = (res, title, token, age) => {
  if (age[age.length - 1] === "d") {
    res.cookie(title, token, {
      httpOnly: true,
      maxAge: age.slice(0, age.length - 1) * 24 * 60 * 60 * 1000,
    });
  } else if (age[age.length - 1] === "m") {
    res.cookie(title, token, {
      httpOnly: true,
      maxAge: age.slice(0, age.length - 1) * 1000 * 60,
    });
  }
};
// secure: true,
// sameSite: "strict",
module.exports = sendCookies;
