const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const Note = require("../models/noteModel");

// @desc    Get Notes of the ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}
	const notes = await Note.find({ ticket: req.params.ticketId });
	res.status(200).json(notes);
});

// @desc    Create Notes of the ticket
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNotes = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}
	const notes = await Note.create({
		ticket: req.params.ticketId,
		user: req.user.id,
		isStaff: false,
		text: req.body.text,
	});
	res.status(200).json(notes);
});

module.exports = {
	getNotes,
	addNotes,
};
