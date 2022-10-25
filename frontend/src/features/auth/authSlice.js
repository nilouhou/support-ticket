import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
		console.log(user);
	}
);

//auth slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
});

export default authSlice.reducer;
