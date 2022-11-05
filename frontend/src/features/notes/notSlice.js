import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandling } from "../../util/errorMessage";
import { noteService } from "./noteService";

export const getNotes = createAsyncThunk(
	"notes/getAll",
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.getNotes(ticketId, token);
		} catch (error) {
			thunkAPI.rejectWithValue(errorHandling(error));
		}
	}
);

const initialState = {
	notes: [],
	isError: false,
	isSucess: false,
	isLoading: false,
	message: "",
};

const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {},
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
