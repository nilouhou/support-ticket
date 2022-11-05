const express = require("express");
const { getNotes, addNotes } = require("../controller/noteController");
const { protect } = require("../middleWares/authMiddleware");
const noteRouter = express.Router({ mergeParams: true });

noteRouter.route("/").get(protect, getNotes).post(protect, addNotes);

module.exports = noteRouter;
