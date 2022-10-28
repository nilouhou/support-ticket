const express = require("express");
const { protect } = require("../middleWares/authMiddleware");
const { getTickets, createTicket } = require("../controller/ticketController");
const ticketRouter = express.Router();

ticketRouter.get("/", protect, getTickets);
ticketRouter.post("/", protect, createTicket);
module.exports = ticketRouter;
