import { createSlice } from "@reduxjs/toolkit";

// authSlice.js

// Import the necessary dependencies

// Create the initial state
const initialState = {
	isLoggedIn: false,
};

// Create the auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state) {
			state.isLoggedIn = true;
		},
		logout(state) {
			state.isLoggedIn = false;
		},
	},
});

// Export the actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
