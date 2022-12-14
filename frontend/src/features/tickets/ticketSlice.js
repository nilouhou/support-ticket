import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandling } from "../../util/errorMessage";
import ticketService from "./ticketService";

//Thunk to connect to server - Create
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

//Thunk to connect to server - Get ALl tickets
export const getTickets = createAsyncThunk(
	"tickets/getAll",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.getAllTickets(token);
		} catch (error) {
			return thunkAPI.rejectWithValue(errorHandling(error));
		}
	}
);

//Thunk to connect to server - Get a spefic ticket with ID
export const getTicket = createAsyncThunk(
	"tickets/getTicket",
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.getUserTicket(ticketId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(errorHandling(error));
		}
	}
);

//Thunk to connect to server - Close a spefic ticket with ID
export const closeTicket = createAsyncThunk(
	"tickets/closeTicket",
	async (ticketId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await ticketService.closeUserTicket(ticketId, token);
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
			})
			.addCase(getTickets.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTickets.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tickets = action.payload;
			})
			.addCase(getTickets.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getTicket.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.ticket = action.payload;
			})
			.addCase(getTicket.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(closeTicket.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.tickets.map((ticket) => {
					return ticket._id === action.payload._id
						? (ticket.status = "closed")
						: ticket;
				});
			});
	},
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
