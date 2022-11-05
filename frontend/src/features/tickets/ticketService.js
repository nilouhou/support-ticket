import axios from "axios";
//API URL
const TICKET_URL = "/api/tickets/";

// Create new ticket
const createTicket = async (ticketData, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(TICKET_URL, ticketData, config);

	return response.data;
};

// Get All tickets
const getAllTickets = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(TICKET_URL, config);
	return response.data;
};

// Get a specific ticket
const getUserTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(TICKET_URL + ticketId, config);
	return response.data;
};

// Close a ticket by user
const closeUserTicket = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(
		TICKET_URL + ticketId,
		{ status: "closed" },
		config
	);
	console.log(response.data);
	return response.data;
};

const ticketService = {
	createTicket,
	getAllTickets,
	getUserTicket,
	closeUserTicket,
};

export default ticketService;
