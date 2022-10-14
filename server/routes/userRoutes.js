const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/userController");

router.post("/", registerUser);
router.get("/login", loginUser);

module.exports = router;
