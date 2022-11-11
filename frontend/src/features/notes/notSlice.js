import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandling } from "../../util/errorMessage";
import noteService from "./noteService";

//Get all notes Thunk
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

//Add  notes Thunk
export const addNotes = createAsyncThunk(
	"notes/add",
	async ({ ticketId, note }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await noteService.createNotes(ticketId, note, token);
		} catch (error) {
			console.log(errorHandling(error));
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
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucess = true;
				state.notes = action.payload;
			})
			.addCase(getNotes.rejected, (state, action) => {
				state.isError = true;
				state.message = action.payload;
				state.isSucess = false;
				state.isLoading = false;
			});
	},
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
