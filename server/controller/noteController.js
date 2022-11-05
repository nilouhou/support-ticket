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

// @desc    Update Notes of the ticket
// @route   PUT /api/tickets/:ticketId/notes
// @access  Private
const updateNotes = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const updatedNotes = await Note.findOneAndUpdate(
		req.params.ticketId,
		req.body,
		{ new: true }
	);
	console.log(updateNotes);
	res.status(200).json(updatedNotes);
});

// @desc    Remove Notes of the ticket
// @route   Delete /api/tickets/:ticketId/notes
// @access  Private
const removeNotes = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	await Note.remove();
	res.status(200).json({ success: true });
});

module.exports = {
	getNotes,
	addNotes,
	updateNotes,
	removeNotes,
};
