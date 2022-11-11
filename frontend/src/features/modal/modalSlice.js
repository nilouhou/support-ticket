import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modalIsOpen: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		isOpen: (state) => {
			state.modalIsOpen = true;
		},
		isClose: (state) => initialState,
	},
});

export const { isClose, isOpen } = modalSlice.actions;
export default modalSlice.reducer;
