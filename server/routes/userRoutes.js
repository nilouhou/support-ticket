const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getMe,
} = require("../controller/userController");

const { protect } = require("../middleWares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
//added middleware to protect the route
router.get("/login/me", protect, getMe);

module.exports = router;
