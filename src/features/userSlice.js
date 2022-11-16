import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user", //name of the reducer
  initialState, //initial state
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions; //we destructure userSlice.actions which has action creators like login & logout in it
//we will use those actions creators outside of the reducer to dispatch data to it. use destructure whenever you want to pulll data from objects..
//it would be very ugly if you have to export userSlice and had to do userSlice.actions.login....power of destructuring.

export const selectUser = (state) => state.user.user; //selector on the hand allows us to select data (state) from the store. first user is the name of the reducer, second user is the state

export default userSlice.reducer;
