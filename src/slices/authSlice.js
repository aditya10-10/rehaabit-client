import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserData(state, value) {
      state.userData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
});

export const { setUserData, setLoading, setToken, setError } = authSlice.actions;

export default authSlice.reducer;
