import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarVisible: true,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebarVisibility(state, action) {
      state.isSidebarVisible = action.payload;
    },
  },
});

export const { toggleSidebarVisibility } = sidebarSlice.actions;
export default sidebarSlice.reducer;
