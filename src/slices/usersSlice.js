import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { apiConnector } from "../services/apiConnector";
import { usersEndpoints } from "../services/apis";

const { GET_ALL_USERS_API } = usersEndpoints;

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
