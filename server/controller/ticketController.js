const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

// @desc    Get user tickets
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

// @desc    Create tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
	const { product, descirption } = req.body;

	if (!product || !descirption) {
		throw new Error("Please add product and description");
	}

	const ticket = await Ticket.create({
		user: req.user.id,
		product,
		descirption,
		status: "new",
	});
	res.status(201).json(ticket);
});

module.exports = { getTickets, createTicket };
