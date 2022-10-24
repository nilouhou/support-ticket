import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isError: false,
	isSucess: false,
	isLoading: false,
	message: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
});

export default authSlice.reducer;
