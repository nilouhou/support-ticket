import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandling } from "../../util/errorMessage";
import ticketService from "./ticketService";

//Thunk to connect to server
export const createTicket = createAsyncThunk(
	"ticket/creat",
	async (ticketData, thunkAPI) => {
		try {
			await ticketService.create(ticketData);
		} catch (error) {
			thunkAPI.rejectWithValue(errorHandling(error));
		}
	}
);

const initialState = {
	tickets: [],
	ticket: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

//ticket Slice
export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {},
});

export const reset = ticketSlice.actions;
export default ticketSlice.reducer;
