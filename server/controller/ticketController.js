const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
	const tickets = await Ticket.find({ user: req.user.id });

	res.status(200).json({ message: "get ticket" });
});

// @desc    Create tickets
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "create ticket" });
});

module.exports = { getTickets, createTicket };
