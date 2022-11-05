const express = require("express");
const {
	getNotes,
	addNotes,
	updateNotes,
	removeNotes,
} = require("../controller/noteController");
const { protect } = require("../middleWares/authMiddleware");

const noteRouter = express.Router({ mergeParams: true });

noteRouter
	.route("/")
	.get(protect, getNotes)
	.post(protect, addNotes)
	.put(protect, updateNotes)
	.delete(protect, removeNotes);

module.exports = noteRouter;
