const express = require("express");
const userModel = require("../models/user.model.js");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
});
