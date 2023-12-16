import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserOnClient } from "./types";
// import { getUserData } from "./functions";
import dynamic from "next/dynamic";
import { getUserData } from "../util/functions";

export const counterSlice = createSlice({
	name: "user",
	initialState: {
		value: getUserData() as UserOnClient | null,
	},
	reducers: {
		update: (state, action: PayloadAction<UserOnClient | null>) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function

export const { update } = counterSlice.actions;

export default counterSlice.reducer;
