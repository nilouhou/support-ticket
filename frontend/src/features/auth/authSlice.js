import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import autoServer from "./authServer";

const initialState = {
	user: null,
	isError: false,
	isSucess: false,
	isLoading: false,
	message: "",
};

export const registerThunk = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await autoServer.registerData(user);
		} catch (error) {
			const message =
				error.response?.data?.message || error.message || error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

//auth slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.user = null;
			state.isError = false;
			state.isSucess = false;
			state.isLoading = false;
			state.message = "";
		},
	},
	extraReducers: (build) => {
		build
			.addCase(registerThunk.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucess = true;
				state.user = action.payload;
			})
			.addCase(registerThunk.rejected, (state, action) => {
				state.isError = true;
				state.user = null;
				state.message = action.payload;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
