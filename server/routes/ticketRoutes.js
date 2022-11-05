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
const noteRouter = require("./noteRoutes");

//All tickets Routes
ticketRouter.route("/").get(protect, getTickets).post(protect, createTicket);

//Single ticket routes
ticketRouter
	.route("/:id")
	.get(protect, getTicket)
	.put(protect, updateTicket)
	.delete(protect, deleteTicket);

//Adding Note routes to merged with ticket id route
ticketRouter.use("/:ticketId/notes/", noteRouter);

module.exports = ticketRouter;
