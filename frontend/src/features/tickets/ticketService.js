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

const ticketService = {
	createTicket,
};

export default ticketService;
