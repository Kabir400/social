const express = require("express");

const router = express.Router();

//middleware
const checkLogin = require("../middleware/checkLogin.js");

//controller
const fetchReadHistory = require("../controller/history/fetchReadHistory.controller.js");

const moveToReadHistory = require("../controller/history/moveToHistory.controller.js");

//routes
router.get("/history", checkLogin, fetchReadHistory);

router.post("/history/:postId", checkLogin, moveToReadHistory);

module.exports = router;
