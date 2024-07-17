import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMyProfileOpen: false,
};

const authSlice = createSlice({
  name: "myProfile",
  initialState: initialState,
  reducers: {
    setMyProfileOpen: (state, action) => {
      state.isMyProfileOpen
        ? (state.isMyProfileOpen = false)
        : (state.isMyProfileOpen = true);
    },
  },
});

export const {setMyProfileOpen} = authSlice.actions;

export default authSlice.reducer;
