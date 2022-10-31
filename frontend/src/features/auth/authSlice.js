import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandling } from "../../util/errorMessage";
import authServer from "./authServer";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSucess: false,
	isLoading: false,
	message: "",
};

//Register Thunk
export const registerThunk = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authServer.registerData(user);
		} catch (error) {
			return thunkAPI.rejectWithValue(errorHandling(error));
		}
	}
);

//Login Thunk
export const loginThunk = createAsyncThunk(
	"auth/login",
	async (user, thunkAPI) => {
		try {
			return await authServer.login(user);
		} catch (error) {
			return thunkAPI.rejectWithValue(errorHandling(error));
		}
	}
);

//Logout Thunk
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
	return await authServer.logout();
});

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
			})
			.addCase(logoutThunk.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(loginThunk.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSucess = true;
				state.user = action.payload;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.isError = true;
				state.user = null;
				state.message = action.payload;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
