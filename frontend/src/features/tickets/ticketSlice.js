import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandling } from "../../util/errorMessage";
import ticketService from "./ticketService";

//Thunk to connect to server
export const createTicket = createAsyncThunk(
	"tickets/create",
	async (ticketData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.createTicket(ticketData, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(errorHandling(error));
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
	extraReducers: (builder) => {
		builder
			.addCase(createTicket.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTicket.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload;
			});
	},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
