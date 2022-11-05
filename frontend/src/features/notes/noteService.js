import axios from "axios";

const NOTE_URL = "/api/tickets/";

//Get all notes/ GET
const getNotes = async (ticketId, token) => {
	//the notes url:api/tickets/:ticketId/notes
	const url = NOTE_URL + ticketId + "/notes";

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(url, token, config);

	return response.data;
};

//Get all notes/ GET
const createNotes = async (ticketId, noteData, token) => {
	//the notes url:api/tickets/:ticketId/notes
	const url = NOTE_URL + ticketId + "/notes";

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(url, noteData, token, config);

	return response.data;
};

const noteService = {
	getNotes,
	createNotes,
};

export default noteService;
