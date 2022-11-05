const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

// @desc    Get user All tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		throw new Error("User not found");
	}
	const tickets = await Ticket.find({ user: req.user.id });
	res.status(200).json(tickets);
});

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body;

	if (!product || !description) {
		throw new Error("Please add product and description");
	}

	const ticket = await Ticket.create({
		user: req.user.id,
		product,
		description,
		status: "new",
	});
	res.status(201).json(ticket);
});

// @desc    Get user a signle ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status(404);
		throw new Error("No ticket yet");
	}

	res.status(200).json(ticket);
});

// @desc    Delete user a signle ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		res.status(404);
		throw new Error("No ticket yet");
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not Authorized");
	}
	await Ticket.remove();
	res.status(200).json({ success: true });
});

// @desc    Update user a signle ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error("No ticket yet");
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not Authorized");
	}

	const updatedTicket = await Ticket.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.status(200).json(updatedTicket);
});

module.exports = {
	getTickets,
	createTicket,
	getTicket,
	updateTicket,
	deleteTicket,
};
