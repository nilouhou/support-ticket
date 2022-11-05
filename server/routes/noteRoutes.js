const express = require("express");
const { protect } = require("../middleWares/authMiddleware");
const noteRouter = express.Router({ mergeParams: true });

// noteRouter.route("/").get(protect, getNote);

module.exports = noteRouter;
