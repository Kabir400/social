const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avater: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//pre hook for hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//generate jwt token
userSchema.methods.generateToken = function (key, expiry) {
  return jwt.sign({ id: this._id }, key, {
    expiresIn: expiry,
  });
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
