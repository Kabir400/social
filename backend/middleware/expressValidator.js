const { check, validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

//user
const userValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything otherthan alphabet")
    .trim(),
  check("email").isEmail().withMessage("Invalid email!"),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 symbol, 1 number"
    ),
];

const Validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errMsg = errors.array()[0].msg;
  throw new ApiError(400, errMsg, null, false);
};

//post
const postValidator = [
  check("title").isLength({ min: 1 }).withMessage("Title is required").trim(),
  check("description")
    .isLength({ min: 1 })
    .withMessage("description is required")
    .trim(),
];

//comment
const commentValidator = [
  check("comment")
    .isLength({ min: 1 })
    .withMessage("comment is required")
    .trim(),
];
module.exports = { userValidator, Validate, postValidator, commentValidator };
