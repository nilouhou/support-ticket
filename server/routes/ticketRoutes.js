const express = require("express");
const { protect } = require("../middleWares/authMiddleware");
const {
	getTickets,
	createTicket,
	getTicket,
	updateTicket,
	deleteTicket,
} = require("../controller/ticketController");
const ticketRouter = express.Router();

//All tickets Routes
ticketRouter.route("/").get(protect, getTickets).post(protect, createTicket);

//Single ticket routes
ticketRouter
	.route("/:id")
	.get(protect, getTicket)
	.put(protect, updateTicket)
	.delete(protect, deleteTicket);
module.exports = ticketRouter;
