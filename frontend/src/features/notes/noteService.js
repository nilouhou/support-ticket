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
	const response = await axios.get(url, config);
	return response.data;
};

//Creat a note/ Post
const createNotes = async (ticketId, noteData, token) => {
	//the notes url:api/tickets/:ticketId/notes
	const url = NOTE_URL + ticketId + "/notes";
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	//The schema field for note in noteModel is text, we must to have the same name as our fliead name in our table
	const response = await axios.post(
		url,
		{
			text: noteData,
		},
		config
	);

	return response.data;
};

const noteService = {
	getNotes,
	createNotes,
};

export default noteService;
